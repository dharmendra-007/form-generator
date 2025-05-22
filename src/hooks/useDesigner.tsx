"use client"
import { useContext } from 'react'
import { DesignerContext } from '@/components/context/DesignerContext'

function useDesigner() {
  const context = useContext(DesignerContext)

  if(!context){
    throw new Error("Use designer must be used in a designerContext.")
  }

  return context;
}

export default useDesigner