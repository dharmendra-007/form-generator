'use client'

import React, { useRef, useCallback, useState } from 'react'
import { FormElements } from '../fields/FormElements'
import { Button } from '../ui/button'
import { HiCursorClick } from 'react-icons/hi'
import { FormElementInstance } from '@/types/formElementType'
import { toast } from 'sonner'
import API from '@/lib/axios'

function FormSubmitComponent ({
  formUrl,
  content,
  userId
}: {
  content: FormElementInstance[]
  formUrl: string
  userId: string
}) {
  const formValues = useRef<{ [key: string]: string }>({})
  const formErrors = useRef<{ [key: string]: boolean }>({})
  const [renderKey, setRenderKey] = useState(Date.now())
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  const validateForm: () => boolean = useCallback(() => {
    formErrors.current = {}
    for (const field of content) {
      const actualValue = formValues.current[field.id] || ''
      const valid = FormElements[field.type].validate(field, actualValue)
      if (!valid) {
        formErrors.current[field.id] = true
      }
    }
    const hasErrors = Object.keys(formErrors.current).length > 0
    if (hasErrors) {
      setRenderKey(Date.now())
    }
    return !hasErrors
  }, [content])

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value
    formErrors.current[key] = false
  }, [])

  const submitForm = () => {
    setLoading(true)
    const isValid = validateForm()
    const jsonContent = formValues.current
    if (!isValid) {
      toast.error('Please fix validation errors before submitting.')
      setLoading(false)
      return
    }
    API.put(`/api/v1/form/submit`, {
      formUrl,
      content: jsonContent,
      userId: userId
    })
      .then(res => {
        const message = res.data.message || 'Form submitted successfully'
        toast.success(message)
        setSubmitted(true)
      })
      .catch(error => {
        const message = error?.response?.data?.message || 'Something went wrong'
        toast.error(message)
      })
      .finally(() => setLoading(false))
  }

  if (submitted) {
    return (
      <div className='flex justify-center w-full h-screen items-center p-4'>
        <div className='max-w-[620px] flex flex-col gap-8 bg-background p-8 overflow-auto shadow-xl rounded'>
          <span className='text-2xl font-semibold text-center'>
            WhatsApp Group Link
          </span>
          <a
            href='https://chat.whatsapp.com/IvbabP4xAAkJQXHuMt5i2X?mode=wwt'
            rel='noopener'
            target='_blank'
            className='py-3 bg-green-600 text-lg text-center rounded-full'
          >
            <span>
            </span>
            Join whatsapp Group
          </a>
          <div className='mt-4 flex justify-center'>
            <img
              src='/images/qr.jpg'
              alt='WhatsApp QR'
              className='w-64 h-64 object-contain rounded-xl'
            />
          </div>
        </div>
      </div>
      // <div className="flex justify-center w-full h-screen items-center p-4">
      //     <h2 className="text-xl font-semibold">WhatsApp Group Link</h2>
      //     <a
      //       href="https://chat.whatsapp.com/IvbabP4xAAkJQXHuMt5i2X?mode=wwt"
      //       rel="noopener"
      //       target="_blank"
      //       className="text-blue-600 underline text-lg"
      //     >
      //       Click here to join the WhatsApp Group
      //     </a>

      // <div className="mt-4 flex justify-center">
      //   <img
      //     src="/images/qr.jpg"
      //     alt="WhatsApp QR"
      //     className="w-64 h-64 object-contain"
      //   />
      // </div>
      // </div>
    )
  }

  return (
    <div className='flex justify-center w-full h-full min-h-screen items-center p-4 md:p-8'>
      <div
        key={renderKey}
        className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl rounded-xl'
      >
        {Array.isArray(content) &&
          content.map(element => {
            const FormElement = FormElements[element.type].formComponent
            return (
              <FormElement
                key={element.id}
                elementInstance={element}
                submitValue={submitValue}
                isInvalid={formErrors.current[element.id]}
                defaultValue={formValues.current[element.id]}
              />
            )
          })}

        <Button
          className='mt-8 h-[3rem] cursor-pointer'
          onClick={submitForm}
          disabled={loading}
        >
          {loading ? (
            'Submitting...'
          ) : (
            <>
              <HiCursorClick className='mr-2' />
              Submit
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default FormSubmitComponent
