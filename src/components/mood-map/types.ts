export type JournalEntry = {
  id: string;
  date: Date;
  content: string;
  sentimentScore: number;
  sentimentLabel: string;
  isSignificant: boolean;
  summary?: string;
};
