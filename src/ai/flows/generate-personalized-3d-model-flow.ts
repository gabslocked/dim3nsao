
/**
 * @fileOverview A Genkit flow for generating a personalized 3D model description based on an uploaded photo and selected style.
 *
 * - generatePersonalized3DModel - A function that handles the personalized 3D model generation process.
 * - GeneratePersonalized3DModelInput - The input type for the generatePersonalized3DModel function.
 * - GeneratePersonalized3DModelOutput - The return type for the generatePersonalized3DModel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalized3DModelInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo uploaded by the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  style: z
    .enum(['Litophane', 'Funko', 'Cartoon', 'Realistic 1:10', 'DoubleName'])
    .describe(
      'The desired style for the personalized 3D model. Options include Litophane, Funko, Cartoon, Realistic 1:10 figurine, or DoubleName.'
    ),
  textInput1: z
    .string()
    .optional()
    .describe('Optional text input for styles like DoubleName (e.g., first name).'),
  textInput2: z
    .string()
    .optional()
    .describe('Optional second text input for styles like DoubleName (e.g., second name).'),
  color: z
    .string()
    .optional()
    .describe('Optional color selection for the 3D model (e.g., "Red", "#FF0000").'),
  additionalInstructions: z
    .string()
    .optional()
    .describe('Any additional specific instructions or details for the 3D model generation.')
});
export type GeneratePersonalized3DModelInput = z.infer<
  typeof GeneratePersonalized3DModelInputSchema
>;

const GeneratePersonalized3DModelOutputSchema = z.object({
  modelDescription: z
    .string()
    .describe(
      'A detailed textual description of the personalized 3D model, including its visual characteristics and how it incorporates the input photo and selected style.'
    ),
  suggestedMaterial: z
    .string()
    .describe('The suggested material for 3D printing the model (e.g., PLA, Resin, ABS).'),
  suggestedColor: z
    .string()
    .describe('The suggested primary color for the 3D printed model, considering the style and content.'),
  estimatedDimensions: z
    .string()
    .describe('Estimated dimensions for the model (e.g., "100mm x 150mm x 20mm").')
});
export type GeneratePersonalized3DModelOutput = z.infer<
  typeof GeneratePersonalized3DModelOutputSchema
>;

export async function generatePersonalized3DModel(
  input: GeneratePersonalized3DModelInput
): Promise<GeneratePersonalized3DModelOutput> {
  return generatePersonalized3DModelFlow(input);
}

const generatePersonalized3DModelPrompt = ai.definePrompt({
  name: 'generatePersonalized3DModelPrompt',
  input: {schema: GeneratePersonalized3DModelInputSchema},
  output: {schema: GeneratePersonalized3DModelOutputSchema},
  prompt: `You are an expert 3D model designer AI. Your task is to generate a detailed description of a personalized 3D model based on a user-provided photo and a chosen style.

The user wants a 3D model with the following characteristics:
Style: {{{style}}}
{{#if textInput1}}First Text Input: {{{textInput1}}}.{{/if}}
{{#if textInput2}}Second Text Input: {{{textInput2}}}.{{/if}}
{{#if color}}Selected Color: {{{color}}}.{{/if}}
{{#if additionalInstructions}}Additional Instructions: {{{additionalInstructions}}}.{{/if}}

Please analyze the provided photo and generate a comprehensive description for a 3D model that perfectly matches the selected style and incorporates elements from the photo. For "Litophane" style, describe how the image will be etched. For "Funko", "Cartoon", or "Realistic 1:10" styles, describe the character's appearance based on the photo. For "DoubleName", describe the combination of the text inputs in 3D.

Provide the following details in your response:
1.  A detailed "modelDescription" of the personalized 3D model.
2.  A "suggestedMaterial" suitable for 3D printing this model.
3.  A "suggestedColor" for the model, taking into account the style and content.
4.  "estimatedDimensions" for the model.

Photo Reference:
{{media url=photoDataUri}}`,
});

const generatePersonalized3DModelFlow = ai.defineFlow(
  {
    name: 'generatePersonalized3DModelFlow',
    inputSchema: GeneratePersonalized3DModelInputSchema,
    outputSchema: GeneratePersonalized3DModelOutputSchema,
  },
  async input => {
    const {output} = await generatePersonalized3DModelPrompt(input);
    return output!;
  }
);
