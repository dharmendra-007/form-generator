import FormCard from "./FormCard";

export default function FormList({ forms }: { forms: any[] }) {
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id || form._id} form={form} />
      ))}
    </>
  );
}
