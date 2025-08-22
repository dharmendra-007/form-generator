"use client"

import { useEffect, useState } from "react"
import FormBuilder from "./FormBuilder"
import API from "@/lib/axios"
import { useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"
import { formType } from "@/types/formType"

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
      <FormBuilder form={form} />
    </div>
  )
}

export default BuildFormWrapper