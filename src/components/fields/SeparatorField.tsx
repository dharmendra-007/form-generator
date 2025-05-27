"use client";

import React from "react";
import { ElementsType, FormElement, FormElementInstance } from "@/types/formElementType";
import { MdTextFields } from "react-icons/md";
import { Label } from "../ui/label";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id) => ({
    id,
    type,
  
  }),
  designerButtonElement: {
    Icon: MdTextFields,
    label: "Separator",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: () => null, // No properties to configure
  validate: () => true, // No validation needed
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <Label className="text-muted-foreground">Separator</Label>
      <hr className="border-muted" />
    </div>
  );
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  return <hr className="my-4 border-muted" />;
}
