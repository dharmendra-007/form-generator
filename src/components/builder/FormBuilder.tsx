"use client"

import React, { useEffect, useState } from 'react';
import PreviewDialogButton from '../ui/buttons/PreviewDialogButton';
import SaveFormButton from '../ui/buttons/SaveFormButton';
import PublishFormButton from '../ui/buttons/PublishFormButton';
import Designer from './Designer';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import DragOverlayWrapper from './DragOverlayWrapper';
import useDesigner from '@/hooks/useDesigner';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Input } from '../ui/input';
import { ArrowLeft, ArrowRight, Check, Copy } from 'lucide-react';
import { formType } from '@/types/formType';

function FormBuilder({ form }: {
  form: formType | undefined
}) {
  const [isReady, setIsReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const { setElements } = useDesigner();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    }
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (!form?.content) return;

    try {
      const elements = JSON.parse(String(form.content));
      setElements(elements);
      const readyTimeout = setTimeout(() => setIsReady(true), 500);
      return () => clearTimeout(readyTimeout);
    } catch (err) {
      console.error('Error parsing form content:', err);
    }
  }, [form, setElements]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <i className="fa fa-spinner animate-spin text-4xl" aria-hidden="true"></i>
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/submit/${form?.shareUrl}`;

  if (form?.published) {
    const handleCopy = () => {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-foreground/10 px-4">
        <div className="max-w-md w-full border p-6 rounded-xl shadow-md bg-background">
          <h1 className="text-center text-3xl font-bold text-primary border-b pb-3 mb-4">
            ✅ Form Published
          </h1>
          <h2 className="text-lg font-semibold font-mono mb-1">🔗 Share this form</h2>
          <h3 className="text-sm text-muted-foreground mb-4">
            Anyone with the link can view and submit this form
          </h3>

          <div className="flex flex-col gap-3 items-center w-full">
            <Input className="w-full font-mono" readOnly value={shareUrl} />
            <Button
              className="mt-1 w-full py-2 rounded-md cursor-pointer"
              onClick={handleCopy}
              variant={copied ? "secondary" : "default"}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </>
              )}
            </Button>

            <div className="flex justify-between w-full mt-6">
              <Button variant="link" asChild>
                <Link href="/" className="flex items-center gap-1 text-sm">
                  <ArrowLeft className="w-4 h-4" />
                  Go back home
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link href={`/forms/${form.id}`} className="flex items-center gap-1 text-sm">
                  Form details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className='flex flex-col w-full px-10 h-screen'>
        <nav className='flex justify-between border-b-2 gap-3 items-center px-2 py-4'>
          <h2 className='truncate font-medium'>
            <span className='text-muted-foreground mr-2'>Form: {form ? form.name : ""}</span>
          </h2>
          <div className='flex items-center gap-2'>
            <PreviewDialogButton />
            {form && !form.published && (
              <>
                <SaveFormButton id={form.id} />
                <PublishFormButton id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/images/paper.svg)] dark:bg-[url(/images/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;
