import React from 'react'
import { Button } from './ui/button'
import { ScanEye } from 'lucide-react';

function PreviewDialogButton() {
  return (
    <Button variant="secondary"><ScanEye />Preview</Button>
  )
}

export default PreviewDialogButton