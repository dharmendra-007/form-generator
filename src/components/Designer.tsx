"use client";

import React, { useState } from 'react'
import DesignerSidebar from './DesignerSidebar';
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core"
import { cn } from '@/lib/utils';
import { ElementsType, FormElementInstance } from '@/types/formElementType';
import useDesigner from '@/hooks/useDesigner';
import { FormElements } from './FormElements';
import { idGenerator } from '@/lib/idGenerator';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

function Designer() {
  const { elements, addElement ,removeElement, selectedElement , setSelectedElement} = useDesigner()

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true
    }
  })

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event

      if (!active || !over) {
        return
      }

      //first scenario
      const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement
      const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea

      if (isDesignerBtnElement && isDroppingOverDesignerDropArea) {
        const type = active.data?.current?.type
        const newElement = FormElements[type as ElementsType].construct(idGenerator())
        addElement(elements.length, newElement)
      }

      //second scenario
      const isdroppingOverTopHalf = over.data?.current?.isTopHalfDesignerElement
      const isdroppingOverBottomHalf = over.data?.current?.isBottomHalfDesignerElement
      const isdroppingOverDesignerElement = isdroppingOverTopHalf || isdroppingOverBottomHalf

      const droppingOverDesignerElement = isDesignerBtnElement && isdroppingOverDesignerElement

      if(droppingOverDesignerElement){
        const type = active.data?.current?.type
        const newElement = FormElements[type as ElementsType].construct(idGenerator())

        const overId = over.data?.current?.elementId
        const overElementIndex = elements.findIndex((el) => el.id === overId)
        if(overElementIndex == -1 ){
          throw new Error("Element not found")
        }
        let indexForNewElement = overElementIndex

        if(isdroppingOverBottomHalf){
          indexForNewElement = overElementIndex + 1
        }

        addElement(indexForNewElement, newElement)
      }

      //third scenario
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement
      const draggingDesignerElementOverOtherElement = isdroppingOverDesignerElement && isDraggingDesignerElement

      if(draggingDesignerElementOverOtherElement){
        const activeId = active.data?.current?.elementId
        const overId = over.data?.current?.elementId

        const activeElementIndex = elements.findIndex(el => el.id === activeId)
        const overElementIndex = elements.findIndex(el => el.id === overId)

        if(overElementIndex == -1 || overElementIndex == -1){
          throw new Error("Element not found")
        }

        let indexForNewElement = overElementIndex

        if(isdroppingOverBottomHalf){
          indexForNewElement = overElementIndex + 1
        }

        const activeElement = {...elements[activeElementIndex]}
        removeElement(activeId)
        addElement(indexForNewElement , activeElement)
      }
    }
  })

  return (
    <div className='flex w-full h-full'>
      <div className="p-4 w-full"
      onClick={() => {if(selectedElement){
        setSelectedElement(null)
      }}}>
        <div
          ref={droppable.setNodeRef}
          className={cn("bg-background max-w-[97%] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/20 "
          )}>

          {!droppable.isOver && elements.length == 0 && (
            <p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>Drop here</p>
          )}

          {droppable.isOver && elements.length === 0 && (
            <div className='p-4 w-full'>
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}

          {elements.length > 0 &&
            <div className='flex flex-col w-full gap-2 p-4 '>
              {elements.map((element) =>
                <DesignerElementWrapper key={element.id} element={element} />
              )}
            </div>
          }
        </div>
      </div>
      <DesignerSidebar />
    </div>
  )
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {

  console.log("Rendering element:", element.id);
  const {removeElement , selectedElement , setSelectedElement} = useDesigner()
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true
    }
  })

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true
    }
  })

  const  draggable  = useDraggable({
    id : element.id + "-drag-handler",
    data : {
      type : element.type,
      elementId: element.id,
      isDesignerElement : true,
    }
  })

  if(draggable.isDragging){
    return null
  }

  const DesignerElement = FormElements[element.type].designerComponent

  console.log("select" , selectedElement)
  return (
    <div
    ref={draggable.setNodeRef}
    {...draggable.listeners}
    {...draggable.attributes} 
    className="relative flex flex-col h-[120px] text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedElement(element)
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute top-0 w-full h-1/2 rounded-t-md"></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 w-full h-1/2 rounded-b-md "></div>
      {mouseIsOver && (
        <>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse text-muted-foreground text-sm'>
            <p>Click for properties or drag to move</p>
          </div>
          <div className='absolute right-0 rounded-md h-full'>
            <Button 
            className='flex items-center justify-center h-full rounded-md rounded-l-none bg-red-500 hover:bg-red-400 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation()
              removeElement(element.id)}}>
              <Trash2 className='!h-6 !w-6 text-primary' />
            </Button>
          </div>
        </>
      )}
      {
        topHalf.isOver && (
          <div className='absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none'/>
        )
      }

      <div className={cn('w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100', 
      mouseIsOver && "opacity-30"
      )}>
        <DesignerElement elementInstance={element} />
      </div>

      {
        bottomHalf.isOver && (
          <div className='absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none'/>
        )
      }
    </div>
  )
}

export default Designer