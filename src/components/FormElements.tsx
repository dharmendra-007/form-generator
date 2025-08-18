import { FormElementsType } from "@/types/formElementType"
import { TextFieldFormElements } from "./fields/TextField"
import { TitleFieldFormElement } from "./fields/TitleField"
import { SubtitleFieldFormElement } from "./fields/SubTitleField"
import { ParagraphFieldFormElement } from "./fields/ParagraphField"
import { SeparatorFieldFormElement } from "./fields/SeparatorField";
import { NumberFieldFormElement } from "./fields/NumberField";
import { TextAreaFieldFormElement } from "./fields/TextAreaField";
import { SelectFieldFormElement } from "./fields/SelectField";
import { CheckboxFieldFormElement } from "./fields/CheckboxField";
import { EmailFieldFormElement } from "./fields/EmailField";
import {RadioButtonFieldFormElement} from "./fields/RadioButton"

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