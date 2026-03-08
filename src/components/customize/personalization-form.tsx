
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Box, ImageIcon, TextCursorInput, UploadCloud, Loader2, ShoppingCart, Crown, KeyRound, PersonStanding, FileText, Send } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

import { PersonalizationFormState, personalizationSchema } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/cart-context";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useAuth, useFirestore, useStorage, useUser } from "@/firebase/provider";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";


const styles = [
  { id: "Litophane", label: "Litophane", icon: ImageIcon, basePrice: 300 },
  { id: "Funko", label: "Estilo Funko", icon: PersonStanding, basePrice: 180 },
  { id: "Cartoon", label: "Estilo Cartoon", icon: PersonStanding, basePrice: 200 },
  { id: "Realistic", label: "Realista 1:10", icon: PersonStanding, basePrice: 250 },
  { id: "DoubleName", label: "DoubleName", icon: TextCursorInput, basePrice: 60 },
  { id: "Bobblehead", label: "Bobblehead", icon: Crown, basePrice: 200 },
  { id: 'Chaveiros', label: 'Chaveiros', icon: KeyRound, isQuote: true },
  { id: 'Modelagem3D', label: 'Modelagem 3D .stl', icon: Box, isQuote: true },
];

const lampOptions = [
    { id: 'fria', label: 'Lâmpada Fria', price: 10 },
    { id: 'quente', label: 'Lâmpada Quente', price: 10 },
    { id: 'smart', label: 'Lâmpada Smart', price: 30 },
    { id: 'smart-rgb', label: 'Lâmpada Smart RGB', price: 50 },
];

const switchOption = {
    id: 'interruptor',
    label: 'Interruptor',
    price: 10
};


export function PersonalizationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  
  const { toast } = useToast();
  const { addToCart } = useCart();
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();
  const storage = useStorage();


  const form = useForm<PersonalizationFormState>({
    resolver: zodResolver(personalizationSchema),
    defaultValues: {
      style: undefined,
      textInput1: "",
      textInput2: "",
      additionalInstructions: "",
      quoteDescription: "",
      litophaneSwitch: false,
    },
  });

  const selectedStyleId = form.watch("style");
  const selectedLamp = form.watch("litophaneLamp");
  const switchSelected = form.watch("litophaneSwitch");
  
  const isQuoteStyle = styles.find(s => s.id === selectedStyleId)?.isQuote;

  useEffect(() => {
    if (!selectedStyleId || isQuoteStyle) {
      setTotalPrice(null);
      return;
    }

    const styleInfo = styles.find(s => s.id === selectedStyleId);
    let currentPrice = styleInfo?.basePrice || 0;

    if (selectedStyleId === 'Litophane') {
        const lampInfo = lampOptions.find(l => l.id === selectedLamp);
        if (lampInfo) {
            currentPrice += lampInfo.price;
        }
        if (switchSelected) {
            currentPrice += switchOption.price;
        }
    }
    
    setTotalPrice(currentPrice);

  }, [selectedStyleId, selectedLamp, switchSelected, isQuoteStyle]);


  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: "destructive",
          title: "Arquivo muito grande",
          description: "Por favor, envie uma imagem com menos de 5MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuoteRequest = async (data: PersonalizationFormState) => {
    if (!user || !firestore || !storage) {
        toast({ variant: "destructive", title: "Login Necessário", description: "Você precisa estar logado para enviar uma proposta." });
        return;
    }
    setIsSubmitting(true);
    
    try {
        let imageUrl = '';
        // Upload image if provided
        if (photoPreview) {
            const imageRef = ref(storage, `custom_requests/${user.uid}/${uuidv4()}`);
            const uploadResult = await uploadString(imageRef, photoPreview, 'data_url');
            imageUrl = await getDownloadURL(uploadResult.ref);
        }

        const requestsRef = collection(firestore, 'custom_requests');
        await addDoc(requestsRef, {
            userId: user.uid,
            productName: data.style,
            description: data.quoteDescription,
            imageUrl: imageUrl,
            status: 'pending',
            createdAt: serverTimestamp()
        });

        toast({
            title: "Proposta Enviada!",
            description: "Recebemos sua solicitação. Nossa equipe irá analisar e retornar com o orçamento.",
        });
        form.reset();
        setPhotoPreview(null);
    } catch (error) {
        console.error("Error submitting quote:", error);
        toast({ variant: "destructive", title: "Erro ao Enviar", description: "Não foi possível enviar sua proposta. Tente novamente." });
    } finally {
        setIsSubmitting(false);
    }
  };
  
  const handleAddToCart = (data: PersonalizationFormState) => {
    if (!photoPreview && data.style !== 'DoubleName') {
        toast({
            variant: "destructive",
            title: "Foto Obrigatória",
            description: "Por favor, envie uma foto para este estilo de produto.",
        });
        setIsSubmitting(false);
        return;
    }
    
    const styleInfo = styles.find(s => s.id === data.style);
    if (!styleInfo || !totalPrice) {
         toast({
            variant: "destructive",
            title: "Erro no produto",
            description: "Ocorreu um erro ao selecionar o produto.",
        });
        setIsSubmitting(false);
        return;
    }

    const lampInfo = lampOptions.find(l => l.id === data.litophaneLamp);

    const cartItem = {
      id: uuidv4(),
      productId: `custom-${data.style.toLowerCase()}`,
      name: `Produto Personalizado - ${styleInfo.label}`,
      price: totalPrice,
      quantity: 1,
      customization: {
        style: data.style,
        photoDataUrl: photoPreview,
        textInput1: data.textInput1,
        textInput2: data.textInput2,
        additionalInstructions: data.additionalInstructions,
        basePrice: styleInfo.basePrice,
        finalPrice: totalPrice,
        ...(data.style === 'Litophane' && {
            lampOption: lampInfo?.label,
            lampPrice: lampInfo?.price,
            hasSwitch: data.litophaneSwitch,
            switchPrice: data.litophaneSwitch ? switchOption.price : 0,
        })
      }
    };
    
    addToCart(cartItem);

    setTimeout(() => {
        toast({
            title: "Adicionado ao Carrinho!",
            description: "Seu produto personalizado está pronto para o checkout.",
        });
        form.reset();
        setPhotoPreview(null);
        setIsSubmitting(false);
        router.push('/cart');
    }, 1000);
  };

  const onSubmit = async (data: PersonalizationFormState) => {
    setIsSubmitting(true);
    if (isQuoteStyle) {
        await handleQuoteRequest(data);
    } else {
        handleAddToCart(data);
    }
  };

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Personalize seu Produto</CardTitle>
        <CardDescription>
          {isQuoteStyle 
            ? "Descreva sua ideia para receber um orçamento personalizado." 
            : "Preencha os detalhes para configurar seu produto e ver o preço final."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-medium">1. Escolha o Estilo ou Serviço</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                      {styles.map(style => (
                        <FormItem key={style.id}>
                          <FormControl>
                            <RadioGroupItem value={style.id} className="sr-only" />
                          </FormControl>
                          <FormLabel className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 h-32 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors ${field.value === style.id ? "border-primary" : ""}`}>
                            <style.icon className="mb-3 h-7 w-7" />
                            <span className="text-center">{style.label}</span>
                             {style.basePrice && (
                                <span className="text-xs text-muted-foreground mt-1">a partir de R$ {style.basePrice}</span>
                             )}
                             {style.isQuote && (
                                <span className="text-xs font-bold text-primary mt-1">Orçamento</span>
                             )}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedStyleId && (
            <>
                <Separator />
                
                {/* Regular Product Path */}
                {!isQuoteStyle && (
                <>
                {selectedStyleId !== 'DoubleName' && (
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-medium">2. Envie sua Foto de Referência</FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-border border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {photoPreview ? (
                                  <Image src={photoPreview} alt="Preview" width={128} height={128} className="object-contain max-h-48 rounded-md" />
                                ) : (
                                  <>
                                    <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-base text-muted-foreground"><span className="font-semibold">Clique para enviar</span> ou arraste e solte</p>
                                    <p className="text-sm text-muted-foreground">PNG, JPG ou WEBP (MAX. 5MB)</p>
                                  </>
                                )}
                              </div>
                              <Input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg, image/webp"
                                onChange={(e) => {
                                  field.onChange(e.target.files);
                                  handlePhotoChange(e);
                                }}
                              />
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {selectedStyleId === 'DoubleName' && (
                  <div className="space-y-4 pt-4">
                     <FormLabel className="text-lg font-medium">2. Digite os Nomes</FormLabel>
                    <FormField name="textInput1" control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Primeiro Nome</FormLabel><FormControl><Input placeholder="Ex: Maria" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField name="textInput2" control={form.control} render={({ field }) => (
                      <FormItem><FormLabel>Segundo Nome</FormLabel><FormControl><Input placeholder="Ex: João" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                )}
                
                {selectedStyleId === 'Litophane' && (
                    <div className="space-y-6">
                        <FormLabel className="text-lg font-medium">3. Opções de Iluminação (Opcional)</FormLabel>
                        <FormField
                            control={form.control}
                            name="litophaneLamp"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Tipo de Lâmpada</FormLabel>
                                     <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                                        {lampOptions.map(opt => (
                                            <FormItem key={opt.id}>
                                                <FormControl><RadioGroupItem value={opt.id} className="sr-only" /></FormControl>
                                                <FormLabel className={`flex justify-between items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${field.value === opt.id ? "border-primary" : ""}`}>
                                                   <span>{opt.label}</span>
                                                   <span className="font-bold">+ R$ {opt.price.toFixed(2)}</span>
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="litophaneSwitch"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Adicionar Interruptor no fio?</FormLabel>
                                        <FormDescription>+ R$ {switchOption.price.toFixed(2)}</FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                )}

                <FormField
                  control={form.control}
                  name="additionalInstructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">Observações do pedido (opcional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Ex: Adicionar um chapéu de pirata no personagem, mudar a cor da camisa, etc." rows={4} {...field} />
                      </FormControl>
                       <FormDescription>
                        Pedidos com observações podem ter o valor alterado e precisarão de aprovação antes do pagamento.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                 {totalPrice !== null && (
                    <div className="text-right space-y-2 pt-4">
                        <span className="text-muted-foreground">Preço Final</span>
                        <p className="text-3xl font-bold">R$ {totalPrice.toFixed(2)}</p>
                    </div>
                 )}
                </>
                )}

                {/* Quote Request Path */}
                {isQuoteStyle && (
                    <div className="space-y-8">
                         <FormField
                            control={form.control}
                            name="quoteDescription"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-lg font-medium">2. Descreva seu Projeto</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Detalhe sua ideia, incluindo dimensões, cores e qualquer outra informação relevante." rows={6} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="photo"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-medium">3. Envie uma Imagem de Referência (Opcional)</FormLabel>
                                <FormControl>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-border border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {photoPreview ? (
                                        <Image src={photoPreview} alt="Preview" width={128} height={128} className="object-contain max-h-48 rounded-md" />
                                        ) : (
                                        <>
                                            <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground" />
                                            <p className="mb-2 text-base text-muted-foreground"><span className="font-semibold">Clique para enviar</span> ou arraste e solte</p>
                                            <p className="text-sm text-muted-foreground">PNG, JPG ou WEBP (MAX. 5MB)</p>
                                        </>
                                        )}
                                    </div>
                                    <Input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg, image/webp"
                                        onChange={(e) => {
                                        field.onChange(e.target.files);
                                        handlePhotoChange(e);
                                        }}
                                    />
                                    </label>
                                </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                )}
            </>
            )}

            <Button type="submit" disabled={isSubmitting || !selectedStyleId} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-7 button-glow transition-all duration-300 hover:scale-105">
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...</>
              ) : (
                isQuoteStyle ? (
                    <><Send className="mr-2 h-5 w-5" /> Enviar Proposta de Orçamento</>
                ) : (
                    <><ShoppingCart className="mr-2 h-5 w-5" /> Adicionar ao Carrinho</>
                )
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
