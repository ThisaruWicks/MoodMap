'use server';

/**
 * @fileOverview Provides a summary of a journal entry when it is flagged as significant.
 *
 * - summarizeEntry - A function that summarizes a journal entry.
 * - SummarizeEntryInput - The input type for the summarizeEntry function.
 * - SummarizeEntryOutput - The return type for the summarizeEntry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEntryInputSchema = z.object({
  entryText: z.string().describe('The text content of the journal entry to summarize.'),
});
export type SummarizeEntryInput = z.infer<typeof SummarizeEntryInputSchema>;

const SummarizeEntryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the journal entry.'),
});
export type SummarizeEntryOutput = z.infer<typeof SummarizeEntryOutputSchema>;

export async function summarizeEntry(input: SummarizeEntryInput): Promise<SummarizeEntryOutput> {
  return summarizeEntryFlow(input);
}

const summarizeEntryPrompt = ai.definePrompt({
  name: 'summarizeEntryPrompt',
  input: {schema: SummarizeEntryInputSchema},
  output: {schema: SummarizeEntryOutputSchema},
  prompt: `Summarize the following journal entry in a concise and informative way:\n\n{{{entryText}}}`,
});

const summarizeEntryFlow = ai.defineFlow(
  {
    name: 'summarizeEntryFlow',
    inputSchema: SummarizeEntryInputSchema,
    outputSchema: SummarizeEntryOutputSchema,
  },
  async input => {
    const {output} = await summarizeEntryPrompt(input);
    return output!;
  }
);
