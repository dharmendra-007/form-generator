export type ElementsType = "TextField" | "TitleField"  | "SubtitleField" |"ParagraphField" | "SeparatorField" | "NumberField" | "TextAreaField" | "SelectField" |  "CheckboxField" | "EmailField" | "RadioButtonField";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerButtonElement: {
    Icon: React.ElementType;
    label: string;
  };
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, unknown>;
};

export type FormElementsType = {
  [key in ElementsType]: FormElement;
};

// Specific instance types for each element
export type TextFieldInstance = FormElementInstance & {
  type: "TextField";
  extraAttributes: {
    label: string;
    helperText: string;
    required: boolean;
    placeHolder: string;
  };
};

export type TitleFieldInstance = FormElementInstance & {
  type: "TitleField";
  extraAttributes: {
    title: string;
    size: "default" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  };
};

export type SubTitleFieldInstance = FormElementInstance & {
  type: "SubTitleField";
  extraAttributes: {
    text: string; 
    size: "default" | "sm" | "base" | "lg";
    italic: boolean;
    muted: boolean;
  };
};

export type ParagraphFieldInstance = FormElementInstance & {
  type: "ParagraphField";
  extraAttributes: {
    text: string;
    align: "left" | "center" | "right" | "justify";
    italic: boolean;
    muted: boolean;
    spacing: "default" | "tight" | "wide";
  };
};

export type SeparatorFieldInstance = FormElementInstance & {
  type: "SeparatorField";
};

export type NumberFieldInstance = FormElementInstance & {
  type: "NumberField";
  extraAttributes: {
    label: string;
    helperText: string;
    required: boolean;
    placeholder: string;
  };
};

export type TextAreaFieldInstance = FormElementInstance & {
  type: "TextAreaField";
  extraAttributes: {
    label: string;
    helperText: string;
    required: boolean;
    placeholder: string;
    rows: number;
  };
};

export type SelectFieldInstance = FormElementInstance & {
  type: "SelectField";
  extraAttributes: {
    label: string;
    helperText: string;
    required: boolean;
    options: string[];
  };
};


export type CheckboxFieldInstance = FormElementInstance & {
  type: "CheckboxField";
  extraAttributes: {
    label: string;
    helperText: string;
    required: boolean;
  };
};
export type EmailFieldInstance = FormElementInstance & {
  type: "EmailField";
  extraAttributes: {
    label: string;
    helperText: string;
    required: boolean;
    placeholder: string;
  };
};
