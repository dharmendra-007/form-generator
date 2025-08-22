import { FormCard } from "../ui/cards/FormCard";
import { formType } from "@/types/formType";

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
  forms: formType[];
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
