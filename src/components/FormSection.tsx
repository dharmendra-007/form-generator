"use client";
import { useEffect, useState } from "react";
import FormList from "./FormList";
import CreateFormButton from "./CreateFormButton";
import { useAuth } from "@/hooks/useAuth";

export default function FormSection() {
  const { user, isAuthenticated } = useAuth();
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchForms = async (userId: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://enigmadnd.vercel.app/api/v1/form/all/${userId}`
      );
      // const res = await fetch(
      //   `https://enigmadnd.vercel.app/api/v1/form/all/f739e47f-613e-40fc-a230-589b054bcd5b`
      // );
      const data = await res.json();
      setForms(data.forms || []);
    } catch {
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      fetchForms(user.userId);
    }
  }, [user?.userId]);

  const handleFormCreated = () => {
    if (user?.userId) {
      fetchForms(user.userId);
    }
  };

  if (!isAuthenticated) {
    return <div>Please sign in to view your forms.</div>;
  }

  return (
    <>
      {user && (
        <CreateFormButton
          onFormCreated={handleFormCreated}
          userId={user.userId}
        />
      )}
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
