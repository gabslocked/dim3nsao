'use client';

import dynamic from 'next/dynamic';
import { PersonalizationForm } from '@/components/customize/personalization-form';
import { ScrollReveal } from '@/components/animations';

const PreviewGenerator = dynamic(
  () => import('@/components/3d-preview/preview-generator'),
  { ssr: false }
);

export default function CustomizePage() {
  return (
    <div className="container py-24 md:py-32 mx-auto">
      <div className="text-center">
        <ScrollReveal direction="up">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-glow">Crie seu Produto 3D Personalizado</h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Siga os passos abaixo para transformar sua ideia em um objeto real. Preencha o formulário para adicionar o produto ao seu carrinho.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal direction="up" delay={0.3}>
        <div className="mt-16 max-w-4xl mx-auto space-y-8">
          <PersonalizationForm />
          <PreviewGenerator />
        </div>
      </ScrollReveal>
    </div>
  );
}
