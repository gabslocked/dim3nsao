
'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useAuth, useUser, useUserProfile } from "@/firebase/provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import { useCart } from "@/context/cart-context";

const navItems = [
    { href: "/#products", label: "Produtos" },
    { href: "/manutencao", label: "Manutenção" },
    { href: "/quem-somos", label: "Quem Somos" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { user, isUserLoading } = useUser();
  const { data: userProfile, isLoading: isProfileLoading } = useUserProfile();
  const auth = useAuth();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getInitials = (name?: string | null) => {
    if (!name) return "?";
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }

  const UserMenu = () => {
    if (isUserLoading || isProfileLoading) {
        return <Skeleton className="h-10 w-10 rounded-full" />;
    }

    if (user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                            <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{userProfile?.name || user.displayName}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    {userProfile?.role === 'admin' && (
                         <DropdownMenuItem asChild>
                            <Link href="/admin/products">
                                <UserIcon className="mr-2 h-4 w-4" />
                                <span>Admin</span>
                            </Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => auth.signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <Button asChild>
            <Link href="/login">Login</Link>
        </Button>
    )
  }

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled ? "border-b border-border/40 bg-background/80 backdrop-blur-lg" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-24 max-w-screen-xl items-center px-4">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-8 flex items-center">
            <Image src="/images/logo_nome.png" alt="DIM3NSÃO Logo" width={180} height={32} className="h-8 w-auto transition-all duration-300 hover:drop-shadow-[0_0_8px_hsl(var(--primary))]" priority />
          </Link>
          <nav className="hidden items-center gap-10 text-base md:flex">
             {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-primary text-foreground/80 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              <Button asChild variant="ghost" size="icon" className="relative hover:text-primary w-10 h-10">
                <Link href="/cart">
                  <ShoppingCart className="h-6 w-6" />
                   {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {itemCount}
                    </span>
                  )}
                  <span className="sr-only">Carrinho</span>
                </Link>
              </Button>
              <UserMenu />
            </div>
            
            <div className="md:hidden">
              <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:text-primary w-10 h-10">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Abrir menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-lg p-0">
                    <nav className="flex flex-col h-full">
                       <div className="p-6 border-b border-border">
                         <SheetClose asChild>
                             <Link href="/" className="flex items-center space-x-3">
                                <Image src="/images/logo_nome.png" alt="DIM3NSÃO Logo" width={180} height={32} className="h-8 w-auto" />
                              </Link>
                         </SheetClose>
                       </div>
                      <div className="flex flex-col gap-6 p-6 text-lg">
                        {navItems.map((item) => (
                          <SheetClose asChild key={item.href}>
                            <Link
                              href={item.href}
                              className="transition-colors hover:text-primary text-foreground font-medium"
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                       <div className="mt-auto p-6 border-t border-border space-y-4">
                          <Button asChild variant="ghost" size="icon" className="relative hover:text-primary w-10 h-10">
                             <Link href="/cart">
                                <ShoppingCart className="h-6 w-6" />
                                {itemCount > 0 && (
                                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                    {itemCount}
                                  </span>
                                )}
                                <span className="sr-only">Carrinho</span>
                              </Link>
                          </Button>
                          {user ? (
                            <Button asChild className="w-full">
                                <Link href="/dashboard">Minha Conta</Link>
                            </Button>
                          ) : (
                            <Button asChild className="w-full">
                                <Link href="/login">Login</Link>
                            </Button>
                          )}
                        </div>
                    </nav>
                  </SheetContent>
                </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
