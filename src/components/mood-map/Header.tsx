"use client";

import { Button } from "@/components/ui/button";
import { BookHeart, Users, User } from "lucide-react";

interface HeaderProps {
  onToggleView: () => void;
  viewMode: 'patient' | 'psychiatrist';
}

export default function Header({ onToggleView, viewMode }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <BookHeart className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          MoodMap
        </h1>
      </div>
      <Button variant="outline" onClick={onToggleView}>
        {viewMode === 'patient' ? (
          <>
            <Users className="mr-2 h-4 w-4" />
            Share with Psychiatrist
          </>
        ) : (
          <>
            <User className="mr-2 h-4 w-4" />
            Switch to Patient View
          </>
        )}
      </Button>
    </header>
  );
}
