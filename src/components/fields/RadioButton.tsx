"use client";

import React, { useEffect, useState } from 'react';
import { ElementsType, FormElement, FormElementInstance } from "@/types/formElementType";
import { MdRadioButtonChecked } from "react-icons/md"; 
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import useDesigner from "@/hooks/useDesigner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const type: ElementsType = "RadioButtonField";

const extraAttributes = {
  label: "Radio Button Group",
  helperText: "Select one option",
  required: false,
  options: ["Option 1", "Option 2", "Option 3"],
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean(),
  options: z.array(z.string()).min(1),
});

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const RadioButtonFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    Icon: MdRadioButtonChecked,
    label: "Radio Button",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.trim().length > 0;
    }
    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

// --------------------- Designer Component ---------------------
function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText, options } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <RadioGroup disabled className="flex flex-row gap-4">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`${option}-${index}`} />
            <Label htmlFor={`${option}-${index}`} className="text-sm font-normal">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
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
  const { label, required, helperText, options } = element.extraAttributes;

  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isInvalid) {
      setError(required ? "This field is required" : "Invalid selection");
    } else {
      setError(null);
    }
  }, [isInvalid, required]);

  const validateField = (val: string) => {
    if (required && val.trim() === "") {
      setError("This field is required");
      return false;
    }
    setError(null);
    return true;
  };

  const handleValueChange = (val: string) => {
    setValue(val);
    const valid = validateField(val);
    if (valid && submitValue) submitValue(element.id, val);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <RadioGroup 
        value={value} 
        onValueChange={handleValueChange}
        className={cn(error && "text-red-500", "flex flex-row gap-4")}
      >
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem 
              value={option} 
              id={`${element.id}-${option}-${index}`}
              className={cn(error && "border-red-500")}
            />
            <Label 
              htmlFor={`${element.id}-${option}-${index}`} 
              className={cn("text-sm font-normal cursor-pointer", error && "text-red-500")}
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
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
      options: element.extraAttributes.options,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  const applyChanges = (values: PropertiesFormSchemaType) => {
    const { label, helperText, required, options } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: { label, helperText, required, options }
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
              <FormDescription>The label displayed above the radio button group</FormDescription>
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

        {/* Options */}
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Options (comma separated)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value.join(",")}
                  onChange={(e) => {
                    const options = e.target.value.split(",").map(opt => opt.trim()).filter(opt => opt.length > 0);
                    field.onChange(options.length > 0 ? options : ["Option 1"]);
                  }}
                  onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
                  placeholder="Option 1, Option 2, Option 3"
                />
              </FormControl>
              <FormDescription>Enter the available options separated by commas</FormDescription>
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
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
