"use client";

import { Header } from "@/components/header";
import CreateFormButton from "@/components/CreateFormButton";
import FormCard from "@/components/FormCard";
import { Skeleton } from "@/components/ui/skeleton";
// import { formSchemaType } from "@/schemas/CreateFormSchema";
import { Suspense } from "react";

function FormCardSkeleton() {
  return (
    <Skeleton className="border-2 border-primary/20 h-[190px] w-full"></Skeleton>
  );
}

async function RenderFormCard() {
  const forms = [
    {
      _id: "d059d63a-d4a7-4716-8211-34d2a3ba549f",
      name: "Zaam-Dox",
      description: "Savory wraps with buffalo chicken and fresh vegetables.",
      published: true,
      createdAt: "5/21/2024",
      visits: 266,
      submissions: 280,
    },
    {
      _id: "867e3665-444c-444c-a5b1-c1df4f32128f",
      name: "Y-find",
      description: "Stylish tote to keep wine bottles chilled while traveling.",
      published: true,
      createdAt: "5/14/2025",
      visits: 861,
      submissions: 590,
    },
    {
      _id: "12bd5e1d-e9fc-4f25-b85a-ab845e99fe03",
      name: "Latlux",
      description:
        "Baking mix to create your favorite Samoa-style cookies at home.",
      published: false,
      createdAt: "4/30/2025",
      visits: 860,
      submissions: 945,
    },
    {
      _id: "3ec1c309-f4bb-4223-a5f6-a723a7764caf",
      name: "Bitwolf",
      description: "DIY kit to convert your smartphone into a mini projector.",
      published: false,
      createdAt: "12/15/2024",
      visits: 261,
      submissions: 704,
    },
    {
      _id: "00795806-1e04-4a26-8a6d-584f5aae54bc",
      name: "Zathin",
      description: "1080p wireless security camera with night vision.",
      published: false,
      createdAt: "12/17/2024",
      visits: 131,
      submissions: 775,
    },
  ];

  return (
    <>
      {forms.map((form) => (
        <FormCard key={form._id} form={form} />
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Welcome to Form Generator
          </h2>
          <p className="text-gray-400">
            Create and manage your forms with ease. Get started by creating a
            new form or exploring existing ones.
          </p>
        </div>
      </main>
    </div>
  );
}
