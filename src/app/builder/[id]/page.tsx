import FormBuilder from '@/components/FormBuilder'
import React from 'react'

function BuilderPage({params}:{params:{
  id: string
}}) {
  // throw new Error("test")
  const form = {
    "_id": "d059d63a-d4a7-4716-8211-34d2a3ba549f",
    "name": "Zaam-Dox",
    "description": "Savory wraps with buffalo chicken and fresh vegetables.",
    "published": false,
    "createdAt": "5/21/2024",
    "visits": 266,
    "submissions": 280
  }

  return (
    <div>
      <FormBuilder form={form}/>
    </div>
  )
}

export default BuilderPage