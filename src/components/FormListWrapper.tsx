import { useEffect, useState } from "react";
import FormList from "./FormList";
import CreateFormButton from "./CreateFormButton";

const USER_ID = "f739e47f-613e-40fc-a230-589b054bcd5b"; // Replace with dynamic userId if available

export default function FormSection() {
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchForms = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://enigmadnd.vercel.app/api/v1/form/all");
      const data = await res.json();
      setForms(data.forms || []);
    } catch {
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleFormCreated = () => {
    fetchForms();
  };

  return (
    <>
      <CreateFormButton onFormCreated={handleFormCreated} userId={USER_ID} />
      {loading ? (
        <div className="col-span-3 flex items-center justify-center h-[190px]">
          Loading...
        </div>
      ) : (
        <FormList forms={forms} />
      )}
    </>
  );
}
