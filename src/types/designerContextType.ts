import { FormElementInstance } from "./formElementType"

export type DesignerContextType = {
  element : FormElementInstance[];
  addElement : (index : number , element : FormElementInstance) => void;

}