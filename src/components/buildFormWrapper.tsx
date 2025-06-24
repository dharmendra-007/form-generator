"use client"

import { useEffect, useState } from "react"
import FormBuilder from "./FormBuilder"
import API from "@/lib/axios"
import { useAuth } from "@/hooks/useAuth"
import { formSchemaType } from "@/schemas/CreateFormSchema"
import { FormElementInstance } from "@/types/formElementType"
import { Loader2 } from "lucide-react"

type formType = formSchemaType & {
  id: string;
  userId: string;
  createdAt: string;
  publishd: boolean;
  content: FormElementInstance[];
  visits: number;
  submissions: number;
  shareUrl: string;
};

function BuildFormWrapper({ id }: {
  id: string
}) {

  const { user } = useAuth()
  const [form, setForm] = useState<formType | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    API.get(`/api/v1/form/getform/${user?.userId}/${id}`)
      .then((res) => {
        setForm(res.data.form)
      })
      .catch((error) => {
        const message = error.response?.data?.message || "No form found";
        console.error(message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

    if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      {/* <div>
        <div className="py-4 border-b border-muted">
          <div className="flex justify-between items-center w-full px-10">
            <h1 className="text-4xl font-bold truncate">{form != undefined ? form.name : ""}</h1>
            <VisitBtn shareUrl={form != undefined ? form.shareUrl : ""} />
          </div>
        </div>

        <div className="py-4 border-b border-muted">
          <div className="flex gap-2 justify-between px-10">
            <FormLinkShare shareUrl={form != undefined ? form.shareUrl : ""} />
          </div>
        </div>
      </div> */}
      <FormBuilder form={form} />
    </div>
  )
}

export default BuildFormWrapper