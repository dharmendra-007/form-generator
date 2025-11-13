'use client'
import API from '@/lib/axios'
import { FormElementInstance } from '@/types/formElementType'
import { lazy, Suspense, useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'

export function SubmitPageWrapper ({ formUrl }: { formUrl: string }) {
  const [formContent, setFormContent] = useState<FormElementInstance[]>([])
  const [userId, setUserId] = useState('')
  const [isloading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    API.put(`/api/v1/form/getformbyurl/${formUrl}`)
      .then(res => {
        const content = JSON.parse(
          res.data.content.content
        ) as FormElementInstance[]
        setFormContent(content)
        setUserId(res.data.content.userId)
      })
      .catch(error => {
        const message = error.response.data.message || 'No content found'
        console.log(message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const FormSubmitComponent = lazy(
    () => import('../submit/FormSubmitComponent')
  )

  return (
    <Suspense
      fallback={
        <div className='flex justify-center items-center h-screen w-screen'>
          <LoaderCircle className='animate-spin text-green-500 !h-4 !w-4' />
        </div>
      }
    >
      <FormSubmitComponent
        formUrl={formUrl}
        content={formContent}
        userId={userId}
      />
    </Suspense>
  )
}
