// 'use server';

/**
 * @fileOverview Analyzes the sentiment of journal entries.
 *
 * - analyzeMood - A function that handles the sentiment analysis of journal entries.
 * - AnalyzeMoodInput - The input type for the analyzeMood function.
 * - AnalyzeMoodOutput - The return type for the analyzeMood function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMoodInputSchema = z.object({
  journalEntry: z
    .string()
    .describe('The journal entry to analyze for sentiment.'),
});
export type AnalyzeMoodInput = z.infer<typeof AnalyzeMoodInputSchema>;

const AnalyzeMoodOutputSchema = z.object({
  sentimentScore: z
    .number()
    .describe(
      'A numerical score representing the sentiment of the journal entry. Higher values indicate more positive sentiment, while lower values indicate more negative sentiment. Range of values is -1 to 1.'
    ),
  sentimentLabel: z
    .string()
    .describe(
      'A label representing the sentiment of the journal entry, such as positive, negative, or neutral.'
    ),
});
export type AnalyzeMoodOutput = z.infer<typeof AnalyzeMoodOutputSchema>;

export async function analyzeMood(input: AnalyzeMoodInput): Promise<AnalyzeMoodOutput> {
  return analyzeMoodFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMoodPrompt',
  input: {schema: AnalyzeMoodInputSchema},
  output: {schema: AnalyzeMoodOutputSchema},
  prompt: `Analyze the sentiment of the following journal entry and provide a sentiment score and label.

Journal Entry: {{{journalEntry}}}

Respond in JSON format with the following structure:
{
  "sentimentScore": number, // A numerical score representing the sentiment. Higher values indicate more positive sentiment, while lower values indicate more negative sentiment. Range of values is -1 to 1.
  "sentimentLabel": string // A label representing the sentiment, such as positive, negative, or neutral.
}
`,
});

const analyzeMoodFlow = ai.defineFlow(
  {
    name: 'analyzeMoodFlow',
    inputSchema: AnalyzeMoodInputSchema,
    outputSchema: AnalyzeMoodOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
