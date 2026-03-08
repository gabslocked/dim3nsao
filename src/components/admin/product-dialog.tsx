'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { collection, addDoc, doc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useFirestore, useStorage } from '@/firebase/provider';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  imageURL: string;
  active: boolean;
  price: number;
  category: string;
  createdAt: Timestamp;
}

const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z.coerce.number().min(0.01, 'Preço deve ser maior que 0'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  active: z.boolean(),
});

type ProductForm = z.infer<typeof productSchema>;

interface ProductDialogProps {
  children: React.ReactNode;
  product?: Product;
}

export function ProductDialog({ children, product }: ProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const firestore = useFirestore();
  const storage = useStorage();
  const { toast } = useToast();

  const isEditing = !!product;

  const form = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      price: product?.price || 0,
      category: product?.category || '',
      active: product?.active ?? true,
    },
  });

  const onSubmit = async (data: ProductForm) => {
    if (!firestore) return;
    setIsSubmitting(true);

    try {
      let imageURL = product?.imageURL || '';

      // Upload image if a new file was selected
      if (imageFile && storage) {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageURL = await getDownloadURL(snapshot.ref);
      }

      if (isEditing && product) {
        const productRef = doc(firestore, 'products', product.id);
        await updateDoc(productRef, {
          ...data,
          imageURL,
        });
        toast({ title: 'Produto atualizado com sucesso!' });
      } else {
        const productsRef = collection(firestore, 'products');
        await addDoc(productsRef, {
          ...data,
          imageURL,
          createdAt: serverTimestamp(),
        });
        toast({ title: 'Produto criado com sucesso!' });
      }

      setOpen(false);
      form.reset();
      setImageFile(null);
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar produto.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)}>{children}</div>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Produto' : 'Adicionar Produto'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome do Produto</Label>
              <Input id="name" {...form.register('name')} />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...form.register('price')}
                />
                {form.formState.errors.price && (
                  <p className="text-xs text-destructive mt-1">
                    {form.formState.errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Input id="category" {...form.register('category')} />
                {form.formState.errors.category && (
                  <p className="text-xs text-destructive mt-1">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="image">Imagem do Produto</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              {product?.imageURL && !imageFile && (
                <p className="text-xs text-muted-foreground mt-1">
                  Imagem atual mantida. Selecione uma nova para substituir.
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="active"
                checked={form.watch('active')}
                onCheckedChange={(checked) => form.setValue('active', checked)}
              />
              <Label htmlFor="active">Produto ativo</Label>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isEditing ? 'Salvar Alterações' : 'Criar Produto'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
