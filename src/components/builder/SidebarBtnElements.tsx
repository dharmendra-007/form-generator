"use client"

import React from 'react'
import { FormElement } from '@/types/formElementType'
import { Button } from '../ui/button'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

function SidebarBtnElements({ formElement }: { formElement: FormElement }) {
  const { Icon, label } = formElement.designerButtonElement
  const draggable = useDraggable({
    id: `deginer-button-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true
    }
  })
  return (
    <Button
    ref={draggable.setNodeRef} 
    className={cn('flex flex-col gap-2 h-[120px] w-[120px] cursor-grab', draggable.isDragging && "ring-2 ring-primary")} variant="outline"
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="!h-8 !w-8 text-primary cursor-grab" />
      <p>{label}</p>
    </Button>
  )
}

export function SidebarBtnElementsDragOverlay({ formElement }: { formElement: FormElement }) {
  const { Icon, label } = formElement.designerButtonElement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const draggable = useDraggable({
    id: `deginer-button-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true
    }
  })
  return (
    <Button
    className='flex flex-col gap-2 h-[120px] w-[120px] cursor-grab'
    variant="outline"
    >
      <Icon className="!h-8 !w-8 text-primary cursor-grab" />
      <p>{label}</p>
    </Button>
  )
}

export default SidebarBtnElements