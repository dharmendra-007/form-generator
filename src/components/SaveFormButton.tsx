'use client';

import { Button } from './ui/button';
import { SaveAll } from 'lucide-react';
import useDesigner from '@/hooks/useDesigner';
import { toast } from 'sonner';
import API from '@/lib/axios';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

function SaveFormButton({ id }: { id: string }) {
  const { elements } = useDesigner();
  const { user } = useAuth();
  const JsonElements = JSON.stringify(elements);
  const [loading, setLoading] = useState(false);

  const updateFormContent = async () => {
    setLoading(true);
    try {
      await API.put('/api/v1/form/updateform', {
        userId: user?.userId,
        formId: id,
        jsonContent: JsonElements,
      });
      toast.success('Form saved successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="secondary" className='cursor-pointer' disabled={loading} onClick={updateFormContent}>
      <SaveAll className="mr-2 h-4 w-4" />
      {loading ? 'Saving...' : 'Save'}
    </Button>
  );
}

export default SaveFormButton;
