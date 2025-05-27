import { Dispatch, SetStateAction } from "react";
import { FormElementInstance } from "./formElementType"

export type DesignerContextType = {
  elements : FormElementInstance[];
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
  addElement : (index : number , element : FormElementInstance) => void;
  removeElement : (id : string) => void;

  selectedElement : FormElementInstance | null;
  setSelectedElement : Dispatch<SetStateAction<FormElementInstance | null>>
  updateElement : (id : string , element : FormElementInstance) => void
}