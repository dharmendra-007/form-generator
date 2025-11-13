"use client";

import React, { useEffect, useState } from "react";
import { MdCheckBox } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "@/types/formElementType";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
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
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const type: ElementsType = "CheckboxField";

const extraAttributes = {
  label: "Select your interests",
  helperText: "Choose all that apply",
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

export const CheckboxFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    Icon: MdCheckBox,
    label: "Checkbox Group",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      // For multiple checkboxes, check if at least one is selected
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
  const { label, helperText, required, options } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="flex gap-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox disabled id={`${option}-${index}`} />
            <Label htmlFor={`${option}-${index}`} className="text-sm font-normal">
              {option}
            </Label>
          </div>
        ))}
      </div>
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

  // Parse default values (comma-separated string of selected options)
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    defaultValue ? defaultValue.split(",").filter(v => v.trim()) : []
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isInvalid) {
      setError(required ? "Please select at least one option" : "Invalid selection");
    } else {
      setError(null);
    }
  }, [isInvalid, required]);

  const validateField = (selected: string[]) => {
    if (required && selected.length === 0) {
      setError("Please select at least one option");
      return false;
    }
    setError(null);
    return true;
  };

  const handleChange = (option: string, isChecked: boolean) => {
    let newSelected: string[];
    
    if (isChecked) {
      newSelected = [...selectedOptions, option];
    } else {
      newSelected = selectedOptions.filter(item => item !== option);
    }
    
    setSelectedOptions(newSelected);
    validateField(newSelected);
    
    // Submit as comma-separated string
    if (submitValue) {
      submitValue(element.id, newSelected.join(","));
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className="flex flex-col gap-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              checked={selectedOptions.includes(option)}
              onCheckedChange={(checked) => handleChange(option, !!checked)}
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
      </div>
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
  const [optionsInput, setOptionsInput] = useState(element.extraAttributes.options.join(", "));

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
    setOptionsInput(element.extraAttributes.options.join(", "));
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
              <FormDescription>The label displayed above the checkbox group</FormDescription>
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
                  value={optionsInput}
                  onChange={(e) => {
                    setOptionsInput(e.target.value);
                  }}
                  onBlur={() => {
                    const options = optionsInput.split(",").map(opt => opt.trim()).filter(opt => opt.length > 0);
                    const finalOptions = options.length > 0 ? options : ["Option 1"];
                    field.onChange(finalOptions);
                    setOptionsInput(finalOptions.join(", "));
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
                <FormDescription>At least one option must be selected</FormDescription>
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