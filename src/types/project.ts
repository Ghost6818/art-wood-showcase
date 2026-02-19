// --- Union types for project status ---
export type ProjectStatus = 'draft' | 'in-progress' | 'completed';

// --- Base project type ---
export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  woodType: string;
  service: 'renovation' | 'painting';
  dimensions: string;
  imageUrl: string;
  completedDate?: string;
  price?: number;
}

// --- Discriminated union for item types ---
export interface FurnitureItem {
  kind: 'furniture';
  id: string;
  title: string;
  material: string;
  weight: number;
  legs: number;
}

export interface CanvasItem {
  kind: 'canvas';
  id: string;
  title: string;
  material: string;
  medium: string;
  framed: boolean;
}

export type WorkItem = FurnitureItem | CanvasItem;

// --- Type guard (type predicate) ---
export function isFurniture(item: WorkItem): item is FurnitureItem {
  return item.kind === 'furniture';
}

export function isCanvas(item: WorkItem): item is CanvasItem {
  return item.kind === 'canvas';
}

// --- Generic utility types ---
export type ProjectSummary = Pick<Project, 'id' | 'title' | 'status'>;
export type ProjectDraft = Partial<Project>;

// --- Chart data ---
export interface TrendDataPoint {
  month: string;
  completed: number;
  inProgress: number;
}
