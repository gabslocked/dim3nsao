import { z } from "zod";

export const maintenanceRequestSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um endereço de e-mail válido." }),
  phone: z.string().min(10, { message: "Por favor, insira um número de telefone válido." }),
  printerModel: z.string().min(2, { message: "Por favor, especifique o modelo da impressora." }),
  problemDescription: z.string().min(15, { message: "Por favor, descreva o problema com pelo menos 15 caracteres." }),
  image: z.any().optional(),
});

export type MaintenanceRequestFormState = z.infer<typeof maintenanceRequestSchema>;
