'use client';

import { ReactNode } from 'react';
import { useUser, useAuth } from '@/firebase/provider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Loader2, LogIn } from 'lucide-react';

interface AuthGuardProps {
  children: ReactNode;
  role?: string;
}

export function AuthGuard({ children, role }: AuthGuardProps) {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    const handleLogin = async () => {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error('Login error:', error);
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Acesso Restrito</h2>
          <p className="text-muted-foreground">
            Faça login para acessar esta página.
          </p>
        </div>
        <Button onClick={handleLogin} size="lg">
          <LogIn className="mr-2 h-4 w-4" />
          Entrar com Google
        </Button>
      </div>
    );
  }

  // Role check placeholder — in a real app, check Firestore user doc for role
  // For now, allow all authenticated users through
  // TODO: Implement role-based access when user roles are stored in Firestore

  return <>{children}</>;
}
