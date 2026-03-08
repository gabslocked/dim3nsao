
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  return (
    <div className="container max-w-screen-md py-24 md:py-32 flex items-center justify-center">
      <Card className="w-full text-center p-8">
        <CardHeader>
          <div className="mx-auto bg-green-500/20 text-green-500 rounded-full w-20 h-20 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <CardTitle className="text-3xl font-bold">Pedido Realizado com Sucesso!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Obrigado por comprar na DIM3NSÃO!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>
            Seu pedido foi recebido e já está sendo processado.
            Enviaremos uma notificação por e-mail assim que ele for enviado.
          </p>
          <div className="bg-muted p-4 rounded-md">
            <p className="text-sm text-muted-foreground">ID do seu Pedido:</p>
            <p className="font-mono text-lg break-all">{orderId}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Você pode acompanhar o status do seu pedido a qualquer momento no seu painel.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Button asChild>
              <Link href="/dashboard">
                Ir para o Painel
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                Continuar Comprando
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
