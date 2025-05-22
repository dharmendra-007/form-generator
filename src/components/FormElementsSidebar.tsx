import React from 'react'
import SidebarBtnElements from './SidebarBtnElements'
import { FormElements } from './FormElements'

function FormElementsSidebar() {
  return (
    <div>
      Elements
      <SidebarBtnElements formElement = {FormElements.TextField}/>
      </div>
  )
}

export default FormElementsSidebar