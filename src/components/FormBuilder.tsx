"use client"

import { formSchemaType } from '@/schemas/CreateFormSchema'
import React from 'react'
import PreviewDialogButton from './PreviewDialogButton'
import SaveFormButton from './SaveFormButton'
import PublishFormButton from './PublishFormButton'
import Designer from './Designer'
import { DndContext} from '@dnd-kit/core'
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
  return (
    <DndContext>
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