"use client";
import { useEffect, useState } from "react";
import FormList from "./FormList";
import CreateFormButton from "./CreateFormButton";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "./ui/skeleton";
import API from "@/lib/axios";
import { toast } from "sonner";
import { formSchemaType } from "@/schemas/CreateFormSchema";
import { FormElementInstance } from "@/types/formElementType";

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

export default function FormSection() {
  const { user, isAuthenticated } = useAuth();
  const [forms, setForms] = useState<form[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchForms = async (userId: string) => {
    setLoading(true);
    API.get(`/api/v1/form/all/${userId}`)
      .then((res) => {
        setForms(res.data.forms || []);
      })
      .catch((err) => {
        const message = err.response?.data?.message || "An error occured";
        toast.error("Error", {
          description: message,
        });
        setForms([]);
      })
      .finally(() => {
        setLoading(false);
      });
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
        <div className="col-span-3 flex items-center h-[190px] gap-4 flex-wrap">
          <Skeleton className="h-full w-80" />
          <Skeleton className="h-full w-80" />
        </div>
      ) : (
        <FormList
          forms={forms}
          onDeleteForm={(id) =>
            setForms((forms) => forms.filter((f) => f.id !== id))
          }
        />
      )}
    </>
  );
}
