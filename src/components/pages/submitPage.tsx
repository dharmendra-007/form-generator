"use client"
import API from "@/lib/axios"
import { FormElementInstance } from "@/types/formElementType"
import { useEffect, useState } from "react"
import FormSubmitComponent from "../FormSubmitComponent"

export function SubmitPageWrapper({formUrl} : {
  formUrl : string
}) {
  const [formContent, setFormContent] = useState<FormElementInstance[]>([])

  useEffect(() => {
    API.put(`/api/v1/form/getformbyurl/${formUrl}`)
    .then((res) => {
      const content = JSON.parse(res.data.content.content) as FormElementInstance[]
      setFormContent(content)
    })
    .catch((error) => {
      const message = error.response.data.message || "No content found"
      console.log(message)
    })
  }, [])
  
  return (
    <FormSubmitComponent formUrl={formUrl} content={formContent}/>
  )
}