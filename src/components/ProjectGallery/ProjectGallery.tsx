import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Project } from "@/types/project";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUpDown, DollarSign } from "lucide-react";

// --- Compound Component Context ---
interface GalleryContextType {
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: (p: Project | null) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
}

const GalleryContext = createContext<GalleryContextType | null>(null);

function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error("Gallery components must be used within <ProjectGallery>");
  return ctx;
}

// --- Root ---
function ProjectGallery({ children, projects }: { children: ReactNode; projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sortBy, setSortBy] = useState("title");

  const sorted = [...projects].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    if (sortBy === "woodType") return a.woodType.localeCompare(b.woodType);
    return 0;
  });

  return (
    <GalleryContext.Provider value={{ projects: sorted, selectedProject, setSelectedProject, sortBy, setSortBy }}>
      {children}
    </GalleryContext.Provider>
  );
}

// --- Toolbar ---
function GalleryToolbar() {
  const { sortBy, setSortBy } = useGallery();
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="font-display text-3xl font-bold text-foreground">Our Projects</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="mr-2 h-4 w-4" /> Sort by: {sortBy}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setSortBy("title")}>Title</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy("status")}>Status</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy("woodType")}>Wood Type</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// --- Grid ---
function GalleryGrid() {
  const { projects, setSelectedProject } = useGallery();
  const statusColor: Record<string, string> = {
    draft: "bg-muted text-muted-foreground",
    "in-progress": "bg-gold/20 text-accent",
    completed: "bg-primary/15 text-primary",
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <Card
          key={project.id}
          className="@container group cursor-pointer overflow-hidden border-border/50 transition-all duration-300 hover:shadow-warm hover:-translate-y-1"
          style={{ animationDelay: `${i * 100}ms` }}
          onClick={() => setSelectedProject(project)}
        >
          <div className="@md:flex-row flex flex-col">
            <div className="relative overflow-hidden aspect-[4/3] @md:aspect-auto @md:w-2/5">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <Badge className={`absolute top-3 right-3 ${statusColor[project.status] || ""}`}>
                {project.status}
              </Badge>
            </div>
            <CardContent className="p-4 @md:flex-1">
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{project.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{project.woodType}</span>
                {project.price && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center gap-1 text-accent font-medium">
                        <DollarSign className="h-3 w-3" />
                        {project.price}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Estimated project cost</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}

// --- Detail Dialog ---
function GalleryDetail() {
  const { selectedProject, setSelectedProject } = useGallery();
  return (
    <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
      <DialogContent className="max-w-2xl">
        {selectedProject && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">{selectedProject.title}</DialogTitle>
              <DialogDescription>{selectedProject.description}</DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full rounded-lg aspect-video object-cover"
              />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Wood Type:</span> <strong>{selectedProject.woodType}</strong></div>
                <div><span className="text-muted-foreground">Service:</span> <strong className="capitalize">{selectedProject.service}</strong></div>
                <div><span className="text-muted-foreground">Dimensions:</span> <strong>{selectedProject.dimensions}</strong></div>
                <div><span className="text-muted-foreground">Status:</span> <Badge variant="secondary">{selectedProject.status}</Badge></div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// --- Attach sub-components ---
ProjectGallery.Toolbar = GalleryToolbar;
ProjectGallery.Grid = GalleryGrid;
ProjectGallery.Detail = GalleryDetail;

export { ProjectGallery };
