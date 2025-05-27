"use client";

import React from "react";
import { MdSubtitles } from "react-icons/md";
import { useForm } from "react-hook-form";

import { ElementsType, FormElement, FormElementInstance } from "@/types/formElementType";
import useDesigner from "@/hooks/useDesigner";
import { cn } from "@/lib/utils";

import { Label } from "../ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

const type: ElementsType = "SubtitleField";

const extraAttributes = {
  text: "Subtitle Text",
  size: "default" as "default" | "sm" | "base" | "lg",
  italic: false,
  muted: true,
};

export const SubtitleFieldFormElement: FormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    Icon: MdSubtitles,
    label: "Subtitle Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

// Define proper typing for instances
type CustomInstance = FormElementInstance & {
  type: "SubtitleField";
  extraAttributes: {
    text: string;
    size: "default" | "sm" | "base" | "lg";
    italic: boolean;
    muted: boolean;
  };
};

// Designer Preview Component
function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { text, size, italic, muted } = element.extraAttributes;

  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    default: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Subtitle Field</Label>
      <p
        className={cn(
          sizeClasses[size],
          italic && "italic",
          muted ? "text-muted-foreground" : "text-foreground"
        )}
      >
        {text}
      </p>
    </div>
  );
}

// Actual Form Rendering Component
function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { text, size, italic, muted } = element.extraAttributes;

  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    default: "text-base",
    lg: "text-lg",
  };

  return (
    <p
      className={cn(
        sizeClasses[size],
        italic && "italic",
        muted ? "text-muted-foreground" : "text-foreground"
      )}
    >
      {text}
    </p>
  );
}

// Form schema type
type FormSchema = {
  text: string;
  size: "default" | "sm" | "base" | "lg";
  italic: boolean;
  muted: boolean;
};

// Properties Editing Panel
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();

  const form = useForm<FormSchema>({
    defaultValues: {
      text: element.extraAttributes.text,
      size: element.extraAttributes.size,
      italic: element.extraAttributes.italic,
      muted: element.extraAttributes.muted,
    },
  });

  function applyChanges(values: FormSchema) {
    updateElement(element.id, {
      ...element,
      extraAttributes: values,
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => e.preventDefault()}
        className="space-y-3"
      >
        <FormField
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter subtitle text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>The text to display as a subtitle</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text Size</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="sm">Small</option>
                  <option value="default">Default</option>
                  <option value="base">Base</option>
                  <option value="lg">Large</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="italic"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Italic</FormLabel>
                <FormDescription>Display text in italic style</FormDescription>
              </div>
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="muted"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Muted Color</FormLabel>
                <FormDescription>Use muted text color</FormDescription>
              </div>
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
