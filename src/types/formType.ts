import { FormElementInstance } from "@/types/formElementType";
import { formSchemaType } from "../validations/CreateFormSchema";

export type formType = formSchemaType & {
  id: string;
  userId: string;
  createdAt: string;
  published: boolean;
  content: FormElementInstance[];
  visits: number;
  submissions: number;
  shareUrl: string;
};

export type FormSubmissionType = {
  id: string;
  createdAt: string;
  formId: string;
  content: Record<string, string>;
  userId: string;
};