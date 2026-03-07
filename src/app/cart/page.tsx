
'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingCart, ArrowRight, MessageSquareQuote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, itemCount } = useCart();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="container max-w-screen-xl py-24 md:py-32">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-headline font-bold mb-8">Seu Carrinho</h1>
          {cartItems.length > 0 ? (
            <div className="space-y-6">
              {cartItems.map(item => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center">
                    <div className="relative w-24 h-24 bg-muted rounded-md overflow-hidden mr-6 shrink-0">
                      {item.customization.photoDataUrl ? (
                        <Image
                          src={item.customization.photoDataUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-muted-foreground text-center p-2">
                          {item.customization.style}
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Estilo: {item.customization.style}</p>
                      {item.customization.textInput1 && (
                        <p className="text-sm text-muted-foreground">
                          Nomes: {item.customization.textInput1}, {item.customization.textInput2}
                        </p>
                      )}
                       {item.customization.lampOption && (
                        <p className="text-sm text-muted-foreground">
                          Lâmpada: {item.customization.lampOption}
                        </p>
                      )}
                       {item.customization.hasSwitch && (
                        <p className="text-sm text-muted-foreground">
                          Com Interruptor
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-6">
                       <p className="font-bold text-lg w-28 text-right">{formatCurrency(item.price)}</p>
                       <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-5 w-5 text-destructive" />
                          <span className="sr-only">Remover item</span>
                       </Button>
                    </div>
                  </div>
                  {item.customization.additionalInstructions && (
                    <div className="mt-4 pt-4 border-t border-border flex items-start gap-3 text-sm">
                      <MessageSquareQuote className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                      <p className="text-muted-foreground italic">
                        "{item.customization.additionalInstructions}"
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center p-12 text-center bg-card/50">
              <ShoppingCart className="w-16 h-16 mb-6 text-muted-foreground" />
              <h2 className="text-2xl font-bold">Seu carrinho está vazio.</h2>
              <p className="text-muted-foreground mt-2">Que tal adicionar um produto personalizado?</p>
              <Button asChild className="mt-8">
                <Link href="/customize">Criar produto</Link>
              </Button>
            </Card>
          )}
        </div>
        <div className="md:col-span-1">
          <Card className="sticky top-28">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span className="text-sm text-muted-foreground">A calcular</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" disabled={cartItems.length === 0}>
                <Link href="/checkout">
                  Continuar para o Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
