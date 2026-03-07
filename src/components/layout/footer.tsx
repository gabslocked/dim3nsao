
import Link from "next/link";
import Image from "next/image";
import {Instagram} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container max-w-screen-xl">
        <div className="grid grid-cols-1 gap-12 py-20 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex flex-col items-start gap-4 md:col-span-2">
            <Link href="/" className="flex items-center">
              <Image src="/images/logo_nome.png" alt="DIM3NSÃO Logo" width={180} height={32} className="h-8 w-auto" />
            </Link>
            <p className="text-base text-muted-foreground max-w-xs">
              Bem vindo a DIM3NSÃO da impressão 3D
            </p>
          </div>
          <div>
            <h3 className="font-headline font-bold text-lg uppercase tracking-wider">Produtos</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/#products" className="text-muted-foreground hover:text-primary transition-colors">Miniaturas</Link></li>
              <li><Link href="/#products" className="text-muted-foreground hover:text-primary transition-colors">Litophane</Link></li>
              <li><Link href="/#products" className="text-muted-foreground hover:text-primary transition-colors">DoubleName</Link></li>
                 <li><Link href="/#products" className="text-muted-foreground hover:text-primary transition-colors">Outros</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-bold text-lg uppercase tracking-wider">Empresa</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/quem-somos" className="text-muted-foreground hover:text-primary transition-colors">Sobre Nós</Link></li>
              <li><Link href="/manutencao" className="text-muted-foreground hover:text-primary transition-colors">Manutenção</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-bold text-lg uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/termos-de-servico" className="text-muted-foreground hover:text-primary transition-colors">Termos de Serviço</Link></li>
              <li><Link href="/politica-de-privacidade" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidade</Link></li>
              <li><Link href="/politica-de-cookies" className="text-muted-foreground hover:text-primary transition-colors">Política de Cookies</Link></li>
              <li><Link href="/politica-de-troca-e-devolucao" className="text-muted-foreground hover:text-primary transition-colors">Política de Troca e Devolução</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col-reverse items-center justify-between gap-6 border-t py-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DIM3NSÃO. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-5">
            <Link href="https://www.instagram.com/dim3nsao/" target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={22} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
