
'use client';

import { useState } from 'react';
import { useCart } from '@/context/cart-context';
import { useFirestore, useUser } from '@/firebase/provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2, ArrowRight, Truck } from 'lucide-react';
import { AuthGuard } from '@/components/auth/auth-guard';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { calculateShipping, ShippingOption } from '@/ai/flows/calculate-shipping-flow';

function CheckoutPage() {
  const { cartItems, totalPrice, itemCount, clearCart } = useCart();
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [cep, setCep] = useState('');
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [shippingError, setShippingError] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };
  
  const handleCalculateShipping = async () => {
    if (!cep || cep.replace(/\D/g, '').length !== 8) {
      setShippingError('Por favor, insira um CEP válido.');
      return;
    }
    setIsCalculatingShipping(true);
    setShippingError(null);
    setShippingOptions([]);
    setSelectedShipping(null);

    const totalWeight = cartItems.reduce((acc, item) => acc + (item.quantity * 0.3), 0);

    try {
      const options = await calculateShipping({
        destinationCep: cep.replace(/\D/g, ''),
        totalWeight: Math.max(totalWeight, 0.1) 
      });
      if (options.length === 0) {
        setShippingError('Não foram encontradas opções de frete para este CEP.');
      }
      setShippingOptions(options);
    } catch (error: any) {
      console.error("Error calculating shipping: ", error);
      setShippingError(error.message || 'Não foi possível calcular o frete. Tente novamente.');
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user || !firestore) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Você precisa estar logado para fazer um pedido.' });
      return;
    }
     if (!selectedShipping) {
      toast({ variant: 'destructive', title: 'Frete não selecionado', description: 'Por favor, calcule e selecione uma opção de frete.' });
      return;
    }
    setIsPlacingOrder(true);

    const orderProducts = cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        customization: item.customization,
    }));
    
    const observation = cartItems
        .map(item => item.customization.additionalInstructions)
        .filter(Boolean)
        .join('\n---\n');
    const hasObservation = observation.trim().length > 0;

    try {
        const ordersRef = collection(firestore, 'orders');
        const finalTotalPrice = totalPrice + (selectedShipping?.price || 0);

        const newOrderData = {
            userId: user.uid,
            products: orderProducts,
            totalPrice: finalTotalPrice,
            shippingCost: selectedShipping.price,
            shippingDetails: {
              service: selectedShipping.name,
              deliveryTime: selectedShipping.delivery_time,
            },
            status: hasObservation ? 'Awaiting Admin Approval' : 'Pending',
            observation: observation || null,
            createdAt: serverTimestamp(),
        };

        const newOrderRef = await addDoc(ordersRef, newOrderData);

        clearCart();
        
        if (hasObservation) {
            toast({ 
                title: 'Pedido Enviado para Análise!', 
                description: 'Sua solicitação será revisada. Acompanhe o status no seu painel.',
                duration: 6000
            });
            router.push(`/dashboard`);
        } else {
            toast({ title: 'Pedido Realizado com Sucesso!', description: 'Você será redirecionado em breve.' });
            router.push(`/order-confirmation/${newOrderRef.id}`);
        }

    } catch (error) {
        console.error("Error placing order: ", error);
        toast({ variant: 'destructive', title: 'Erro ao realizar o pedido.', description: 'Por favor, tente novamente.' });
        setIsPlacingOrder(false);
    }
  };
  
  const finalTotal = totalPrice + (selectedShipping?.price || 0);

  return (
    <div className="container max-w-screen-lg py-24 md:py-32">
      <h1 className="text-4xl font-headline font-bold mb-8 text-center">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <Card>
            <CardHeader><CardTitle>1. Itens do Pedido</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 bg-muted rounded-md overflow-hidden">
                    {item.customization.photoDataUrl && (
                      <Image src={item.customization.photoDataUrl} alt={item.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
                  </div>
                  <p>x{item.quantity}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle>2. Cálculo de Frete</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end gap-4">
                <div className="flex-grow">
                  <Label htmlFor="cep">CEP de Entrega</Label>
                  <Input id="cep" placeholder="00000-000" value={cep} onChange={e => setCep(e.target.value)} />
                </div>
                <Button onClick={handleCalculateShipping} disabled={isCalculatingShipping}>
                  {isCalculatingShipping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Truck className="mr-2 h-4 w-4" />}
                  Calcular
                </Button>
              </div>

              {shippingError && <p className="text-sm text-destructive">{shippingError}</p>}
              
              {shippingOptions.length > 0 && (
                <RadioGroup onValueChange={(value) => setSelectedShipping(JSON.parse(value))} className="space-y-2 pt-4">
                  {shippingOptions.map((option) => (
                    <Label key={option.id} className="flex items-center justify-between p-4 border rounded-md cursor-pointer hover:bg-muted/50 has-[input:checked]:border-primary has-[input:checked]:bg-primary/10">
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value={JSON.stringify(option)} id={option.id.toString()} />
                        <div>
                          <p className="font-semibold">{option.name}</p>
                          <p className="text-sm text-muted-foreground">Entrega em até {option.delivery_time} dias</p>
                        </div>
                      </div>
                      <p className="font-bold">{formatCurrency(option.price)}</p>
                    </Label>
                  ))}
                </RadioGroup>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-28">
            <CardHeader>
              <CardTitle>3. Resumo da Compra</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span>{selectedShipping ? formatCurrency(selectedShipping.price) : 'A calcular'}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handlePlaceOrder} disabled={isPlacingOrder || cartItems.length === 0 || !selectedShipping}>
                {isPlacingOrder ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Finalizar Pedido'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function GuardedCheckoutPage() {
    return (
        <AuthGuard>
            <CheckoutPage />
        </AuthGuard>
    );
}
