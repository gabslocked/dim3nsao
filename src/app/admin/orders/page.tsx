
'use client';

import { useMemo, useState } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase/provider';
import { useCollection } from '@/firebase/firestore/use-collection';
import { Order } from '@/lib/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { OrderEditDialog } from '@/components/admin/order-edit-dialog';

type StatusTab = 'all' | Order['status'];

export default function AdminOrdersPage() {
  const firestore = useFirestore();
  const [activeTab, setActiveTab] = useState<StatusTab>('all');

  const ordersRef = useMemoFirebase(() => firestore && collection(firestore, 'orders'), [firestore]);
  const ordersQuery = useMemoFirebase(() => ordersRef && query(ordersRef, orderBy('createdAt', 'desc')), [ordersRef]);
  const { data: allOrders, isLoading } = useCollection<Order>(ordersQuery);

  const filteredOrders = useMemo(() => {
    if (!allOrders) return [];
    if (activeTab === 'all') return allOrders;
    return allOrders.filter(order => order.status === activeTab);
  }, [allOrders, activeTab]);

  const formatCurrency = (value?: number) => {
    if (typeof value !== 'number') return 'N/A';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };
  
  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
        case 'Awaiting Admin Approval': return 'destructive';
        case 'Pending': return 'secondary';
        case 'Approved': return 'default';
        case 'Shipped': return 'outline';
        case 'Delivered': return 'default';
        case 'Canceled': return 'destructive'
        default: return 'secondary';
    }
  };

  const TABS: { label: string; value: StatusTab }[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Aguardando Aprovação', value: 'Awaiting Admin Approval' },
    { label: 'Pendentes', value: 'Pending' },
    { label: 'Aprovados', value: 'Approved' },
    { label: 'Em Produção', value: 'Production' },
    { label: 'Enviados', value: 'Shipped' },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
        <p className="text-muted-foreground">Gerencie todos os pedidos da sua loja.</p>
      </div>

      <Card>
        <CardHeader>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as StatusTab)}>
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                {TABS.map(tab => (
                    <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead><span className="sr-only">Ações</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="h-24 text-center">Carregando pedidos...</TableCell></TableRow>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id.substring(0, 7)}</TableCell>
                    <TableCell>{order.createdAt ? format(order.createdAt.toDate(), 'dd/MM/yyyy') : 'N/A'}</TableCell>
                    <TableCell>{order.userId.substring(0,10)}...</TableCell>
                    <TableCell><Badge variant={getStatusVariant(order.status)}>{order.status}</Badge></TableCell>
                    <TableCell className="text-right">{formatCurrency(order.approvedPrice || order.totalPrice)}</TableCell>
                    <TableCell>
                      <OrderEditDialog order={order}>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                      </OrderEditDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={6} className="h-24 text-center">Nenhum pedido encontrado.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
