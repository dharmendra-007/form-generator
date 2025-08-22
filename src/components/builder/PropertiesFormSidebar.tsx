import useDesigner from '@/hooks/useDesigner'
import React from 'react'
import { FormElements } from '../fields/FormElements'
import { Button } from '../ui/button'
import { X } from 'lucide-react';

function PropertiesFormSidebar() {
  const { selectedElement  , setSelectedElement } = useDesigner()

  if (!selectedElement) {
    return null
  }

  const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className='text-sm text-foreground/70'>Element Properties</p>
        <Button
        size={"icon"}
        variant={"ghost"}
        className='cursor-pointer'
        onClick={()=>{
          setSelectedElement(null)
        }}>
          <X />
        </Button>
      </div>
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  )
}

export default PropertiesFormSidebar