import { FormElementsType } from "@/types/formElementType"
import { TextFieldFormElements } from "./TextField"
import { TitleFieldFormElement } from "./TitleField"
import { SubtitleFieldFormElement } from "./SubTitleField"
import { ParagraphFieldFormElement } from "./ParagraphField"
import { SeparatorFieldFormElement } from "./SeparatorField";
import { NumberFieldFormElement } from "./NumberField";
import { TextAreaFieldFormElement } from "./TextAreaField";
import { SelectFieldFormElement } from "./SelectField";
import { CheckboxFieldFormElement } from "./CheckboxField";
import { EmailFieldFormElement } from "./EmailField";
import {RadioButtonFieldFormElement} from "./RadioButton"

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElements,
  TitleField: TitleFieldFormElement,
  SubtitleField: SubtitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  SelectField: SelectFieldFormElement,       
  CheckboxField: CheckboxFieldFormElement, 
  EmailField: EmailFieldFormElement,
  RadioButtonField: RadioButtonFieldFormElement
}