
import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Cookies | DIM3NSÃO',
  description: 'Saiba como utilizamos cookies para melhorar sua experiência em nosso site.',
};

export default function PoliticaDeCookiesPage() {
  return (
    <div className="bg-background">
      <div className="container max-w-screen-lg py-24 md:py-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-glow">Política de Cookies</h1>
          <p className="mt-4 text-lg text-muted-foreground">Última atualização: 27 de Julho de 2024</p>
        </div>

        <Card>
          <CardContent className="p-8 md:p-10 space-y-8 text-muted-foreground">
            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">1. O que são Cookies?</h2>
              <p>
                Cookies são pequenos arquivos de texto que os sites armazenam no seu computador ou dispositivo móvel quando você os visita. Eles são amplamente utilizados para fazer os sites funcionarem, ou funcionarem de forma mais eficiente, bem como para fornecer informações aos proprietários do site.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">2. Como Usamos os Cookies</h2>
              <p>Na DIM3NSÃO, utilizamos cookies para finalidades essenciais que garantem o funcionamento correto do nosso e-commerce. Não usamos cookies para fins de marketing ou rastreamento de terceiros.</p>
            </section>
            
            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">3. Tipos de Cookies que Utilizamos</h2>
              <p>Utilizamos as seguintes categorias de cookies:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong>Cookies Essenciais:</strong> Estes cookies são estritamente necessários para o funcionamento do site. Eles permitem que você navegue pelo site e use recursos essenciais, como acessar áreas seguras (sua conta) e gerenciar seu carrinho de compras. Sem esses cookies, os serviços que você solicitou não podem ser fornecidos.
                </li>
                <li>
                  <strong>Cookies de Autenticação:</strong> Quando você faz login em sua conta, usamos cookies para manter sua sessão ativa. Isso evita que você precise fazer login novamente a cada página que visita. Este cookie é fundamental para a segurança e a usabilidade da sua área de cliente.
                </li>
                 <li>
                  <strong>Cookies Analíticos (Futuro):</strong> Poderemos usar cookies para coletar informações sobre como os visitantes usam nosso site, por exemplo, quais páginas visitam com mais frequência. Essas informações nos ajudam a melhorar o site. No momento, não utilizamos cookies analíticos de terceiros como Google Analytics.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">4. Gerenciamento de Cookies</h2>
              <p>
                Como utilizamos apenas cookies essenciais para o funcionamento da plataforma, não oferecemos uma opção para desativá-los, pois isso tornaria o site inutilizável (por exemplo, o login e o carrinho de compras deixariam de funcionar).
              </p>
              <p>
                  No entanto, a maioria dos navegadores permite que você controle os cookies através de suas configurações. Você pode configurar seu navegador para bloquear ou alertá-lo sobre esses cookies, mas algumas partes do site não funcionarão.
              </p>
            </section>
            
            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">5. Alterações na Política de Cookies</h2>
              <p>
                Podemos atualizar esta Política de Cookies de tempos em tempos. Recomendamos que você revise esta página periodicamente para quaisquer alterações.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">6. Contato</h2>
              <p>
                Se você tiver alguma dúvida sobre nossa Política de Cookies, por favor, leia nossa <Link href="/politica-de-privacidade" className="text-primary hover:underline">Política de Privacidade</Link> ou entre em contato pelo e-mail: <a href="mailto:dim3nsao.3d@gmail.com" className="text-primary hover:underline">dim3nsao.3d@gmail.com</a>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
