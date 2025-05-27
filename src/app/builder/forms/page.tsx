import FormBuilder from '@/components/FormBuilder';
import React from 'react';
import VisitBtn from '@/components/VisitBtn';
import FormLinkShare from '@/components/formLinkShare';

function BuilderPage({ params }: { params: { id: string } }) {
  const form = {
    _id: params.id,
    id: params.id,
    name: 'Zaam-Dox',
    description: 'Savory wraps with buffalo chicken and fresh vegetables.',
    published: false,
    createdAt: '5/21/2024',
    visits: 266,
    submissions: 280,
    content: '[]',
    shareUrl: `https://yourdomain.com/forms/${params.id}`, 
  };

  return (
    <div>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={form.shareUrl} />
        </div>
      </div>

      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form.shareUrl} />
        </div>
      </div>

      <div className="container py-6">
        <FormBuilder form={form} />
      </div>
    </div>
  );
}

export default BuilderPage;
