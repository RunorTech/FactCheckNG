"use client";
import { Search, Menu, CheckCircle2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../../ui/sheet';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const Header = () => {
  const  pathName = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => pathName === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/lgas', label: 'Browse LGAs' },
    { path: '/submit-claims', label: 'Submit Claim' },
    { path: '/about', label: 'About' },
  ];

  const NavLinks = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setMobileOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">FactCheckNG</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
        </nav>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-sm ml-6">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search claims..."
              className="pl-9 w-full"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <SheetTitle>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
            </SheetTitle>
          </SheetTrigger>
          <SheetContent  side="right" className="w-[300px]">
            <div className="px-4 flex flex-col gap-6 mt-6">
              {/* <div className="relative  mt-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search claims..."
                  className="pl-9"
                />
              </div> */}
              <nav className="flex flex-col gap-4">
                <NavLinks />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
