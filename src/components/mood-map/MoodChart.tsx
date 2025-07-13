"use client";

import { JournalEntry } from "./types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltipContent, ChartContainer, ChartConfig } from "@/components/ui/chart";
import { BarChart } from "lucide-react";

interface MoodChartProps {
  entries: JournalEntry[];
}

const chartConfig = {
  mood: {
    label: "Mood Score",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export default function MoodChart({ entries }: MoodChartProps) {
  const chartData = entries
    .map(entry => ({
      date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(entry.date),
      mood: entry.sentimentScore,
    }))
    .reverse();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Patterns</CardTitle>
        <CardDescription>Your mood trend over the last entries.</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 1 ? (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer>
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8}
                />
                <YAxis domain={[-1, 1]} tickLine={false} axisLine={false} tickMargin={8} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area type="monotone" dataKey="mood" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorMood)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-[250px] text-center text-muted-foreground">
            <BarChart className="h-12 w-12 mb-4" />
            <p className="font-medium">Not Enough Data</p>
            <p className="text-sm">The mood chart will appear here once you have more entries.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}