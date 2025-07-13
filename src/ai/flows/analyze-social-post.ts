'use server';

/**
 * @fileOverview Analyzes the sentiment of a social media post and provides advice.
 *
 * - analyzeSocialPost - A function that handles the sentiment analysis of a post.
 * - AnalyzeSocialPostInput - The input type for the analyzeSocialPost function.
 * - AnalyzeSocialPostOutput - The return type for the analyzeSocialPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSocialPostInputSchema = z.object({
  postContent: z.string().describe('The text content of the social media post.'),
});
export type AnalyzeSocialPostInput = z.infer<typeof AnalyzeSocialPostInputSchema>;

const AnalyzeSocialPostOutputSchema = z.object({
  sentimentLabel: z
    .string()
    .describe(
      'A label representing the sentiment of the post (e.g., Positive, Negative, Neutral).'
    ),
  advice: z
    .string()
    .describe(
      'A short, actionable piece of advice based on the sentiment of the post, framed from the perspective of a helpful therapist.'
    ),
});
export type AnalyzeSocialPostOutput = z.infer<typeof AnalyzeSocialPostOutputSchema>;

export async function analyzeSocialPost(input: AnalyzeSocialPostInput): Promise<AnalyzeSocialPostOutput> {
  return analyzeSocialPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSocialPostPrompt',
  input: {schema: AnalyzeSocialPostInputSchema},
  output: {schema: AnalyzeSocialPostOutputSchema},
  prompt: `You are a helpful therapist analyzing a social media post for a patient.
Analyze the sentiment of the following post. 
Then, provide a short, actionable piece of advice based on the sentiment. 
If the post is positive, the advice should be encouraging. 
If it's negative, it should be supportive and suggest a constructive action.
If it's neutral, it can be a simple reflection.

Post Content: {{{postContent}}}
`,
});

const analyzeSocialPostFlow = ai.defineFlow(
  {
    name: 'analyzeSocialPostFlow',
    inputSchema: AnalyzeSocialPostInputSchema,
    outputSchema: AnalyzeSocialPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
