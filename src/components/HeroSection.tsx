import heroImage from "@/assets/hero-wood-art.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Hand-painted floral art on walnut wood surface"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex min-h-[85vh] items-center py-20">
        <div className="max-w-2xl animate-reveal">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gold">
            Artisan Craftsmanship Since 2010
          </p>
          <h1 className="mb-6 font-display text-5xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
            Where Wood Meets{" "}
            <span className="italic">Artistry</span>
          </h1>
          <p className="mb-8 max-w-lg text-lg text-primary-foreground/80 font-body">
            We breathe new life into cherished furniture and transform wooden surfaces
            into stunning hand-painted masterpieces.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <a href="#order">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <a href="#gallery">View Our Work</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
