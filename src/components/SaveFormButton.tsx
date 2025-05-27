import React, { useTransition } from 'react'
import { Button } from './ui/button';
import { SaveAll } from 'lucide-react';
import useDesigner from '@/hooks/useDesigner';
import { toast } from 'sonner';

function SaveFormButton({id}:{id: number}) {
  const {elements} = useDesigner();
  const [loading, startTransition]= useTransition();
  
  const updateFormContent = async () =>{
    try{
      const JsonElements = JSON.stringify(elements);
      await UpdateFormContent(id ,JsonElements);
      toast({
        title:"Success",
        description: "Form content updated successfully",
      });
    } catch (error){
      toast({
        title: "Error",
        description: "Failed to update form content",
        variant:"destructive",
        });
     
    }
  };
  
  return (
    <Button variant="secondary" disabled={loading} onClick={()=>{startTransition(updateFormContent);}}><SaveAll />Save{loading}</Button>
  )
}

export default SaveFormButton;