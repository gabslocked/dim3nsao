import { z } from "zod";

export const CalculateShippingInputSchema = z.object({
  destinationCep: z.string().length(8, { message: "CEP inválido." }),
  totalWeight: z.number().min(0.01, { message: "O peso deve ser positivo." }),
});

export type CalculateShippingInput = z.infer<typeof CalculateShippingInputSchema>;

export const ShippingOptionSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  delivery_time: z.number(),
});

export const CalculateShippingOutputSchema = z.array(ShippingOptionSchema);

export type ShippingOption = z.infer<typeof ShippingOptionSchema>;
