import { LoaderCircle } from 'lucide-react';

function Loading() {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <LoaderCircle className='animate-spin !h-12 !w-12'/>
    </div>
  )
}

export default Loading
