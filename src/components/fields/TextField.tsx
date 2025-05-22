"use client"

import React from 'react'
import { ElementsType, FormElement } from "@/types/formElementType"
import { MdTextFields } from "react-icons/md";

const type : ElementsType = "TextField"

export const TextFieldFormElements : FormElement = {
  type,
  construct : (id) => ({
    id,
    type,
    extraAttributes: {
      label : "Text Field",
      helperText : "Helper Text",
      required : false,
      placeHolder : "value here..."
    }
  }),
  designerButtonElement : {
    Icon : MdTextFields,
    label : "Text Field"
  },
  designerComponent: () => <div>Designer Component</div>,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Properties Component</div>
}