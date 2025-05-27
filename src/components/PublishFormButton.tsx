import React, { useTransition } from 'react'
import { Button } from './ui/button';
import { Upload } from 'lucide-react';
import{
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { useRouter } from 'next/navigation';





function PublishFormButton() {
const [loading, startTransition]= useTransition();
const router = useRouter();
async function publishForm({id}:{id: number}) {
  try{
    await PublishForm(id);
     // toast({
    //   title: "Sucess",
    //   description: "Form is available",
    // });
    router.refresh();
  } catch(error) {
    // toast({
      // title: "Error",
      // description: "Something went wrong",
    // });
  }
  
}

  return (
  <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button><Upload />Publish</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle> Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. After publishing you cannot edit this form.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();
          startTransition(publishForm); 
        }}
      >
        Proceed {loading && '...'}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>



 
  )
}

export default PublishFormButton;