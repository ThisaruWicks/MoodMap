"use client";

import { JournalEntry } from "./types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Smile, Meh, Frown, Flag, ChevronDown, Loader2 } from "lucide-react";
import React from "react";

interface JournalEntryCardProps {
  entry: JournalEntry;
  onFlagEntry: (entryId: string, entryContent: string) => void;
  isLoading: boolean;
}

const MoodIndicator = ({ score }: { score: number }) => {
  if (score > 0.3) {
    return <Smile className="h-5 w-5 text-green-500" />;
  }
  if (score < -0.3) {
    return <Frown className="h-5 w-5 text-red-500" />;
  }
  return <Meh className="h-5 w-5 text-yellow-500" />;
};

export default function JournalEntryCard({ entry, onFlagEntry, isLoading }: JournalEntryCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-lg">
                    {new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(entry.date)}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                    <MoodIndicator score={entry.sentimentScore} />
                    <Badge variant={entry.sentimentLabel === 'Positive' ? 'default' : entry.sentimentLabel === 'Negative' ? 'destructive' : 'secondary'} className="capitalize">{entry.sentimentLabel}</Badge>
                </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onFlagEntry(entry.id, entry.content)}
              disabled={isLoading}
              aria-label="Flag entry as significant"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Flag className={`h-4 w-4 ${entry.isSignificant ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />}
            </Button>
        </div>
      </CardHeader>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardContent>
            <p className="text-muted-foreground line-clamp-2">{entry.content}</p>
            <CollapsibleContent>
                <div className="mt-4 space-y-4">
                    <p className="whitespace-pre-wrap">{entry.content}</p>
                    {entry.isSignificant && entry.summary && (
                        <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-accent">
                            <h4 className="font-semibold text-accent-foreground">AI Summary</h4>
                            <p className="text-sm text-muted-foreground italic mt-1">{entry.summary}</p>
                        </div>
                    )}
                </div>
            </CollapsibleContent>
        </CardContent>
        <CardFooter>
            <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full">
                    {isOpen ? 'Show Less' : 'Show More'}
                    <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </Button>
            </CollapsibleTrigger>
        </CardFooter>
      </Collapsible>
    </Card>
  );
}