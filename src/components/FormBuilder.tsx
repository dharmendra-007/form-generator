"use client"


import React from 'react';
import { formSchemaType } from '@/schemas/CreateFormSchema';
import PreviewDialogButton from './PreviewDialogButton';
import SaveFormButton from './SaveFormButton';
import PublishFormButton from './PublishFormButton';
import Designer from './Designer';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import DragOverlayWrapper from './DragOverlayWrapper';
// import { Input } from './ui/input';
// import { Button } from './ui/button'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import Link from 'next/link';

function FormBuilder({form}: {
  form : formSchemaType & {
    _id : string
    published: boolean,
    createdAt: string,
    visits: number,
    submissions: number
  }


})

{    
  // const [isReady, setIsReady] = useState(false);
  // const { setElements } = useDesigner();
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

// useEffect(() => {
//     if (!form.content) return;

//     try {
//       const elements = JSON.parse(form.content);
//       setElements(elements);
//       const readyTimeout = setTimeout(() => setIsReady(true), 500);
//       return () => clearTimeout(readyTimeout);
//     } catch (err) {
//       console.error('Error parsing form content:', err);
//     }
//   }, [form, setElements]);

//   if (!isReady) {
//     return (
//       <div className="flex flex-col items-center justify-center w-full h-full">
//         <i className="fa fa-spinner animate-spin text-4xl" aria-hidden="true"></i>
//       </div>
//     );
//   }
//   const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;

//   if (form.published) {
//     return (
//       <div className="flex flex-col items-center justify-center h-full w-full">
//         <div className="max-w-md">
//           <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-2">
//             Form Published
//           </h1>
//           <h2 className="text-2xl">Share this form</h2>
//           <h3 className="text-xl">
//             Anyone with the link can view and submit this form
//           </h3>
//           <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
//             <Input className="w-full" readOnly value={shareUrl} />
//             <button
//               className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
//               onClick={() => {
//                 navigator.clipboard.writeText(shareUrl);
//               }}
//             >
//               Copy Link
//             </button>
//             <div className="flex justify-between w-full mt-4">
//               <Button variant="link" asChild>
//                 <Link href="/" className="flex items-center gap-2">
//                   <FontAwesomeIcon icon={faArrowLeft} />
//                   Go back home
//                 </Link>
//               </Button>
//               <Button variant="link" asChild>
//                 <Link href={`/forms/${form.id}`} className="flex items-center gap-2">
//                   <FontAwesomeIcon icon={faArrowRight} />
//                   Form details
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

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
            <SaveFormButton id={form._id}/>
            <PublishFormButton id={form._id}/>
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