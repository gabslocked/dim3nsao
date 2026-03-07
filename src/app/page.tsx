'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Box, ImageIcon, TextCursorInput, Cpu, Layers, Zap, KeyRound, Scan, Crown, Scaling, Focus, PersonStanding, ScanFaceIcon, Camera, Paintbrush, Package, Star, ChevronDown, ShieldCheck, Mail } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem, AnimatedCounter, TiltCard, Floating } from "@/components/animations";

const heroImage = PlaceHolderImages.find(img => img.id === "hero-1");
const ctaBannerImage = PlaceHolderImages.find(img => img.id === "cta-banner");

const showcaseItems = [
  {
    id: "miniatures",
    title: "Miniaturas Personalizadas",
    description: "Funko, Cartoon ou Realista. Você escolhe o estilo e nós criamos a sua miniatura.",
    icon: PersonStanding,
    image: PlaceHolderImages.find(img => img.id === 'showcase-funko'),
    href: "/customize"
  },
  {
    id: "litophane",
    title: "Litophane",
    description: "Transforme suas fotos em um abajur porta-retrato que revela a imagem com a luz.",
    icon: ImageIcon,
    image: PlaceHolderImages.find(img => img.id === 'showcase-litophane'),
    href: "/customize"
  },
  {
    id: "doublename",
    title: "DoubleName",
    description: "Decoração 3D com dois nomes entrelaçados. Um presente único e criativo.",
    icon: TextCursorInput,
    image: PlaceHolderImages.find(img => img.id === 'showcase-doublename'),
    href: "/customize"
  },
  {
    id: "modeling",
    title: "Modelagem 3D .stl",
    description: "Precisa de um modelo 3D ? \n Nós modelamos para você, pronto para impressão.",
    icon: Box,
    image: PlaceHolderImages.find(img => img.id === 'showcase-modeling'),
    href: "/customize"
  },
  {
    id: "keychains",
    title: "Chaveiros",
    description: "Chaveiros personalizados com seu logo, nomes ou designs favoritos.",
    icon: KeyRound,
    image: PlaceHolderImages.find(img => img.id === 'showcase-keychains'),
    href: "/customize"
  },
  {
    id: "exclusive",
    title: "Bobblehead",
    description: "Exclusividade da DIM3NSÃO ! Faça o famoso Bobblehead, balançando a cabeça por onde passa.",
    icon: Crown,
    image: PlaceHolderImages.find(img => img.id === 'showcase-exclusive'),
    href: "/customize"
  }
];

const featureItems = [
    {
        icon: Layers,
        title: "Materiais Premium",
        description: "Utilizamos apenas os melhores filamentos e tintas para garantir um acabamento perfeito e duradouro."
    },
    {
        icon: Focus,
        title: "Atenção aos Detalhes",
        description: "Nossa equipe de artistas e técnicos se dedica a cada detalhe, garantindo que o produto final seja uma réplica fiel da sua visão."
    },
    {
        icon: Zap,
        title: "Prototipagem Rápida",
        description: "Da concepção à criação em tempo recorde, para que você receba seu produto o mais rápido possível."
    }
];

const howItWorksSteps = [
  { number: 1, icon: Camera, title: "Envie sua Foto", description: "Faça upload da sua melhor foto e escolha o estilo que mais combina com você." },
  { number: 2, icon: Paintbrush, title: "Criamos seu Modelo 3D", description: "Nossa equipe transforma sua imagem em uma peça 3D única com acabamento premium." },
  { number: 3, icon: Package, title: "Receba em Casa", description: "Enviamos para todo o Brasil com embalagem especial e carta personalizada." },
];

const statsData = [
  { target: 500, suffix: "+", label: "Clientes Satisfeitos" },
  { target: 1000, suffix: "+", label: "Peças Entregues" },
  { target: 49, suffix: "/5", label: "Avaliação Média", divisor: 10 },
  { target: 98, suffix: "%", label: "Taxa de Satisfação" },
];

const testimonials = [
  { quote: "A miniatura ficou idêntica! Minha esposa amou o presente.", author: "Carlos M.", city: "São Paulo" },
  { quote: "Qualidade incrível e entrega super rápida. Recomendo!", author: "Ana P.", city: "Rio de Janeiro" },
  { quote: "O litophane ficou lindo, superou todas as expectativas.", author: "Rafael S.", city: "Belo Horizonte" },
];

const faqItems = [
  { q: "Quanto tempo leva para receber meu produto?", a: "O prazo de produção é de 5-25 dias úteis + prazo de envio dos Correios. Itens personalizados exigem cuidado extra para garantir qualidade!" },
  { q: "Posso pedir alterações depois do pedido?", a: "Sim! Antes de iniciarmos a produção, você pode solicitar ajustes. Após o início da impressão, alterações não são possíveis." },
  { q: "Quais materiais vocês utilizam?", a: "Utilizamos PLA e resina de alta qualidade, com acabamento em pintura manual profissional para máximo realismo." },
  { q: "Vocês enviam para todo o Brasil?", a: "Sim! Enviamos para todos os estados brasileiros via Correios, com código de rastreamento." },
  { q: "Como funciona o pagamento?", a: "Aceitamos PIX, cartão de crédito e boleto. O pagamento é processado de forma segura." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-white/10 rounded-xl bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="text-lg font-medium pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48 pb-6' : 'max-h-0'}`}>
        <p className="px-6 text-muted-foreground">{answer}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ===== HERO ===== */}
      <section className="relative w-full h-screen flex items-center justify-center text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative container max-w-screen-xl text-white z-10">
          <ScrollReveal direction="down">
            <h1 className="flex flex-col items-center text-5xl md:text-8xl font-headline font-black tracking-tighter !leading-tight text-glow uppercase text-center">
              <span>Seja bem vindo a</span>
              <span className="my-4">
                <Image
                  src="/images/logo_nome.png"
                  alt="DIM3NSÃO Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-[1em] w-auto inline-block align-middle transition-all duration-300 hover:drop-shadow-[0_0_8px_hsl(var(--primary))]"
                  priority
                />
              </span>
              <span>da impressão 3D!</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-2xl text-foreground/90">
              Aqui uma foto se transforma em um porta retrato abajur (Litophane) ou em uma escultura 1:10 personalizada (Funko, Cartoon ou realista).<br/>
              Um presente que vai surpreender a todos, até mesmo você !<br/>
              Ou vai ficar de fora dessa ?<br/>
              Sua satisfação é o nosso sucesso !
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.4}>
            <div className="mt-12">
              <Floating amplitude={3} duration={3}>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-7 rounded-full button-glow transition-all duration-300 hover:scale-105">
                  <Link href="/customize">
                    Customize Agora <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </Floating>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section id="products" className="py-24 md:py-32">
        <div className="container max-w-screen-xl">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase text-glow">Nossos Produtos</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Dê vida às suas memórias.</p>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseItems.map((item) => (
              <StaggerItem key={item.id}>
                <TiltCard className="h-full">
                  <Card className="bg-card/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 flex flex-col h-full">
                    {item.image && (
                       <div className="aspect-video overflow-hidden">
                        <Image
                          src={item.image.imageUrl}
                          alt={item.image.description}
                          width={600}
                          height={400}
                          className="object-cover mx-auto max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                          data-ai-hint={item.image.imageHint}
                        />
                       </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <CardTitle className="font-headline text-2xl flex items-center gap-3">
                          <item.icon className="w-7 h-7 text-primary"/>
                          {item.title}
                      </CardTitle>
                      <p className="text-muted-foreground mt-4 flex-grow">{item.description}</p>
                       <Button asChild variant="link" className="p-0 mt-6 text-primary font-bold self-start text-base">
                        <Link href={item.href}>
                          Personalizar <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-24 md:py-32 border-y border-border">
          <div className="container max-w-screen-xl">
              <ScrollReveal>
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase text-glow">Nosso Diferencial</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Trabalhamos para entregar a melhor experiencia em um presente.<br/> No qual você pode escrever uma carta, e nos enviamos uma semente de girasol para florir a vida e trazer boas vibrações !</p>
                </div>
              </ScrollReveal>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  {featureItems.map((feature, index) => (
                    <StaggerItem key={index}>
                      <div className="p-10 bg-card/80 backdrop-blur-sm border border-white/10 rounded-xl flex flex-col items-center transition-all duration-300 hover:border-primary/50 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10">
                          <div className="mb-6 p-4 bg-primary/10 rounded-full text-primary">
                              <feature.icon className="w-10 h-10" />
                          </div>
                          <h3 className="text-3xl font-headline font-bold mb-3">{feature.title}</h3>
                          <p className="text-muted-foreground text-base">{feature.description}</p>
                      </div>
                    </StaggerItem>
                  ))}
              </StaggerContainer>
          </div>
      </section>

      {/* ===== COMO FUNCIONA ===== */}
      <section className="py-24 md:py-32">
        <div className="container max-w-screen-xl">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase text-glow">Como Funciona</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Simples, rápido e personalizado. Em apenas 3 passos.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting dashed line (desktop only) */}
            <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] border-t-2 border-dashed border-primary/30" />
            {howItWorksSteps.map((step, i) => (
              <ScrollReveal key={step.number} direction="up" delay={i * 0.2}>
                <div className="flex flex-col items-center text-center relative">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary font-headline text-2xl font-bold mb-6 z-10 bg-background">
                    {step.number}
                  </div>
                  <div className="mb-4 p-3 bg-primary/10 rounded-full text-primary">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground max-w-xs">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF / STATS ===== */}
      <section className="py-24 md:py-32 border-y border-border">
        <div className="container max-w-screen-xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase text-glow">Números que Falam</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">A confiança dos nossos clientes é o nosso maior orgulho.</p>
            </div>
          </ScrollReveal>

          {/* Stats Row */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {statsData.map((stat, i) => (
              <StaggerItem key={i}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-headline font-black text-primary">
                    <AnimatedCounter target={stat.divisor ? stat.target / stat.divisor : stat.target} suffix={stat.suffix} prefix={stat.divisor ? "" : ""} />
                  </div>
                  <p className="mt-2 text-muted-foreground text-sm md:text-base">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Testimonials */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <div className="p-8 bg-card/80 backdrop-blur-sm border border-white/10 rounded-xl hover:border-primary/30 transition-all duration-300">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/90 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-muted-foreground text-sm font-medium">{t.author}, {t.city}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24 md:py-32">
        <div className="container max-w-screen-xl max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase text-glow">Perguntas Frequentes</h2>
              <p className="mt-4 text-lg text-muted-foreground">Tire suas dúvidas sobre nossos produtos e serviços.</p>
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                <FAQItem question={item.q} answer={item.a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GUARANTEE + EMAIL ===== */}
      <section className="py-24 md:py-32 border-y border-border">
        <div className="container max-w-screen-xl">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="mx-auto mb-6 p-4 bg-primary/10 rounded-full text-primary w-fit">
                <ShieldCheck className="w-12 h-12" />
              </div>
              <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase text-glow">Satisfação Garantida</h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Se você não ficar 100% satisfeito, refazemos seu produto sem custo adicional.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.3}>
            <div className="mt-16 max-w-md mx-auto">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="bg-card/80 border-white/10 h-12"
                />
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 px-6 rounded-lg whitespace-nowrap">
                  <Mail className="w-4 h-4 mr-2" />
                  Receber Novidades
                </Button>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-3">
                Fique por dentro de promoções exclusivas e lançamentos.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="relative py-32 md:py-48">
        {ctaBannerImage && (
            <Image
                src={ctaBannerImage.imageUrl}
                alt={ctaBannerImage.description}
                fill
                className="object-cover"
                data-ai-hint={ctaBannerImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/80" />
        <ScrollReveal direction="up">
          <div className="relative container max-w-screen-xl text-center text-white z-10">
            <h2 className="text-5xl md:text-6xl font-headline font-black uppercase text-glow">Tem uma Ideia para um Projeto?</h2>
            <p className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-foreground/90">
              Estamos prontos para transformar em realidade.
              Fale com nossos especialistas e comece seu projeto hoje mesmo.
            </p>
            <div className="mt-12">
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg px-10 py-7 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                <Link href="/customize">
                  Comece a Criar
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
