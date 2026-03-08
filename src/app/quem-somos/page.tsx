'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Layers, Scaling, Cpu, Heart, Target, Gem, Eye, Star } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations';

const heroImage = PlaceHolderImages.find(img => img.id === 'cta-banner');
const storyImage = PlaceHolderImages.find(img => img.id === 'showcase-modeling');
const ctaBannerImage = PlaceHolderImages.find(img => img.id === 'cta-banner');

const differentials = [
  {
    icon: Layers,
    title: "Materiais de Alta Qualidade",
    description: "Utilizamos apenas resinas e filamentos premium para garantir acabamentos perfeitos e durabilidade excepcional em cada peça."
  },
  {
    icon: Scaling,
    title: "Atenção aos Detalhes",
    description: "Nossa equipe de artistas e técnicos se dedica a cada detalhe, garantindo que seja o presente perfeito."
  },
  {
    icon: Heart,
    title: "Foco no Cliente",
    description: "Sua satisfação é nossa prioridade. Oferecemos um atendimento personalizado para garantir que sua experiência seja incrível."
  }
];

const missionVisionValues = [
  {
    icon: Target,
    title: "Nossa Missão",
    description: "Materializar memórias, ideias e paixões em peças 3D personalizadas, oferecendo uma forma única de expressão e conexão emocional."
  },
  {
    icon: Eye,
    title: "Nossa Visão",
    description: "Ser a principal referência em impressão 3D personalizada, reconhecida pela inovação, qualidade artística e por transformar a imaginação em realidade."
  },
  {
    icon: Gem,
    title: "Nossos Valores",
    description: "Criatividade, Qualidade, Inovação, Paixão pelo Cliente e Integridade. Estes são os pilares que sustentam cada projeto que realizamos."
  }
];

const testimonials = [
    {
        quote: "A miniatura ficou perfeita, cheia de detalhes! Superou todas as minhas expectativas. Um trabalho de arte!",
        name: "Juliana S.",
        rating: 5
    },
    {
        quote: "O litophane que encomendei é lindo. A forma como a imagem aparece com a luz é mágica. Presente incrível.",
        name: "Marcos P.",
        rating: 5
    },
    {
        quote: "Processo super simples e o resultado é fantástico. A equipe de atendimento foi muito atenciosa do início ao fim.",
        name: "Carla R.",
        rating: 5
    }
]

export default function QuemSomosPage() {
  return (
    <div className="flex flex-col text-foreground">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center text-center">
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
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative container max-w-screen-xl text-white z-10">
          <ScrollReveal direction="up">
            <h1 className="text-5xl md:text-7xl font-headline font-black tracking-tighter !leading-tight text-glow uppercase">
              Somos a <span className="text-primary">DIM3NSÃO</span> da Impressão 3D
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/90">
              Nossa missão é materializar suas memórias e ideias, transformando-as em peças 3D únicas e cheias de significado.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container max-w-screen-xl">
          <ScrollReveal direction="left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="rounded-lg overflow-hidden border border-border shadow-lg">
                {storyImage && (
                  <Image
                    src={storyImage.imageUrl}
                    alt={storyImage.description}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                    data-ai-hint={storyImage.imageHint}
                  />
                )}
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase text-glow mb-6">Nossa História</h2>
                <div className="space-y-4 text-muted-foreground text-lg">
                  <p>
                    A DIM3NSÃO nasceu da paixão pela arte e tecnologia. Vimos na impressão 3D uma oportunidade de realizar um ato de presentear em algo valioso e memorável. Uma forma de dar vida nas datas especiais.
                  </p>
                  <p>
                    Nos especializamos em transformar fotos e ideias em criações memoráveis. Seja um abajur <strong className="text-primary/90">Litophane</strong> que revela um momento especial com a luz, ou uma miniatura personalizada no seu estilo favorito — <strong className="text-primary/90">Funko, Cartoon ou Realista 1:10</strong> —, nosso objetivo é criar peças únicas que contem à sua história.
                  </p>
                   <p>
                    Acreditamos que entregamos mais que um presente. Uma obra artística que transpasa emoção dando vida às memórias inesquecíveis.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Differentials Section */}
      <section className="py-24 md:py-32 border-y border-border">
        <div className="container max-w-screen-xl">
          <ScrollReveal direction="up">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase text-glow">Nosso Diferencial</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Compromisso com a excelência em cada etapa do processo.</p>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentials.map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-8 bg-card/50 backdrop-blur-sm border border-white/10 rounded-xl flex flex-col items-center text-center transition-all duration-300 hover:border-primary/50 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10">
                  <div className="mb-5 p-4 bg-primary/10 rounded-full text-primary">
                    <item.icon className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-base flex-grow">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      
      {/* Mission, Vision, Values Section */}
      <section className="py-24 md:py-32">
        <div className="container max-w-screen-xl">
          <ScrollReveal direction="up">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {missionVisionValues.map((item, index) => (
                <StaggerItem key={index}>
                  <div className="flex flex-col items-center">
                    <div className="mb-6 text-primary">
                      <item.icon className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-headline font-bold mb-4 uppercase">{item.title}</h3>
                    <p className="text-muted-foreground text-lg">{item.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 md:py-32 border-y border-border">
        <div className="container max-w-screen-xl">
          <ScrollReveal direction="up">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase text-glow">O que nossos clientes dizem</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">A satisfação de quem confia em nosso trabalho.</p>
            </div>
          </ScrollReveal>
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <Card className="bg-card/80 backdrop-blur-sm border border-white/10 p-8 flex flex-col justify-between">
                  <blockquote className="text-lg text-foreground italic mb-6">"{testimonial.quote}"</blockquote>
                  <div>
                    <p className="font-bold text-base text-primary">{testimonial.name}</p>
                    <div className="flex mt-2">
                      {Array(testimonial.rating).fill(0).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <ScrollReveal direction="up">
        <section className="relative py-32 md:py-40">
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
          <div className="relative container max-w-screen-xl text-center text-white z-10">
            <h2 className="text-4xl md:text-6xl font-headline font-black uppercase text-glow">Transforme suas memórias em algo inesquecível.</h2>
            <p className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-foreground/90">
              Dê vida às suas ideias com a magia da impressão 3D.
            </p>
            <div className="mt-12">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-7 rounded-full button-glow transition-all duration-300 hover:scale-105">
                <Link href="/customize">
                  Customize Agora <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
