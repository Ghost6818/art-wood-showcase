import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { TrendDataPoint } from "@/types/project";

const chartData: TrendDataPoint[] = [
  { month: "Jan", completed: 4, inProgress: 2 },
  { month: "Feb", completed: 3, inProgress: 5 },
  { month: "Mar", completed: 6, inProgress: 3 },
  { month: "Apr", completed: 5, inProgress: 4 },
  { month: "May", completed: 8, inProgress: 3 },
  { month: "Jun", completed: 7, inProgress: 6 },
  { month: "Jul", completed: 10, inProgress: 4 },
  { month: "Aug", completed: 9, inProgress: 5 },
];

const chartConfig = {
  completed: { label: "Completed", color: "hsl(152, 35%, 28%)" },
  inProgress: { label: "In Progress", color: "hsl(30, 55%, 45%)" },
};

export function ProjectChart() {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="font-display text-2xl">Project Completion Trends</CardTitle>
        <CardDescription>Monthly overview of project activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(152, 35%, 28%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(152, 35%, 28%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillInProgress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(30, 55%, 45%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(30, 55%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
            <YAxis className="text-xs fill-muted-foreground" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="hsl(152, 35%, 28%)"
              fill="url(#fillCompleted)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="inProgress"
              stroke="hsl(30, 55%, 45%)"
              fill="url(#fillInProgress)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
