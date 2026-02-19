import { Link, useLocation } from "react-router-dom";
import { TreePine, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { label: "Gallery", href: "#gallery" },
  { label: "Services", href: "#services" },
  { label: "Trends", href: "#trends" },
  { label: "Custom Order", href: "#order" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <TreePine className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-display text-xl font-bold text-foreground">
            Art & Wood <span className="text-primary">Revival</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary story-link"
            >
              <span>{item.label}</span>
            </a>
          ))}
          <Button asChild size="sm">
            <a href="#order">Get a Quote</a>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container flex flex-col gap-3 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary py-1"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button asChild size="sm" className="w-fit">
              <a href="#order" onClick={() => setMobileOpen(false)}>Get a Quote</a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
