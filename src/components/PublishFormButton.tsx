"use client"

import React, { useState } from 'react'
import { Button } from './ui/button';
import { Upload } from 'lucide-react';
import {
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
import { toast } from 'sonner';
import API from '@/lib/axios';
import { useAuth } from '@/hooks/useAuth';


function PublishFormButton({ id }: { id: string }) {

  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function publishForm({ id }: { id: string }) {
    setLoading(true)
    API.put(`/api/v1/form/publish`, {
      userId: user?.userId,
      formId: id
    })
      .then(() => {
        toast("Success", {
          description: "Form published successfully",
        });
        window.location.reload()
      })
      .catch((error) => {
        const message = error.response.data.message || "Something went wrong"
        toast("Error", {
          description: message,
        });
      })
      .finally(() => {
        setLoading(false)
        setDialogOpen(false);
      })
  }

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button className='cursor-pointer'><Upload />Publish</Button>
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
              publishForm({ id });
            }}
            className='cursor-pointer'
          >
            Proceed {loading && '...'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PublishFormButton;