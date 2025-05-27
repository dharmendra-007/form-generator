"use client";
import React, { useRef, useCallback, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";

function FormSubmitComponent({
  formUrl,
  content,
}: {
  content: FormElementInstance[];
  formUrl: string;
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(Date.now());
  const [submitted, setsubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

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
    const isValid = validateForm();
    if (!isValid) {
      alert("Please fix validation errors before submitting.");
      return;
    }
    console.log("Form Submitted", formValues.current);
  };

  try {
  const jsonContent = JSON.stringify(formValues.current);
  await submitForm(formUrl, jsonContent);
  setsubmitted(true);
} catch (error) {
  // toast({
  //   title: "Error",
  //   description: "Something went wrong",
  //   variant: "destructive",
  // });
}

if (submitted) {
  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-auto border shadow-xl shadow-blue-700 rounded">
        <h1 className="text-2xl font-bold">Form submitted</h1>
        <p className="text-muted-foreground">Thank you for submitting the form.</p>
      </div>
    </div>
  );
}


  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div key={renderKey} className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded-xl">
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
       <FormElement
            key={`${element.id}`}
            elementInstance={element}
            submitValue={submitValue}
            error={formErrors.current[element.id]}
            isInvalid={formErrors.current[element.id]}
            defaultValue={formValues.current[element.id]}
          />
        );
      })}

        <Button className="mt-8" onClick={submitForm} disabled={pending}>
         {!pending &&<>
         <HiCursorClick className="mr-2" />
          Submit
          </>}
          {pending}
        </Button>
  
      </div>
    </div>
  );
}

export default FormSubmitComponent;
