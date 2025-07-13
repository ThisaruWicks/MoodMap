
"use client";

import { Button } from "@/components/ui/button";
import { BookHeart, Users, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onToggleView: () => void;
  viewMode: 'patient' | 'psychiatrist';
}

export default function Header({ onToggleView, viewMode }: HeaderProps) {
  const { logOut, user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.push('/');
  }

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <BookHeart className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          MoodMap
        </h1>
      </div>
      <div className="flex items-center gap-2">
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
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
    </header>
  );
}
