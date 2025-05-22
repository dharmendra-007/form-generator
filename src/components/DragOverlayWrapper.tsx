import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { SidebarBtnElementsDragOverlay } from './SidebarBtnElements'
import { FormElements } from './FormElements'
import { ElementsType } from '@/types/formElementType'

function DragOverlayWrapper() {
  const[draggedItem , setDraggedItem] =useState<Active | null>(null)

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active)
    },
    onDragCancel: (event) => {
      setDraggedItem(null)
    },
    onDragEnd: (event) => {
      setDraggedItem(null)
    }
  })
  if(!draggedItem) {
    return null
  }

  let node = <div>No Drag Overlay</div>
  const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement

  if(isSidebarBtnElement){
    const type = draggedItem?.data?.current?.type as ElementsType
    node = <SidebarBtnElementsDragOverlay formElement={FormElements[type]}/>
  }
  return (
    <DragOverlay>{node}</DragOverlay>
  )
}

export default DragOverlayWrapper