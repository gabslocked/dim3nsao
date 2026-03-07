
export interface CartItem {
    id: string; // Unique ID for the cart item (e.g., uuid)
    productId: string;
    name: string;
    price: number; // This will be the final calculated price
    quantity: number;
    customization: {
        style: string;
        photoDataUrl: string | null;
        textInput1?: string;
        textInput2?: string;
        additionalInstructions?: string;
        
        // Fields for dynamic pricing, especially for Litophane
        basePrice?: number;
        finalPrice?: number;
        lampOption?: string;
        lampPrice?: number;
        hasSwitch?: boolean;
        switchPrice?: number;
    };
}
