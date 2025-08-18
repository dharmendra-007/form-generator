"use client";

import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "@/types/formElementType";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useDesigner from "@/hooks/useDesigner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

const type: ElementsType = "EmailField";

const extraAttributes = {
  label: "Email",
  placeholder: "your@email.com",
  helperText: "Enter your email address",
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  placeholder: z.string().max(100),
  helperText: z.string().max(200),
  required: z.boolean(),
});

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const EmailFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    Icon: MdEmail,
    label: "Email Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (formElement: FormElementInstance, currentValue: string) => {
    const element = formElement as CustomInstance;
    const requiredCheck = element.extraAttributes.required;
    const validEmail = /^\S+@\S+\.\S+$/.test(currentValue);
    return requiredCheck ? currentValue.trim().length > 0 && validEmail : !currentValue || validEmail;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

// --------------------- Designer Component ---------------------
function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, helperText } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}{required && <span className="text-red-500">*</span>}
      </Label>
      <Input type="email" readOnly disabled placeholder={placeholder} />
      {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
    </div>
  );
}

// --------------------- Form Component ---------------------
function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: (key: string, value: string) => void;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, helperText } = element.extraAttributes;

  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isInvalid) {
      setError(required ? "This field is required and must be a valid email" : "Please enter a valid email");
    } else {
      setError(null);
    }
  }, [isInvalid, required]);

  const validateField = (val: string) => {
    if (required && val.trim() === "") {
      setError("This field is required");
      return false;
    }
    if (val && !/^\S+@\S+\.\S+$/.test(val)) {
      setError("Please enter a valid email");
      return false;
    }
    setError(null);
    return true;
  };

  const handleChange = (val: string) => {
    setValue(val);
    validateField(val);
  };

  const handleBlur = () => {
    const valid = validateField(value);
    if (valid && submitValue) submitValue(element.id, value);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}{required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        type="email"
        value={value}
        placeholder={placeholder}
        className={cn(error && "border-red-500")}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
      />
      {error ? (
        <p className="text-red-500 text-[0.8rem]">{error}</p>
      ) : (
        helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}

// --------------------- Properties Component ---------------------
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();

  const form = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      placeholder: element.extraAttributes.placeholder,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: PropertiesFormSchemaType) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: { ...values },
    });
  };

  return (
    <Form {...form}>
      <form onBlur={form.handleSubmit(applyChanges)} onSubmit={(e) => e.preventDefault()} className="space-y-3">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input {...field} onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input {...field} onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}