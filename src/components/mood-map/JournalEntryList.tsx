"use client";

import { JournalEntry } from "./types";
import JournalEntryCard from "./JournalEntryCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookText } from "lucide-react";

interface JournalEntryListProps {
  entries: JournalEntry[];
  onFlagEntry: (entryId: string, entryContent: string) => void;
  isLoading: { [key: string]: boolean };
}

export default function JournalEntryList({ entries, onFlagEntry, isLoading }: JournalEntryListProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Entries</CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length > 0 ? (
          <ScrollArea className="h-[70vh] pr-4">
            <div className="space-y-4">
              {entries.map(entry => (
                <JournalEntryCard
                  key={entry.id}
                  entry={entry}
                  onFlagEntry={onFlagEntry}
                  isLoading={!!isLoading[entry.id]}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center text-muted-foreground">
            <BookText className="h-12 w-12 mb-4" />
            <p className="font-medium">No Entries Yet</p>
            <p className="text-sm">Your journal entries will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}