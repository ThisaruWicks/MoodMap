"use client";

import { Button } from "@/components/ui/button";
import { BookHeart, Users } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <BookHeart className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          MoodMap
        </h1>
      </div>
      <Button variant="outline">
        <Users className="mr-2 h-4 w-4" />
        Share with Psychiatrist
      </Button>
    </header>
  );
}