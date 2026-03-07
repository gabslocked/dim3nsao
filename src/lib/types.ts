
import { z } from "zod";
import { Timestamp } from "firebase/firestore";

export const personalizationSchema = z.object({
  style: z.enum(['Litophane', 'Funko', 'Cartoon', 'Realistic', 'DoubleName', 'Bobblehead', 'Chaveiros', 'Modelagem3D'], {
    required_error: "Por favor, selecione um estilo."
  }),
  photo: z.any().optional(),
  textInput1: z.string().optional(),
  textInput2: z.string().optional(),
  additionalInstructions: z.string().optional(),
  
  // Litophane options
  litophaneLamp: z.string().optional(),
  litophaneSwitch: z.boolean().optional(),
  
  // Quote options
  quoteDescription: z.string().optional(),

}).superRefine((data, ctx) => {
    // Validation for DoubleName
    if (data.style === 'DoubleName' && (!data.textInput1 || !data.textInput2)) {
        if (!data.textInput1) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "O primeiro nome é obrigatório.",
                path: ["textInput1"],
            });
        }
        if (!data.textInput2) {
             ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "O segundo nome é obrigatório.",
                path: ["textInput2"],
            });
        }
    }
    // Validation for Quote Styles
    const quoteStyles = ['Chaveiros', 'Modelagem3D'];
    if (quoteStyles.includes(data.style) && (!data.quoteDescription || data.quoteDescription.length < 10)) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Por favor, descreva seu projeto com pelo menos 10 caracteres.",
            path: ["quoteDescription"],
        });
    }
});


export type PersonalizationFormState = z.infer<typeof personalizationSchema>;


export type Order = {
  id: string;
  userId: string;
  products: any[];
  totalPrice: number;
  shippingCost: number;
  shippingDetails: any;
  observation?: string;
  status: 'Pending' | 'Awaiting Admin Approval' | 'Approved' | 'Production' | 'Shipped' | 'Delivered' | 'Canceled';
  approvedPrice?: number;
  createdAt: Timestamp;
  trackingCode?: string;
};
