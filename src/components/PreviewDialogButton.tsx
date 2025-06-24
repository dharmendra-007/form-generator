import React from 'react'
import { Button } from './ui/button'
import { ScanEye } from 'lucide-react';
import useDesigner from '@/hooks/useDesigner';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { FormElements } from './FormElements';

function PreviewDialogButton() {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className='cursor-pointer'><ScanEye />Preview</Button>
      </DialogTrigger>
      <DialogContent className='w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0'>
        <div className='px-4 py-2 border-b'>
          <DialogTitle className='text-lg font-bold text-muted-foreground'> Form preview</DialogTitle>
          <p className='text-sm text-muted-foreground'> This is how your form will look</p>
        </div>
        <div className='bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto '>
          <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto'>
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return (
                <FormComponent key={element.id} elementInstance={element} />
              );


            })
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default PreviewDialogButton