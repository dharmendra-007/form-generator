import { Header } from "@/components/header";
import CreateFormButton from "@/components/CreateFormButton";
import FormListWrapper from "@/components/FormListWrapper";
import CardStatsWrapper from "@/components/CardStatsWrapper";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Welcome to Form Generator
          </h2>
          <p className="text-gray-400">
            Create and manage your forms with ease. Get started by creating a
            new form or exploring existing ones.
          </p>
        </div>
        <CardStatsWrapper />
        <div className="relative text-center my-8">
          <span className="text-4xl font-bold text-white bg-gray-900 px-4 relative z-10">
            Your Forms
          </span>
          <div className="absolute top-1/2 left-0 w-full border-t border-green-700 z-0" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

          <CreateFormButton />
          <FormListWrapper />
        </div>
      </main>
    </div>
  );
}
