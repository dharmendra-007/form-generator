import { formSchemaType } from "@/schemas/CreateFormSchema";
import { FormElementInstance } from "@/types/formElementType";
import { FormCard } from "./FormCard";

type form = formSchemaType & {
  id: string;
  userId: string;
  createdAt: string;
  published: boolean;
  content: FormElementInstance[];
  visits: number;
  submissions: number;
  shareUrl: string;
};

function getPublishedProp(form: object): boolean {
  if (typeof form === "object" && form !== null) {
    if (
      "published" in form &&
      typeof (form as { published: unknown }).published === "boolean"
    ) {
      return (form as { published: boolean }).published;
    }
    if (
      "published" in form &&
      typeof (form as { published: unknown }).published === "boolean"
    ) {
      return (form as { published: boolean }).published;
    }
  }
  return false;
}

export default function FormList({
  forms,
  onDeleteForm,
}: {
  forms: form[];
  onDeleteForm: (id: string) => void;
}) {
  return (
    <>
      {forms.map((form) => (
        <FormCard
          key={form.id}
          form={{
            ...form,
            published: getPublishedProp(form),
          }}
          onDelete={onDeleteForm}
        />
      ))}
    </>
  );
}
