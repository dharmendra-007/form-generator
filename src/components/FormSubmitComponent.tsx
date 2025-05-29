// "use client";
// import React, { useRef, useCallback, useState, useTransition } from "react";
// import { FormElementInstance, FormElements } from "./FormElements";
// import { Button } from "./ui/button";
// import { HiCursorClick } from "react-icons/hi";

// function FormSubmitComponent({
//   formUrl,
//   content,
// }: {
//   content: FormElementInstance[];
//   formUrl: string;
// }) {
//   const formValues = useRef<{ [key: string]: string }>({});
//   const formErrors = useRef<{ [key: string]: boolean }>({});
//   const [renderKey, setRenderKey] = useState(Date.now());
//   const [submitted, setsubmitted] = useState(false);
//   const [pending, startTransition] = useTransition();

//   const validateForm: () => boolean = useCallback(() => {
//     formErrors.current = {};
//     for (const field of content) {
//       const actualValue = formValues.current[field.id] || "";
//       const valid = FormElements[field.type].validate(field, actualValue);
//       if (!valid) {
//         formErrors.current[field.id] = true;
//       }
//     }
//     const hasErrors = Object.keys(formErrors.current).length > 0;
//     if (hasErrors) {
//       setRenderKey(Date.now());
//     }
//     return !hasErrors;
//   }, [content]);

//   const submitValue = useCallback((key: string, value: string) => {
//     formValues.current[key] = value;
//     formErrors.current[key] = false;
//   }, []);

//   const submitForm = () => {
//     const isValid = validateForm();
//     if (!isValid) {
//       alert("Please fix validation errors before submitting.");
//       return;
//     }
//     console.log("Form Submitted", formValues.current);
//   };

//   try {
//   const jsonContent = JSON.stringify(formValues.current);
//   await submitForm(formUrl, jsonContent);
//   setsubmitted(true);
// } catch (error) {
//   // toast({
//   //   title: "Error",
//   //   description: "Something went wrong",
//   //   variant: "destructive",
//   // });
// }

// if (submitted) {
//   return (
//     <div className="flex justify-center w-full h-full items-center p-8">
//       <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-auto border shadow-xl shadow-blue-700 rounded">
//         <h1 className="text-2xl font-bold">Form submitted</h1>
//         <p className="text-muted-foreground">Thank you for submitting the form.</p>
//       </div>
//     </div>
//   );
// }


//   return (
//     <div className="flex justify-center w-full h-full items-center p-8">
//       <div key={renderKey} className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded-xl">
//         {content.map((element) => {
//           const FormElement = FormElements[element.type].formComponent;
//           return (
//        <FormElement
//             key={`${element.id}`}
//             elementInstance={element}
//             submitValue={submitValue}
//             error={formErrors.current[element.id]}
//             isInvalid={formErrors.current[element.id]}
//             defaultValue={formValues.current[element.id]}
//           />
//         );
//       })}

//         <Button className="mt-8" onClick={submitForm} disabled={pending}>
//          {!pending &&<>
//          <HiCursorClick className="mr-2" />
//           Submit
//           </>}
//           {pending}
//         </Button>
  
//       </div>
//     </div>
//   );
// }

// export default FormSubmitComponent;


"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";

interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select';
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: string[]; // For select fields
}

interface FormSubmitComponentProps {
  formUrl: string;
  fields: FormField[];
}

export default function FormSubmitComponent({ formUrl, fields }: FormSubmitComponentProps) {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const errors: { [key: string]: boolean } = {};
    
    fields.forEach(field => {
      const value = formValues[field.id] || '';
      
      // Basic validation
      if (field.required && !value.trim()) {
        errors[field.id] = true;
      }
      
      // Email validation
      if (field.type === 'email' && value && !/^\S+@\S+\.\S+$/.test(value)) {
        errors[field.id] = true;
      }
      
      // Number validation
      if (field.type === 'number' && value && isNaN(Number(value))) {
        errors[field.id] = true;
      }
    });
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (fieldId: string, value: string) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));
    // Clear error when user types
    if (formErrors[fieldId]) {
      setFormErrors(prev => ({ ...prev, [fieldId]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const isValid = validateForm();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      
      if (!response.ok) {
        throw new Error('Submission failed');
      }
      
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <form 
        onSubmit={handleSubmit}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded-xl"
      >
        {fields.map((field) => (
          <div key={field.id} className="flex flex-col gap-1">
            <label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>
            
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                value={formValues[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className={`p-2 border rounded ${formErrors[field.id] ? 'border-red-500' : 'border-gray-300'}`}
                rows={4}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.id}
                value={formValues[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className={`p-2 border rounded ${formErrors[field.id] ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">{field.placeholder || 'Select an option'}</option>
                {field.options?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                id={field.id}
                type={field.type}
                value={formValues[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className={`p-2 border rounded ${formErrors[field.id] ? 'border-red-500' : 'border-gray-300'}`}
              />
            )}
            
            {formErrors[field.id] && (
              <p className="text-red-500 text-xs">This field is required</p>
            )}
          </div>
        ))}

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <Button 
          type="submit" 
          className="mt-8" 
          disabled={isSubmitting}
        >
          {!isSubmitting ? (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          ) : (
            'Submitting...'
          )}
        </Button>
      </form>
    </div>
  );
}