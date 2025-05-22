"use client"

import React from 'react'
import SidebarBtnElements from './SidebarBtnElements'
import { FormElement } from '@/types/formElementType'
import { FormElements } from './FormElements'

function DesignerSidebar() {
  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
      Elements
      <SidebarBtnElements formElement = {FormElements.TextField}/>
    </aside>
  )
}

export default DesignerSidebar