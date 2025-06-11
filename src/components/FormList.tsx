import { formSchemaType } from "@/schemas/CreateFormSchema";
import FormCard from "./FormCard";
import { FormElementInstance } from "@/types/formElementType";

type form = formSchemaType & {
  id: string;
  userId: string;
  createdAt: string;
  publishd: boolean;
  content: FormElementInstance[];
  visits: number;
  submissions: number;
  shareUrl: string;
};

// Type guard for published/publishd
function getPublishedProp(form: object): boolean {
  if (typeof form === "object" && form !== null) {
    if (
      "published" in form &&
      typeof (form as { published: unknown }).published === "boolean"
    ) {
      return (form as { published: boolean }).published;
    }
    if (
      "publishd" in form &&
      typeof (form as { publishd: unknown }).publishd === "boolean"
    ) {
      return (form as { publishd: boolean }).publishd;
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
