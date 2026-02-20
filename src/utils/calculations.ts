// --- Function Overloading: calculatePrice ---

export function calculatePrice(basePrice: number, woodType: 'Oak' | 'Pine'): number;
export function calculatePrice(basePrice: number, artisticDetailLevel: number): number;
export function calculatePrice(basePrice: number, modifier: 'Oak' | 'Pine' | number): number {
  if (typeof modifier === 'string') {
    const multipliers: Record<string, number> = { Oak: 1.5, Pine: 1.1 };
    return basePrice * (multipliers[modifier] ?? 1);
  }
  // modifier is a number (artistic detail level) — flat fee
  return basePrice + modifier * 100;
}
