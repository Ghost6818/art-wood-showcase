import { Paintbrush, Hammer, TreePine, Heart, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TreePine className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-bold">Art & Wood Revival</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Crafting beauty from wood since 2010. Every piece tells a story.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Hammer className="h-3 w-3" /> Furniture Renovation</li>
              <li className="flex items-center gap-2"><Paintbrush className="h-3 w-3" /> Custom Wood Painting</li>
              <li className="flex items-center gap-2"><Heart className="h-3 w-3" /> Art Restoration</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-3 w-3" /> hello@artwoodrevival.com</li>
              <li className="flex items-center gap-2"><Phone className="h-3 w-3" /> +1 (555) 234-5678</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © 2025 Art & Wood Revival. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
