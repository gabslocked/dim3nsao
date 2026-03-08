/**
 * @fileOverview A Genkit flow for calculating shipping costs using the Melhor Envio API.
 * This flow is designed to be called securely from the frontend by authenticated users.
 *
 * - calculateShipping - A client-callable function that executes the shipping calculation.
 * - ShippingOption - The type definition for a single shipping option returned by the flow.
 */

'use server';

import { ai } from '@/ai/genkit';
import {
  CalculateShippingInput,
  CalculateShippingInputSchema,
  CalculateShippingOutputSchema,
  ShippingOption,
} from '@/lib/shipping-types';

// Re-export the type for easy use on the client
export type { ShippingOption } from '@/lib/shipping-types';

/**
 * Client-callable function to calculate shipping options.
 * Wraps the Genkit flow and provides a simple interface for the frontend.
 * @param input - The destination CEP and total weight of the package.
 * @returns A promise that resolves to an array of shipping options.
 */
export async function calculateShipping(
  input: CalculateShippingInput
): Promise<ShippingOption[]> {
  return calculateShippingFlow(input);
}

const calculateShippingFlow = ai.defineFlow(
  {
    name: 'calculateShippingFlow',
    inputSchema: CalculateShippingInputSchema,
    outputSchema: CalculateShippingOutputSchema,
  },
  async (input) => {
    const { destinationCep, totalWeight } = input;
    
    // Validate environment variables
    const apiToken = process.env.MELHOR_ENVIO_API_TOKEN;
    const originCep = process.env.ORIGIN_CEP;

    if (!apiToken || !originCep) {
      throw new Error('Server configuration error: Missing shipping API credentials or origin CEP.');
    }
    
    // These are standard dimensions for a small box.
    // In a real application, you might calculate this based on cart items.
    const packageDetails = {
        height: 10,
        width: 15,
        length: 20,
        weight: totalWeight,
    };

    const requestBody = {
      from: { postal_code: originCep },
      to: { postal_code: destinationCep },
      package: packageDetails,
      services: "1,2" // 1 for PAC, 2 for SEDEX. Add more as needed.
    };

    try {
      const response = await fetch('https://www.melhorenvio.com.br/api/v2/me/shipment/calculate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`,
          'User-Agent': 'DIM3NSAO (dim3nsao.3d@gmail.com)'
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.error('Melhor Envio API Error:', errorBody);
        throw new Error(errorBody.error || 'Failed to calculate shipping rates.');
      }

      const data: any[] = await response.json();

      // Filter and map the response to the required format
      const validOptions = data
        .filter(option => !option.error)
        .map(option => ({
          id: option.id,
          name: option.name,
          price: parseFloat(option.price),
          delivery_time: parseInt(option.delivery_time, 10),
        }));
        
      return validOptions;

    } catch (error: any) {
      console.error('Error calling Melhor Envio API:', error);
      // Re-throw a user-friendly error message
      throw new Error('Could not retrieve shipping options at this time.');
    }
  }
);
