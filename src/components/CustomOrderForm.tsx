import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

// --- Zod Schemas per step ---
const step1Schema = z.object({
  woodType: z.string().min(1, "Please select a wood type"),
  service: z.enum(["renovation", "painting"], { required_error: "Select a service" }),
});

const dimensionRegex = /^\d{1,5}x\d{1,5}$/;

const step2Schema = z.object({
  dimensions: z
    .string()
    .min(1, "Dimensions are required")
    .regex(dimensionRegex, "Must match format like 100x200"),
  details: z.string().min(10, "Please provide at least 10 characters of detail"),
});

const step3Schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  message: z.string().optional(),
  recaptchaToken: z.string().min(1, "Please complete the reCAPTCHA"),
});

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);
type OrderFormData = z.infer<typeof fullSchema>;

const schemas = [step1Schema, step2Schema, step3Schema];

const woodTypes = ["Oak", "Walnut", "Pine", "Cherry", "Maple", "Mahogany", "Birch"];

export function CustomOrderForm() {
  const [step, setStep] = useState(0);

  const methods = useForm<OrderFormData>({
    resolver: zodResolver(schemas[step] as any),
    defaultValues: {
      woodType: "",
      service: undefined,
      dimensions: "",
      details: "",
      name: "",
      email: "",
      phone: "",
      message: "",
      recaptchaToken: "",
    },
    mode: "onTouched",
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch, trigger } = methods;

  const handleNext = async () => {
    const valid = await trigger();
    if (valid) setStep((s) => Math.min(s + 1, 2));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (data: OrderFormData) => {
    toast.success("Order submitted successfully!", {
      description: `Thank you ${data.name}, we'll be in touch!`,
    });
    console.log("Order data:", data);
  };

  return (
    <Card className="mx-auto max-w-2xl border-border/50 shadow-warm">
      <CardHeader className="text-center">
        <CardTitle className="font-display text-3xl">Custom Order</CardTitle>
        <CardDescription>Tell us about your project in 3 simple steps</CardDescription>
        {/* Step indicators */}
        <div className="mt-4 flex justify-center gap-2">
          {["Wood & Service", "Dimensions", "Contact"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < 2 && <div className={`h-0.5 w-8 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1 */}
            {step === 0 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <Label htmlFor="woodType">Wood Type</Label>
                  <Select
                    value={watch("woodType")}
                    onValueChange={(v) => setValue("woodType", v, { shouldValidate: true })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select wood type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {woodTypes.map((w) => (
                        <SelectItem key={w} value={w.toLowerCase()}>{w}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.woodType && <p className="mt-1 text-sm text-destructive">{errors.woodType.message}</p>}
                </div>

                <div>
                  <Label>Service Type</Label>
                  <RadioGroup
                    value={watch("service")}
                    onValueChange={(v) => setValue("service", v as "renovation" | "painting", { shouldValidate: true })}
                    className="mt-2 grid grid-cols-2 gap-4"
                  >
                    {[
                      { value: "renovation", label: "Renovation", desc: "Restore & refinish" },
                      { value: "painting", label: "Custom Painting", desc: "Hand-painted art" },
                    ].map((opt) => (
                      <Label
                        key={opt.value}
                        htmlFor={opt.value}
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                          watch("service") === opt.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <RadioGroupItem value={opt.value} id={opt.value} className="sr-only" />
                        <span className="font-semibold">{opt.label}</span>
                        <span className="text-xs text-muted-foreground">{opt.desc}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                  {errors.service && <p className="mt-1 text-sm text-destructive">{errors.service.message}</p>}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <Label htmlFor="dimensions">Dimensions (WxH in cm)</Label>
                  <Input
                    id="dimensions"
                    placeholder="e.g. 100x200"
                    {...register("dimensions")}
                    className="font-mono"
                  />
                  {errors.dimensions && <p className="mt-1 text-sm text-destructive">{errors.dimensions.message}</p>}
                  <p className="mt-1 text-xs text-muted-foreground">Format: widthxheight (e.g., 100x200)</p>
                </div>

                <div>
                  <Label htmlFor="details">Project Details</Label>
                  <Textarea
                    id="details"
                    placeholder="Describe your vision, style preferences, colors..."
                    {...register("details")}
                    rows={4}
                  />
                  {errors.details && <p className="mt-1 text-sm text-destructive">{errors.details.message}</p>}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" {...register("name")} />
                    {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" {...register("phone")} />
                    {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Additional Message (optional)</Label>
                  <Textarea id="message" {...register("message")} rows={3} />
                </div>

                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={(value) => setValue("recaptchaToken", value ?? "", { shouldValidate: true })}
                />
                {errors.recaptchaToken && <p className="mt-1 text-sm text-destructive">{errors.recaptchaToken.message}</p>}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={step === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              {step < 2 ? (
                <Button type="button" onClick={handleNext}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit">
                  Submit Order <Check className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
