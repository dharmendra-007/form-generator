import React from "react";
//import { GETformContentByURL } from "@/lib/api"; 
import FormSubmitComponent from "@/components/FormSubmitComponent";
import { FormElementInstance } from "@/components/FormElements"; 

type SubmitPageProps = {
  params: {
    formUrl: string;
  };
};

async function SubmitPage({ params }: SubmitPageProps) {
  //const form = await GETformContentByURL(params.formUrl); 

  if (!form) {
    throw new Error("Form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return (
    <FormSubmitComponent formUrl={params.formUrl} content={formContent} />
  );
}

export default SubmitPage;
