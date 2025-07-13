"use client";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Send, Twitter, Instagram, Facebook, AlertCircle } from "lucide-react";
import { Badge } from '../ui/badge';

interface SocialMediaCardProps {
    onAnalyzePost: (postContent: string) => Promise<void>;
    isLoading: boolean;
    analysisResult: { sentimentLabel: string; advice: string } | null;
}

const formSchema = z.object({
  postContent: z.string().min(10, {
    message: "Post content must be at least 10 characters.",
  }),
});

export default function SocialMediaCard({ onAnalyzePost, isLoading, analysisResult }: SocialMediaCardProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postContent: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await onAnalyzePost(values.content);
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Insights</CardTitle>
        <CardDescription>
          Connect your social accounts or paste a recent post to gain more context about your mood.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
                <FormLabel>Connect Accounts (Coming Soon)</FormLabel>
                <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" disabled>
                        <Twitter className="mr-2 h-5 w-5 text-[#1DA1F2]"/> Connect Twitter
                    </Button>
                    <Button variant="outline" className="flex-1" disabled>
                        <Instagram className="mr-2 h-5 w-5 text-[#E1306C]"/> Connect Instagram
                    </Button>
                     <Button variant="outline" className="flex-1" disabled>
                        <Facebook className="mr-2 h-5 w-5 text-[#4267B2]"/> Connect Facebook
                    </Button>
                </div>
            </div>
        </div>

        <div className="border-t pt-6">
            <h4 className="font-medium mb-2">Analyze a Single Post</h4>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                    control={form.control}
                    name="postContent"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="sr-only">Paste post content here</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Paste the text from a recent social media post here..."
                            className="min-h-[100px] resize-none"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing Post...
                        </>
                        ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            Get Insights
                        </>
                        )}
                    </Button>
                    </div>
                </form>
            </Form>
        </div>
        
        {analysisResult && (
             <div className="border-t pt-6">
                <h4 className="font-medium mb-2">Analysis Result</h4>
                <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Sentiment:</span>
                        <Badge variant={analysisResult.sentimentLabel === 'Positive' ? 'default' : analysisResult.sentimentLabel === 'Negative' ? 'destructive' : 'secondary'} className="capitalize">
                            {analysisResult.sentimentLabel}
                        </Badge>
                    </div>
                    <div className="flex items-start gap-2">
                         <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground"><span className="font-semibold text-accent-foreground">Advice:</span> {analysisResult.advice}</p>
                    </div>
                </div>
             </div>
        )}
      </CardContent>
    </Card>
  );
}
