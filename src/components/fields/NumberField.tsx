"use client";

import React, { useEffect, useState } from "react";
import { ElementsType, FormElement, FormElementInstance } from "@/types/formElementType";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { MdNumbers } from "react-icons/md"; 
import useDesigner from "@/hooks/useDesigner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

const type: ElementsType = "NumberField";

const extraAttributes = {
  label: "Number Field",
  helperText: "Enter a number",
  required: false,
  placeholder: "0",
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean(),
  placeholder: z.string().max(50),
});

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const NumberFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    Icon: MdNumbers, 
    label: "Number Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (element: FormElementInstance, currentValue: string): boolean => {
    const castedElement = element as CustomInstance;
    if (castedElement.extraAttributes.required) {
      return currentValue.trim().length > 0 && !isNaN(Number(currentValue));
    }
    return !currentValue || !isNaN(Number(currentValue));
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
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input type="number" placeholder={placeholder} readOnly />
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

  // Sync error state with parent validation
  useEffect(() => {
    if (isInvalid) {
      setError(required ? "This field is required" : "Please enter a valid number");
    } else {
      setError(null);
    }
  }, [isInvalid, required]);

  const validateField = (val: string) => {
    if (required && val.trim() === "") {
      setError("This field is required");
      return false;
    }
    
    if (val.trim() !== "" && isNaN(Number(val))) {
      setError("Please enter a valid number");
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
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        type="number"
        className={cn(error && "border-red-500")}
        placeholder={placeholder}
        value={value}
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
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeholder: element.extraAttributes.placeholder,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: PropertiesFormSchemaType) => {
    const { label, helperText, placeholder, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: { label, helperText, required, placeholder }
    });
  };

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => e.preventDefault()}
        className="space-y-3"
      >
        {/* Label */}
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter field label"
                  onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
                />
              </FormControl>
              <FormDescription>The label displayed above the field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Placeholder */}
        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter placeholder text"
                  onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
                />
              </FormControl>
              <FormDescription>The placeholder text when empty</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Helper Text */}
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter helper text"
                  onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
                />
              </FormControl>
              <FormDescription>Additional information or instructions</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Required */}
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>Whether this field is required</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}