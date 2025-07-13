"use client";

import { JournalEntry } from "./types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import React, { useMemo } from "react";

interface ProactiveWarningProps {
  entries: JournalEntry[];
}

export default function ProactiveWarning({ entries }: ProactiveWarningProps) {
  const showWarning = useMemo(() => {
    if (entries.length < 3) {
      return false;
    }
    const recentEntries = entries.slice(0, 3);
    const averageScore = recentEntries.reduce((sum, entry) => sum + entry.sentimentScore, 0) / recentEntries.length;
    return averageScore < -0.4;
  }, [entries]);

  if (!showWarning) {
    return null;
  }

  return (
    <Alert variant="destructive">
      <TriangleAlert className="h-4 w-4" />
      <AlertTitle>Heads Up!</AlertTitle>
      <AlertDescription>
        We've noticed a pattern of negative sentiment in your recent entries. It might be a good time to check in with yourself, a loved one, or your psychiatrist.
      </AlertDescription>
    </Alert>
  );
}