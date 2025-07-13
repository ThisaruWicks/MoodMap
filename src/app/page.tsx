
import { Button } from "@/components/ui/button";
import { BookHeart, BarChart, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <BookHeart className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">
            MoodMap
          </h1>
        </div>
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild className="bg-accent hover:bg-accent/90">
            <Link href="/login?signup=true">Sign Up</Link>
          </Button>
        </nav>
      </header>
      
      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary">Track Your Mood, Understand Your Mind</h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            MoodMap is a smart journaling app that helps you identify patterns in your emotional well-being through AI-powered sentiment analysis.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <Link href="/login?signup=true">Get Started for Free</Link>
            </Button>
          </div>
        </section>

        <section className="bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <Image 
                src="https://placehold.co/600x400.png" 
                alt="Mood Chart illustration" 
                width={600} 
                height={400} 
                className="rounded-lg shadow-lg"
                data-ai-hint="data chart analytics"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold">Visualize Your Progress</h3>
              <p className="mt-4 text-muted-foreground text-lg">
                See your mood trends over time with an interactive chart. Our AI analyzes each entry, providing a sentiment score that helps you visualize your emotional journey and recognize patterns.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold">Features Designed for Insight</h3>
            <p className="mt-2 text-muted-foreground text-lg">Everything you need for mindful journaling.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
              <div className="p-3 rounded-full bg-accent/20 text-accent mb-4">
                <BookHeart className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold">AI-Powered Analysis</h4>
              <p className="mt-2 text-muted-foreground">Get instant sentiment analysis on every journal entry to better understand your feelings.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
               <div className="p-3 rounded-full bg-accent/20 text-accent mb-4">
                <BarChart className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold">Mood Pattern Tracking</h4>
              <p className="mt-2 text-muted-foreground">Visualize your emotional landscape over time to identify triggers and celebrate progress.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
               <div className="p-3 rounded-full bg-accent/20 text-accent mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold">Collaborative Care</h4>
              <p className="mt-2 text-muted-foreground">Securely share insights with your psychiatrist to enhance your therapeutic journey.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MoodMap. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
