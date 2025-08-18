import React from 'react'
import BuildFormWrapper from '@/components/buildFormWrapper';

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return(
    <BuildFormWrapper id={id}/>
  )
}