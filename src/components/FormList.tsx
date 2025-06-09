import { formSchemaType } from "@/schemas/CreateFormSchema";
import FormCard from "./FormCard";
import { FormElementInstance } from "@/types/formElementType";

type form = formSchemaType & {
  id: string
  userId: string
  createdAt: string
  publishd: boolean
  content: FormElementInstance[]
  visits: number
  submissions: number
  shareUrl: string
}

export default function FormList({ forms }: { forms: form[] }) {
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}
