
"use client";

import React, { useState, useMemo } from 'react';
import type { JournalEntry } from './types';
import { analyzeMood } from '@/ai/flows/analyze-mood';
import { summarizeEntry } from '@/ai/flows/flag-significant-entry';
import { analyzeSocialPost } from '@/ai/flows/analyze-social-post';

import Header from './Header';
import NewEntryForm from './NewEntryForm';
import ProactiveWarning from './ProactiveWarning';
import MoodChart from './MoodChart';
import JournalEntryList from './JournalEntryList';
import SocialMediaCard from './SocialMediaCard';
import { useToast } from '@/hooks/use-toast';

const initialEntries: JournalEntry[] = [
  {
    id: '1',
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
    content: "Feeling really optimistic today. Had a great session with my therapist and I feel like I'm on the right track. The new medication seems to be helping.",
    sentimentScore: 0.8,
    sentimentLabel: 'Positive',
    isSignificant: true,
    summary: 'A very positive day marked by a successful therapy session and optimism about new medication.'
  },
  {
    id: '2',
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    content: "A bit of a down day. Nothing specific happened, but the energy just wasn't there. Found it hard to get out of bed.",
    sentimentScore: -0.6,
    sentimentLabel: 'Negative',
    isSignificant: false,
  },
  {
    id: '3',
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    content: "Feeling pretty neutral. Work was fine, came home, watched a movie. Just a standard day, nothing to complain about.",
    sentimentScore: 0.1,
    sentimentLabel: 'Neutral',
    isSignificant: false,
  },
];

export default function Dashboard() {
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const [viewMode, setViewMode] = useState<'patient' | 'psychiatrist'>('patient');
  const [socialAnalysis, setSocialAnalysis] = useState<{ sentimentLabel: string; advice: string } | null>(null);
  const { toast } = useToast();

  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [entries]);

  const handleToggleView = () => {
    setViewMode(prev => prev === 'patient' ? 'psychiatrist' : 'patient');
  };

  const handleAddEntry = async (content: string) => {
    setIsLoading(prev => ({ ...prev, form: true }));
    try {
      const moodAnalysis = await analyzeMood({ journalEntry: content });
      const newEntry: JournalEntry = {
        id: new Date().toISOString(),
        date: new Date(),
        content,
        ...moodAnalysis,
        isSignificant: false,
      };
      setEntries(prev => [newEntry, ...prev]);
    } catch (error) {
      console.error('Failed to analyze mood:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze your journal entry. Please try again.",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, form: false }));
    }
  };

  const handleFlagEntry = async (entryId: string, entryContent: string) => {
    const entry = entries.find(e => e.id === entryId);
    if (!entry) return;

    // Toggle off if already significant
    if (entry.isSignificant) {
        setEntries(entries.map(e => e.id === entryId ? { ...e, isSignificant: false, summary: undefined } : e));
        return;
    }
    
    setIsLoading(prev => ({ ...prev, [entryId]: true }));
    try {
      const { summary } = await summarizeEntry({ entryText: entryContent });
      setEntries(entries.map(e => e.id === entryId ? { ...e, isSignificant: true, summary } : e));
    } catch (error) {
      console.error('Failed to summarize entry:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to flag your entry. Please try again.",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [entryId]: false }));
    }
  };

  const handleAnalyzeSocialPost = async (postContent: string) => {
    setIsLoading(prev => ({...prev, social: true}));
    setSocialAnalysis(null);
    try {
      const result = await analyzeSocialPost({postContent});
      setSocialAnalysis(result);
    } catch (error) {
       console.error('Failed to analyze social post:', error);
       toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze your social media post. Please try again.",
      });
    } finally {
      setIsLoading(prev => ({...prev, social: false}));
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Header onToggleView={handleToggleView} viewMode={viewMode} />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 flex flex-col gap-8">
            {viewMode === 'patient' && (
              <NewEntryForm onAddEntry={handleAddEntry} isLoading={!!isLoading['form']} />
            )}
            <ProactiveWarning entries={sortedEntries} />
            <MoodChart entries={sortedEntries} />
            {viewMode === 'patient' && (
              <SocialMediaCard 
                onAnalyzePost={handleAnalyzeSocialPost}
                isLoading={!!isLoading['social']}
                analysisResult={socialAnalysis}
              />
            )}
          </div>
          <div className={`lg:col-span-2 ${viewMode === 'psychiatrist' ? 'lg:col-start-1 lg:row-start-1 lg:col-span-5' : ''}`}>
            <JournalEntryList 
              entries={sortedEntries}
              onFlagEntry={handleFlagEntry}
              isLoading={isLoading}
              viewMode={viewMode}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
