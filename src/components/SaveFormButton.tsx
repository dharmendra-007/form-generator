import React, { useTransition } from 'react'
import { Button } from './ui/button';
import { SaveAll } from 'lucide-react';
// import useDesigner from '@/hooks/useDesigner';
import { toast } from 'sonner';

function SaveFormButton({id}:{id: string}) {
  // const {elements} = useDesigner();
  console.log(id)
  const [loading, startTransition]= useTransition();
  
  const updateFormContent = async () =>{
    try{
      // const JsonElements = JSON.stringify(elements);
      // await UpdateFormContent(id ,JsonElements);
      toast("Success" ,{
        description: "Form content updated successfully",
      });
    } catch (error){
      toast.error("Error", {
        description: String(error)
      })
    }
  };
  
  return (
    <Button variant="secondary" disabled={loading} onClick={()=>{startTransition(updateFormContent);}}><SaveAll />Save{loading}</Button>
  )
}

export default SaveFormButton;