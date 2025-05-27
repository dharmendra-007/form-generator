"use client"

import React from 'react';
import { ElementsType, FormElement, FormElementInstance } from "@/types/formElementType"
import { MdTextFields } from "react-icons/md";
import { Label } from '../ui/label';
import { useForm } from 'react-hook-form';
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

const type: ElementsType = "ParagraphField"

const extraAttributes = {
  text: "Paragraph text goes here"
}

export const ParagraphFieldFormElement: FormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    Icon: MdTextFields,
    label: "Paragraph Field"
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true 
}

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

function DesignerComponent({
  elementInstance
}: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance
  const { text } = element.extraAttributes
  
  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className='text-muted-foreground'>Paragraph Field</Label>
      <p className="text-muted-foreground">
        {text}
      </p>
    </div>
  )
}

function FormComponent({
  elementInstance
}: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance
  const { text } = element.extraAttributes

  return (
    <p className="text-muted-foreground">
      {text}
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
      text: element.extraAttributes.text
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
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paragraph Text</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Enter paragraph text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The text to display as a paragraph
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}