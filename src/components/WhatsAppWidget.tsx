
'use client';

import Link from 'next/link';
import { Floating } from '@/components/animations';

const WhatsAppIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path
            d="M.323 11.933a11.954 11.954 0 0 1 0-11.41 11.918 11.918 0 0 1 11.891.213 11.918 11.918 0 0 1 11.567 11.567A11.918 11.918 0 0 1 12.213 24c-1.895 0-3.7-.447-5.267-1.24l-6.37 1.24 1.24-6.37A11.918 11.918 0 0 1 .323 11.933zm7.072 8.239a9.92 9.92 0 0 0 4.818 1.24 9.918 9.918 0 0 0 9.873-9.873A9.918 9.918 0 0 0 12.213 2a9.918 9.918 0 0 0-9.873 9.873c0 1.77.473 3.483 1.307 4.963l.267.447-1.023 5.24 5.34-1.023.447.267a9.918 9.918 0 0 0 3.54 1.103zm6.6-6.136c-.333-.173-1.96-1.003-2.267-1.123-.307-.12-1.023-.12-1.33.353-.307.473-.867 1.123-1.067 1.353-.2.24-.4.267-.707.093-.307-.173-1.28-.473-2.44-1.523-1.16-1.05-1.933-2.34-2.16-2.74-.227-.393-.027-.613.147-.787.147-.147.333-.38.5-.527.173-.147.227-.24.333-.42.107-.173.053-.327-.027-.473-.08-.147-.707-1.707-.96-2.333-.253-.627-.507-.54-.68-.547-.173-.007-1.023-.013-1.33 0a2.23 2.23 0 0 0-1.587 1.587c0 .8.533 1.84 1.173 2.853.64 1.013 2.16 3.413 5.24 4.587 3.08 1.173 3.08.78 3.627.733.547-.053 1.707-.707 1.96-1.353.253-.64.253-1.2.173-1.353-.08-.153-.307-.24-.64-.413z"/>
    </svg>
);


export function WhatsAppWidget() {
    const phoneNumber = "5511980287829";
    const message = "Olá, gostaria de informações sobre meu pedido na DIM3NSÃO.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-6 right-6 z-50 group">
            <div className="absolute bottom-full right-0 mb-2 w-max bg-card border border-border p-2 px-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform group-hover:-translate-y-1">
                <p className="text-sm text-foreground">Precisa de ajuda? Fale conosco no WhatsApp</p>
            </div>
            <Floating amplitude={4} duration={3}>
                <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Fale conosco no WhatsApp"
                    className="flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
                >
                    <WhatsAppIcon />
                </Link>
            </Floating>
        </div>
    );
}
