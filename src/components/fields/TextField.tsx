"use client"

import React, { useEffect } from 'react'
import { ElementsType, FormElement, FormElementInstance } from "@/types/formElementType"
import { MdTextFields } from "react-icons/md";
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { textFieldPropertiesSchema, textFieldPropertiesType } from '@/schemas/propertiesSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '../ui/button';
import useDesigner from '@/hooks/useDesigner';
import { Switch } from '../ui/switch';

const type: ElementsType = "TextField"

const extraAttributes = {
  label: "Text Field",
  helperText: "Helper Text",
  required: false,
  placeHolder: "value here..."
}

export const TextFieldFormElements: FormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    Icon: MdTextFields,
    label: "Text Field"
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: PropertiesComponent
}

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

function PropertiesComponent({
  elementInstance
}: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance
  const { updateElement } = useDesigner()
  const form = useForm<textFieldPropertiesType>({
    resolver: zodResolver(textFieldPropertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeHolder: element.extraAttributes.placeHolder
    }
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])

  function applyChanges(values: textFieldPropertiesType) {
    const { label, helperText, placeHolder, required } = values

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
        placeHolder
      }
    })
  }

  return (
    <Form {...form}>
      <form onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => e.preventDefault()}
        className="space-y-8">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>label</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                lable of the field <br /> It will be display above the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>helper text</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeHolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>placeholder</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem>
              <FormLabel>requied</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


      </form>
    </Form>
  )
}

function DesignerComponent({
  elementInstance
}: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance

  const { label, placeHolder, required, helperText } = element.extraAttributes
  return (
    <div className='flex flex-col gap-2 w-full '>
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeHolder} />
      {helperText && <p className='text-muted-foreground text-[0.8rem]'>{helperText}</p>}
    </div>
  )
}
