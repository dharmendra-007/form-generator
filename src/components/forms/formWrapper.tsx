"use client"

import React, { useEffect, useState } from 'react'
import FormLinkShare from './formLinkShare';
import API from '@/lib/axios';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import StatsCards from '../layouts/wrappers/StatsCards';
import { SubmissionsTable } from './submissionTable';
import VisitBtn from '../ui/buttons/VisitBtn';
import { formType } from '@/types/formType';

function FormWrapper({ id }: {
  id: string
}) {

  const { user } = useAuth()
  const [form, setForm] = useState<formType | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    API.get(`/api/v1/form/getform/${user?.userId}/${id}`)
      .then((res) => {
        setForm(res.data.form)
      })
      .catch((error) => {
        const message = error.response?.data?.message || "No form found";
        console.error(message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const visits = form != undefined ? form.visits : 0
  const submissions = form != undefined ? form.submissions : 0
  let submissionRate = 0

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100
  }

  const bounceRate = 100 - submissionRate

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className='container mx-auto lg:px-14 md:px-6 sm:px-4 px-4 py-7'>
      <div className="py-4 border-b border-muted">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold truncate py-2">{form != undefined ? form.name : ""}</h1>
          <VisitBtn shareUrl={form != undefined ? form.shareUrl : " "} />
        </div>
      </div>

      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form != undefined ? form.shareUrl : " "} />
        </div>
      </div>

      <StatsCards loading={false} data={{
          visits,
          submissions,
          bounceRate,
          submissionRate
        }} />

      <SubmissionsTable id={id}/>
    </div>
  );
}

export default FormWrapper