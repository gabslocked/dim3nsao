
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Termos de Serviço | DIM3NSÃO',
  description: 'Leia nossos Termos de Serviço para entender as regras de uso de nossos produtos e serviços de impressão 3D.',
};

export default function TermosDeServicoPage() {
  return (
    <div className="bg-background">
      <div className="container max-w-screen-lg py-24 md:py-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-glow">Termos de Serviço</h1>
          <p className="mt-4 text-lg text-muted-foreground">Última atualização: 27 de Julho de 2024</p>
        </div>

        <Card>
          <CardContent className="p-8 md:p-10 space-y-8 text-muted-foreground">
            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">1. Visão Geral</h2>
              <p>
                Bem-vindo à DIM3NSÃO. Estes Termos de Serviço ("Termos") governam seu acesso e uso de nosso site, produtos e serviços de impressão 3D personalizada. Ao realizar uma compra ou utilizar nossos serviços, você concorda em cumprir estes Termos.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">2. Nossos Serviços</h2>
              <p>
                A DIM3NSÃO oferece produtos personalizados criados através de tecnologia de impressão 3D, incluindo, mas não se limitando a, miniaturas, litophanes e outros itens customizados baseados em fotos e especificações fornecidas pelo cliente.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">3. Pedidos e Fluxo de Aprovação</h2>
              <p>
                <strong>3.1. Pedidos Padrão:</strong> Pedidos realizados sem "Observações" ou solicitações especiais entram em produção após a confirmação do pagamento. O status inicial será "Pendente".
              </p>
              <p>
                <strong>3.2. Pedidos com Observações:</strong> Se você adicionar observações que possam alterar o design ou custo do produto, o pedido não irá para pagamento imediato. Ele receberá o status de "Aguardando Aprovação". Nossa equipe analisará a solicitação, ajustará o preço se necessário, e enviará para sua aprovação. O pagamento só será habilitado após a aprovação do valor final.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">4. Pagamento e Produção</h2>
              <p>
                O pagamento será processado através de métodos seguros. A produção do seu item personalizado só será iniciada após a confirmação do pagamento do valor final (seja ele o preço padrão ou o preço aprovado após uma observação). O tempo de produção estimado será informado na página do produto ou durante o checkout.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">5. Política de Envio</h2>
              <p>
                Os custos e prazos de envio são calculados durante o checkout com base no CEP fornecido. Após o envio, o código de rastreio será disponibilizado na sua página de perfil ("Meus Pedidos"). Não nos responsabilizamos por atrasos causados pelos serviços de entrega, mas ofereceremos suporte para resolver quaisquer problemas.
              </p>
            </section>
            
            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">6. Responsabilidades do Cliente</h2>
              <p>
                Você é responsável por fornecer informações precisas (endereço, dados de contato) e imagens de boa qualidade para a personalização. Você declara que possui os direitos autorais ou a permissão necessária para usar as imagens enviadas.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">7. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo do site, incluindo design, logos e textos, é propriedade da DIM3NSÃO. As imagens enviadas por você para a criação dos produtos continuam sendo de sua propriedade; você nos concede apenas uma licença para usar a imagem com o único propósito de produzir seu item personalizado.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">8. Política de Cancelamento e Devolução</h2>
              <p>
                Por se tratarem de produtos 100% personalizados, cancelamentos só podem ser feitos antes do início da produção. Não aceitamos devoluções ou trocas, exceto em caso de defeito de fabricação comprovado. Se seu produto chegar danificado, entre em contato conosco em até 7 dias corridos após o recebimento.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">9. Limitação de Responsabilidade</h2>
              <p>
                A DIM3NSÃO não se responsabiliza por variações mínimas de cor ou detalhes inerentes ao processo de impressão 3D. Nossa responsabilidade máxima limita-se ao valor pago pelo produto.
              </p>
            </section>
            
            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">10. Contato</h2>
              <p>
                Para qualquer dúvida sobre estes Termos de Serviço, entre em contato conosco pelo e-mail: <a href="mailto:dim3nsao.3d@gmail.com" className="text-primary hover:underline">dim3nsao.3d@gmail.com</a>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
