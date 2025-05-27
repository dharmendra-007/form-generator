"use client"

import React from 'react';
import { ElementsType, FormElement, FormElementInstance } from "@/types/formElementType"
import { MdTitle } from "react-icons/md";
import { Label } from '../ui/label';
//import { textFieldPropertiesSchema, textFieldPropertiesType } from '@/schemas/propertiesSchema';
import { useForm } from 'react-hook-form';
//import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '../ui/input';
import useDesigner from '@/hooks/useDesigner';
import { cn } from '@/lib/utils';

const type: ElementsType = "TitleField"

const extraAttributes = {
  title: "Title Text",
  size: "default" as "default" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
}

export const TitleFieldFormElement: FormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    Icon: MdTitle,
    label: "Title Field"
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true // Title fields don't need validation
}

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

function DesignerComponent({
  elementInstance
}: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance
  const { title, size } = element.extraAttributes
  
  const sizeClasses = {
    default: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl"
  }

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className='text-muted-foreground'>Title Field</Label>
      <p className={cn(
        "font-semibold",
        sizeClasses[size]
      )}>
        {title}
      </p>
    </div>
  )
}

function FormComponent({
  elementInstance
}: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance
  const { title, size } = element.extraAttributes

  const sizeClasses = {
    default: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl"
  }

  return (
    <p className={cn(
      "font-semibold",
      sizeClasses[size]
    )}>
      {title}
    </p>
  )
}

function PropertiesComponent({
  elementInstance
}: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance
  const { updateElement } = useDesigner()
  
  const form = useForm({
    defaultValues: {
      title: element.extraAttributes.title,
      size: element.extraAttributes.size
    }
  })

  function applyChanges(values: typeof extraAttributes) {
    updateElement(element.id, {
      ...element,
      extraAttributes: values
    })
  }

  return (
    <Form {...form}>
      <form 
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => e.preventDefault()}
        className="space-y-3"
      >
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title Text</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Enter title text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The text to display as a title
              </FormDescription>
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
                  <option value="default">Default</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                  <option value="2xl">2X Large</option>
                  <option value="3xl">3X Large</option>
                  <option value="4xl">4X Large</option>
                </select>
              </FormControl>
              <FormDescription>
                The size of the title text
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}