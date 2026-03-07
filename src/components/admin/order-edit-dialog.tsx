
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { useToast } from '@/hooks/use-toast';
import { Order } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, MessageSquareQuote } from 'lucide-react';
import { Separator } from '../ui/separator';

const orderStatusEnum = z.enum(['Pending', 'Awaiting Admin Approval', 'Approved', 'Production', 'Shipped', 'Delivered', 'Canceled']);

const orderUpdateSchema = z.object({
  status: orderStatusEnum,
  approvedPrice: z.coerce.number().optional(),
  trackingCode: z.string().optional(),
});

type OrderUpdateForm = z.infer<typeof orderUpdateSchema>;

interface OrderEditDialogProps {
  order: Order;
  children: React.ReactNode;
}

export function OrderEditDialog({ order, children }: OrderEditDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<OrderUpdateForm>({
    resolver: zodResolver(orderUpdateSchema),
    defaultValues: {
      status: order.status,
      approvedPrice: order.approvedPrice || order.totalPrice,
      trackingCode: order.trackingCode || '',
    },
  });

  const onSubmit = async (data: OrderUpdateForm) => {
    if (!firestore) return;
    setIsSubmitting(true);

    try {
      const orderRef = doc(firestore, 'orders', order.id);
      await updateDoc(orderRef, {
        status: data.status,
        approvedPrice: data.approvedPrice,
        trackingCode: data.trackingCode,
      });

      toast({ title: 'Pedido atualizado com sucesso!' });
      setOpen(false);
    } catch (error) {
      console.error('Error updating order:', error);
      toast({ variant: 'destructive', title: 'Erro ao atualizar pedido.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatCurrency = (value?: number) => {
    if (typeof value !== 'number') return 'N/A';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)}>{children}</div>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido #{order.id.substring(0, 7)}</DialogTitle>
        </DialogHeader>
        
        {order.observation && (
            <div className="my-4 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2"><MessageSquareQuote className="w-4 h-4"/> Observações do Cliente</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{order.observation}</p>
            </div>
        )}

        <Separator />

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <Label htmlFor="status">Status do Pedido</Label>
                    <Controller
                        name="status"
                        control={form.control}
                        render={({ field }) => (
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Selecione um status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {orderStatusEnum.options.map(status => (
                                        <SelectItem key={status} value={status}>{status}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
                 <div>
                    <Label htmlFor="approvedPrice">Preço Aprovado</Label>
                    <Input id="approvedPrice" type="number" step="0.01" {...form.register('approvedPrice')} />
                    <p className="text-xs text-muted-foreground mt-1">Preço Original: {formatCurrency(order.totalPrice)}</p>
                </div>
            </div>
            
             <div>
                <Label htmlFor="trackingCode">Código de Rastreio</Label>
                <Input id="trackingCode" {...form.register('trackingCode')} />
            </div>

            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Salvar Alterações
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
