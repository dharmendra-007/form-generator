"use client"

import { formSchemaType } from '@/schemas/CreateFormSchema'
import React from 'react'
import PreviewDialogButton from './PreviewDialogButton'
import SaveFormButton from './SaveFormButton'
import PublishFormButton from './PublishFormButton'
import Designer from './Designer'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core'
import DragOverlayWrapper from './DragOverlayWrapper'

function FormBuilder({form}: {
  form : formSchemaType & {
    _id : string
    published: boolean,
    createdAt: string,
    visits: number,
    submissions: number
  }
}) {

  const mouseSensor = useSensor(MouseSensor,{
    activationConstraint : {
      distance: 10,
    },
  })

  const touchSensor = useSensor(TouchSensor , {
    activationConstraint : {
      delay : 300,
      tolerance : 5,
    }
  })
  const sensors = useSensors(mouseSensor , touchSensor)
  return (
    <DndContext sensors={sensors}>
      <main className='flex flex-col w-full p-10 h-screen'>
        <nav className='flex justify-between border-b-2 gap-3 items-center'>
          <h2 className='truncate font-medium'>
            <span className='text-muted-foreground mr-2'>Form : {form.name}</span>
          </h2>
          <div className='flex items-center gap-2 mb-2'>
            <PreviewDialogButton/>
            {!form.published &&
            <>
            <SaveFormButton/>
            <PublishFormButton/>
            </>}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
        <Designer/>
        </div>
      </main>
      <DragOverlayWrapper/>
    </DndContext>
  )
}

export default FormBuilder