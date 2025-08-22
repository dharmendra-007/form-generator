import React from 'react';
import FormWrapper from '@/components/forms/formWrapper';

async function BuilderPage({ params }: {
  params: Promise<{ id: string }>
}) {

  const id = (await params).id

  return (
    <FormWrapper id={id}/>
  );
}

export default BuilderPage;
