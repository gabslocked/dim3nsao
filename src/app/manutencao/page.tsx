
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const heroImage = PlaceHolderImages.find(img => img.id === 'showcase-modeling');

export default function ManutencaoPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint="3d printer workshop"
          />
        )}
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative container max-w-screen-xl text-white z-10 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-headline font-black tracking-tighter !leading-tight text-glow uppercase">
            Manutenção de Impressoras 3D
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/90">
            Sua impressora 3D precisa de um cuidado especial? Oferecemos serviços de manutenção e reparo para garantir que seu equipamento funcione perfeitamente.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section id="request-form" className="py-24 md:py-32">
          <div className="container max-w-screen-xl">
              <div className="max-w-4xl mx-auto">
                 <Card>
                    <CardHeader>
                        <CardTitle>Solicitar Manutenção</CardTitle>
                        <CardDescription>Nosso formulário de solicitação de manutenção estará disponível em breve.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Em breve você poderá agendar a manutenção da sua impressora diretamente por aqui.</p>
                    </CardContent>
                 </Card>
              </div>
          </div>
      </section>
    </div>
  );
}
