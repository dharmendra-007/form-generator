// import React from "react";
// //import { GETformContentByURL } from "@/lib/api"; 
// import FormSubmitComponent from "@/components/FormSubmitComponent";
// import { FormElementInstance } from "@/components/FormElements"; 

async function SubmitPage({ params }: {params : Promise<{formUrl : string}>}) {
  // const form = await GETformContentByURL((await params).formUrl); 

  // if (!form) {
  //   throw new Error("Form not found");
  // }

  // const formContent = JSON.parse(form.content) as FormElementInstance[];

  return (
    // <FormSubmitComponent formUrl={params.formUrl} content={formContent} />
    <div>
      {(await params).formUrl}
    </div>
  );
}

export default SubmitPage;
