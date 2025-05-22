export type ElementsType = "TextField"

export type FormElement = {
  type : ElementsType;

  construct : (id:string) => FormElementInstance

  designerButtonElement : {
    Icon : React.ElementType,
    label : string
  }

  designerComponent : React.FC;
  formComponent : React.FC;
  propertiesComponent: React.FC
}

export type FormElementInstance = {
  id : string ;
  type : ElementsType ;
  extraAttributes?: Record<string , any>;
}

export type FormElementsType = {
  [key in ElementsType] : FormElement
}