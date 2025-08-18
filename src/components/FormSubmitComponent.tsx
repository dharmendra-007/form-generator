"use client";

import React, { useRef, useCallback, useState} from "react";
import { FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";
import { FormElementInstance } from "@/types/formElementType";
import { toast } from "sonner";
import API from "@/lib/axios";

function FormSubmitComponent({
  formUrl,
  content,
  userId
}: {
  content: FormElementInstance[];
  formUrl: string;
  userId: string
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(Date.now());
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)

  const validateForm: () => boolean = useCallback(() => {
    formErrors.current = {};
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);
      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }
    const hasErrors = Object.keys(formErrors.current).length > 0;
    if (hasErrors) {
      setRenderKey(Date.now());
    }
    return !hasErrors;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
    formErrors.current[key] = false;
  }, []);

  const submitForm = () => {
    setLoading(true)
    const isValid = validateForm();
    const jsonContent = formValues.current;
    if (!isValid) {
      toast.error("Please fix validation errors before submitting.");
      setLoading(false)
      return;
    }
    API.put(`/api/v1/form/submit`, {
        formUrl,
        content: jsonContent,
        userId : userId
      })
      .then((res) => {
          const message = res.data.message || "Form submitted successfully";
          toast.success(message);
          setSubmitted(true);
        })
        .catch((error) => {
          const message = error?.response?.data?.message || "Something went wrong";
          toast.error(message);
        })
        .finally(() => setLoading(false))
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-screen items-center p-4">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-auto border shadow-xl shadow-green-700 rounded">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">Thank you for submitting the form.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full min-h-screen items-center p-4 md:p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-green-700 rounded-xl"
      >
        {Array.isArray(content) && content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}

        <Button className="mt-8 cursor-pointer" onClick={submitForm} disabled={loading}>
          {loading ? "Submitting..." : (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
