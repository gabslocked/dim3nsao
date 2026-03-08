
import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Política de Troca e Devolução | DIM3NSÃO',
  description: 'Conheça nossa política de trocas e devoluções para produtos personalizados e garanta seus direitos como consumidor.',
};

export default function PoliticaDeTrocaEDevolucaoPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-background">
      <div className="container max-w-screen-lg py-24 md:py-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-glow">Política de Troca e Devolução</h1>
          <p className="mt-4 text-lg text-muted-foreground">Última atualização: {currentYear}</p>
        </div>

        <Card>
          <CardContent className="p-8 md:p-10 space-y-8 text-muted-foreground">
            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">1. Introdução</h2>
              <p>
                Na DIM3NSÃO, valorizamos a satisfação e a transparência na relação com nossos clientes. Esta política descreve como proceder em casos de troca ou devolução de nossos produtos de impressão 3D personalizados, respeitando o Código de Defesa do Consumidor brasileiro.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">2. Direito de Arrependimento</h2>
              <p>
                Conforme o artigo 49 do Código de Defesa do Consumidor, para compras realizadas fora do estabelecimento comercial (como em nosso site), o cliente tem o prazo de 7 (sete) dias corridos, a contar da data do recebimento do produto, para se arrepender da compra e solicitar a devolução.
              </p>
              <p>Condições para o arrependimento:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>O produto não deve apresentar sinais de mau uso.</li>
                <li>O cliente deve entrar em contato com nosso suporte através do e-mail <a href="mailto:dim3nsao.3d@gmail.com" className="text-primary hover:underline">dim3nsao.3d@gmail.com</a> para formalizar a solicitação.</li>
                <li>O reembolso será processado após o recebimento e verificação do produto em nosso centro.</li>
              </ul>
            </section>
            
            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">3. Política para Produtos Personalizados</h2>
              <p>
                Grande parte de nosso catálogo consiste em produtos feitos sob encomenda e personalizados (miniaturas, litophanes, modelagem, etc.).
              </p>
               <p>
                Por serem feitos sob medida, o direito de arrependimento pode não se aplicar caso o produto tenha sido produzido exatamente conforme o que foi solicitado e aprovado pelo cliente. Qualquer pedido de modificação deve ser aprovado antes do início da produção.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">4. Produtos com Avaria ou Defeito de Fabricação</h2>
              <p>
                Se o seu produto chegar danificado pelo transporte ou com um defeito de fabricação, o cliente deve nos contatar em até 7 (sete) dias corridos após o recebimento.
              </p>
              <p>Procedimento:</p>
               <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Envie um e-mail para <a href="mailto:dim3nsao.3d@gmail.com" className="text-primary hover:underline">dim3nsao.3d@gmail.com</a> com o número do pedido.</li>
                <li>Anexe fotos nítidas do problema.</li>
                <li>Aguarde a análise de nossa equipe. Após a confirmação, ofereceremos a substituição, reparo ou reembolso.</li>
              </ul>
            </section>
            
            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">5. Erros de Produção</h2>
              <p>
                Se o erro for de nossa parte (ex: o produto final é diferente do que foi aprovado), a DIM3NSÃO se responsabiliza integralmente. Iremos reproduzir o item corretamente ou oferecer o reembolso total ou crédito na loja, à sua escolha.
              </p>
            </section>

             <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">6. Problemas na Entrega</h2>
              <p>
                Em caso de extravio, atrasos significativos ou problemas com o rastreamento, entre em contato com nosso suporte. Iremos prontamente intermediar com a transportadora para resolver a situação.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">7. Processo de Reembolso</h2>
              <p>
                Após a aprovação da devolução e recebimento do produto, o reembolso será processado pelo método de pagamento original em até 10 dias úteis.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">8. Contato</h2>
              <p>
                Nosso canal oficial para solicitações de troca ou devolução é o e-mail: <a href="mailto:dim3nsao.3d@gmail.com" className="text-primary hover:underline">dim3nsao.3d@gmail.com</a>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
