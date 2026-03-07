
import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Política de Privacidade | DIM3NSÃO',
  description: 'Entenda como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD.',
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="bg-background">
      <div className="container max-w-screen-lg py-24 md:py-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-glow">Política de Privacidade</h1>
          <p className="mt-4 text-lg text-muted-foreground">Última atualização: 27 de Julho de 2024</p>
        </div>

        <Card>
          <CardContent className="p-8 md:p-10 space-y-8 text-muted-foreground">
            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">1. Introdução</h2>
              <p>
                A sua privacidade é fundamental para a DIM3NSÃO. Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD) do Brasil.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">2. Dados que Coletamos</h2>
              <p>Coletamos os seguintes tipos de informações:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Informações de Cadastro:</strong> Nome, e-mail e dados de login (via Google/Facebook ou e-mail/senha).</li>
                <li><strong>Informações de Pedidos:</strong> Produtos adquiridos, histórico de pedidos, endereço para entrega e observações personalizadas.</li>
                <li><strong>Conteúdo do Usuário:</strong> Imagens e fotos que você envia para a personalização de produtos.</li>
                <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, informações do dispositivo e páginas visitadas, coletados para garantir a segurança e o bom funcionamento do site.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">3. Como Usamos Seus Dados</h2>
              <p>Utilizamos suas informações para as seguintes finalidades:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Processamento de Pedidos:</strong> Para fabricar, faturar, enviar e entregar seus produtos personalizados.</li>
                <li><strong>Gerenciamento de Conta:</strong> Para criar e gerenciar sua conta de usuário, permitindo o acompanhamento de pedidos e o acesso ao seu histórico.</li>
                <li><strong>Atendimento ao Cliente:</strong> Para responder a suas dúvidas, solicitações de orçamento e oferecer suporte.</li>
                <li><strong>Segurança:</strong> Para proteger sua conta e nosso site contra fraudes e atividades não autorizadas.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">4. Serviços de Terceiros e Armazenamento</h2>
              <p>Para operar, utilizamos os serviços seguros do Google Firebase. Seus dados são armazenados da seguinte forma:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Firebase Authentication:</strong> Gerencia seu login de forma segura.</li>
                <li><strong>Firestore Database:</strong> Armazena as informações de sua conta e seus pedidos.</li>
                <li><strong>Firebase Storage:</strong> Armazena de forma segura as imagens que você envia para personalização.</li>
              </ul>
              <p>Não compartilhamos seus dados com terceiros para fins de marketing.</p>
            </section>
            
            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">5. Segurança dos Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados, como criptografia e regras de acesso restrito no banco de dados. O acesso às suas informações é limitado apenas aos funcionários que precisam delas para processar seu pedido.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">6. Seus Direitos (LGPD)</h2>
              <p>De acordo com a LGPD, você tem o direito de:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Confirmar a existência de tratamento de seus dados.</li>
                <li>Acessar seus dados.</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
                <li>Solicitar a portabilidade dos seus dados a outro fornecedor de serviço.</li>
                <li>Solicitar a eliminação dos dados pessoais tratados com o seu consentimento.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">7. Como Exercer Seus Direitos</h2>
              <p>
                Para exercer seus direitos, como a exclusão de seus dados, por favor, envie uma solicitação para nosso e-mail de contato. A exclusão de dados resultará na perda do acesso à sua conta e histórico de pedidos.
              </p>
            </section>
            
            <section className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">8. Contato</h2>
              <p>
                Se você tiver alguma dúvida sobre nossa Política de Privacidade ou sobre como tratamos seus dados, entre em contato com o Encarregado de Proteção de Dados (DPO) através do e-mail: <a href="mailto:dim3nsao.3d@gmail.com" className="text-primary hover:underline">dim3nsao.3d@gmail.com</a>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
