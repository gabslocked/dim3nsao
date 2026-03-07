'use client';
import { useUser, useUserProfile, useFirestore, useMemoFirebase } from '@/firebase/provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { Order } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Package, Clock, CheckCircle, HandCoins, Truck } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const { data: userProfile, isLoading: isProfileLoading } = useUserProfile();
  const firestore = useFirestore();
  const router = useRouter();

  const ordersQuery = useMemoFirebase(
    () =>
      user && firestore
        ? query(collection(firestore, 'orders'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'))
        : null,
    [user, firestore]
  );
  const { data: orders, isLoading: areOrdersLoading } = useCollection<Order>(ordersQuery);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };
  
  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
        case 'Awaiting Admin Approval':
        case 'Pending':
            return 'secondary';
        case 'Approved':
            return 'default';
        case 'Shipped':
            return 'outline';
        case 'Delivered':
            return 'default';
        default:
            return 'secondary';
    }
  };

  const isLoading = isUserLoading || isProfileLoading || areOrdersLoading;

  if (isLoading) {
    return (
      <div className="container max-w-screen-lg py-12 md:py-24">
        <div className="space-y-4 mb-8">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-80" />
        </div>
        <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-screen-lg py-12 md:py-24">
      <div className="mb-10">
        <h1 className="text-4xl font-headline font-bold">Painel do Usuário</h1>
        <p className="text-lg text-muted-foreground mt-2">Bem-vindo(a), {userProfile?.name || user?.email}!</p>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold font-headline">Meus Pedidos</h2>
        {orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map(order => (
              <Card key={order.id}>
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">Pedido #{order.id.substring(0, 7)}</CardTitle>
                    <CardDescription>
                      Feito em {order.createdAt ? format(order.createdAt.toDate(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : '...'}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusVariant(order.status)} className="capitalize">{order.status}</Badge>
                </CardHeader>
                <CardContent>
                  {order.status === 'Awaiting Admin Approval' && (
                    <Alert variant="default" className="mb-4 bg-primary/10 border-primary/20 text-primary-foreground">
                        <Clock className="h-4 w-4 !text-primary" />
                        <AlertTitle>Pedido aguardando aprovação</AlertTitle>
                        <AlertDescription>
                            Seu pedido possui observações que podem alterar o valor. Nossa equipe irá analisar e aprovar o pedido antes da finalização da compra.
                        </AlertDescription>
                    </Alert>
                  )}
                  {order.status === 'Approved' && (
                     <Alert variant="default" className="mb-4 bg-green-500/10 border-green-500/20 text-green-400">
                        <CheckCircle className="h-4 w-4 !text-green-500" />
                        <AlertTitle>Pedido Aprovado!</AlertTitle>
                        <AlertDescription className="flex justify-between items-center">
                            <span>Finalize o pagamento para iniciar a produção.</span>
                            <Button size="sm" disabled>
                                <HandCoins className="mr-2 h-4 w-4"/>
                                Finalizar Pagamento (Em Breve)
                            </Button>
                        </AlertDescription>
                    </Alert>
                  )}
                   {order.status === 'Shipped' && order.trackingCode && (
                     <Alert variant="default" className="mb-4">
                        <Truck className="h-4 w-4" />
                        <AlertTitle>Pedido Enviado!</AlertTitle>
                        <AlertDescription>
                            Código de Rastreio: <span className="font-mono bg-muted p-1 rounded">{order.trackingCode}</span>
                        </AlertDescription>
                    </Alert>
                  )}
                  <div className="flex justify-between items-end">
                     <div className="text-sm text-muted-foreground">
                        {order.products.length} {order.products.length === 1 ? 'item' : 'itens'}
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total do Pedido</p>
                        <p className="text-xl font-bold">{formatCurrency(order.approvedPrice || order.totalPrice)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center p-12">
            <Package className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">Nenhum pedido encontrado</h3>
            <p className="mt-2 text-muted-foreground">Que tal criar seu primeiro produto personalizado?</p>
            <Button className="mt-6" asChild>
                <Link href="/customize">Começar a Criar</Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
