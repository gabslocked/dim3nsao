
"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection } from "firebase/firestore";

import { useToast } from "@/hooks/use-toast";
import { maintenanceRequestSchema, type MaintenanceRequestFormState } from "@/lib/maintenance-types";
import { useFirestore } from "@/firebase/provider";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";

import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud } from "lucide-react";


export function MaintenanceForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const { toast } = useToast();
    const firestore = useFirestore();

    const form = useForm<MaintenanceRequestFormState>({
        resolver: zodResolver(maintenanceRequestSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            printerModel: "",
            problemDescription: "",
        }
    });

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data: MaintenanceRequestFormState) => {
        // This component is deprecated. Use QuoteForm instead.
        return;
    };

    return (
        <Card className="bg-card/50">
            <CardContent className="p-8">
                <p>Este formulário foi substituído pelo novo formulário de orçamento.</p>
            </CardContent>
        </Card>
    )
}
