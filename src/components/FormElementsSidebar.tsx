import React from "react";
import SidebarBtnElement from "./SidebarBtnElements";
import { FormElements } from "./FormElements";
import { Separator } from "./ui/separator";

function FormElementsSidebar() {
  return (
    <div>
      <p className="text-sm text-foreground/70">Drag and drop elements</p>
      <Separator className="my-2" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2">
          Layout elements
        </p>
        

        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubtitleField} />
          <SidebarBtnElement formElement={FormElements.ParagraphField} />
<SidebarBtnElement formElement={FormElements.SeparatorField} />

        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2">
         Form elements
                 
        </p>
         <SidebarBtnElement formElement={FormElements.TextField} />
          <SidebarBtnElement formElement={FormElements.NumberField} />
        <SidebarBtnElement formElement={FormElements.TextAreaField} />
        <SidebarBtnElement formElement={FormElements.SelectField} />      
         <SidebarBtnElement formElement={FormElements.CheckboxField} /> 
          <SidebarBtnElement formElement={FormElements.EmailField} /> 
      </div>
    </div>
  );
}

export default FormElementsSidebar;