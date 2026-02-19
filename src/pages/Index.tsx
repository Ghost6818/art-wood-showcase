import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProjectGallery } from "@/components/ProjectGallery";
import { CustomOrderForm } from "@/components/CustomOrderForm";
import { DataTable } from "@/components/DataTable";
import { ProjectChart } from "@/components/ProjectChart";
import { Footer } from "@/components/Footer";
import { sampleProjects } from "@/data/sampleProjects";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Paintbrush, Hammer, Leaf } from "lucide-react";
import type { Project, ProjectSummary } from "@/types/project";
import { isFurniture, isCanvas, type WorkItem } from "@/types/project";

// Demo: Type Guard usage
const demoItems: WorkItem[] = [
  { kind: "furniture", id: "f1", title: "Oak Chair", material: "Oak", weight: 12, legs: 4 },
  { kind: "canvas", id: "c1", title: "Forest Painting", material: "Birch", medium: "Oil", framed: true },
];

const Index = () => {
  // Type guard demo
  demoItems.forEach((item) => {
    if (isFurniture(item)) {
      console.log(`Furniture: ${item.title}, ${item.legs} legs`);
    } else if (isCanvas(item)) {
      console.log(`Canvas: ${item.title}, medium: ${item.medium}`);
    }
  });

  // DataTable columns using generic pattern
  const columns = [
    { header: "Project", accessor: ((row: Project) => (
      <span className="font-medium">{row.title}</span>
    )) as (row: Project) => React.ReactNode },
    { header: "Wood", accessor: "woodType" as keyof Project },
    { header: "Service", accessor: ((row: Project) => (
      <span className="flex items-center gap-1.5 capitalize">
        {row.service === "painting" ? <Paintbrush className="h-3.5 w-3.5 text-accent" /> : <Hammer className="h-3.5 w-3.5 text-primary" />}
        {row.service}
      </span>
    )) as (row: Project) => React.ReactNode },
    { header: "Dimensions", accessor: "dimensions" as keyof Project },
    { header: "Status", accessor: ((row: Project) => {
      const colors: Record<string, string> = {
        draft: "bg-muted text-muted-foreground",
        "in-progress": "bg-gold/20 text-accent",
        completed: "bg-primary/15 text-primary",
      };
      return <Badge className={colors[row.status]}>{row.status}</Badge>;
    }) as (row: Project) => React.ReactNode },
    { header: "Price", accessor: ((row: Project) => (
      <Tooltip>
        <TooltipTrigger>
          <span className="font-medium text-accent">${row.price?.toLocaleString()}</span>
        </TooltipTrigger>
        <TooltipContent>Estimated project cost in USD</TooltipContent>
      </Tooltip>
    )) as (row: Project) => React.ReactNode },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <HeroSection />

      {/* Services */}
      <section id="services" className="container py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-4xl font-bold text-foreground mb-3">What We Do</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From delicate restoration to bold artistic expression, we bring wood to life.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Hammer, title: "Furniture Renovation", desc: "Expert restoration bringing tired pieces back to their original glory with modern finishes." },
            { icon: Paintbrush, title: "Custom Wood Painting", desc: "One-of-a-kind hand-painted designs, from florals to abstract art, on any wooden surface." },
            { icon: Leaf, title: "Eco-Friendly Finishes", desc: "We use sustainable, non-toxic finishes that protect both the wood and the environment." },
          ].map((svc, i) => (
            <div
              key={svc.title}
              className="group rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:shadow-warm hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <svc.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{svc.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-muted/30 py-20">
        <div className="container">
          <ProjectGallery projects={sampleProjects}>
            <ProjectGallery.Toolbar />
            <ProjectGallery.Grid />
            <ProjectGallery.Detail />
          </ProjectGallery>
        </div>
      </section>

      {/* Trends */}
      <section id="trends" className="container py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <ProjectChart />
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">Project Overview</h3>
            <p className="text-muted-foreground mb-6">
              A detailed view of all ongoing and completed projects, sortable and filterable.
            </p>
            <DataTable<Project>
              data={sampleProjects}
              columns={columns}
              keyExtractor={(p) => p.id}
            />
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order" className="bg-muted/30 py-20">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl font-bold text-foreground mb-3">Start Your Project</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Fill out the form below and we'll get back to you with a custom quote.
            </p>
          </div>
          <CustomOrderForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
