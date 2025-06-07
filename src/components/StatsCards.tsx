'use client';
import { LuView } from "react-icons/lu";
import StatsCard from "./StatsCard";

type Stats = {
  visits: number;
};

interface StatsCardProps {
  data: Stats;
  loading: boolean;
}

export default function StatsCards({ data, loading }: StatsCardProps) {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<LuView className="text-green-600" />}
        helperText="All time form visits"
        value={data.visits.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-green-600"
      />

       <StatsCard
        title="Total Submissions"
        icon={<LuView className="text-green-600" />}
        helperText="All time form submissions"
        value={data.visits.toLocaleString() }
        loading={loading}
        className="shadow-md shadow-green-600"
      />

       <StatsCard
        title="Submission rate"
        icon={<LuView className="text-green-600" />}
        helperText="All time form visits"
        value={data.visits.toLocaleString() + "%" || "" }
        loading={loading}
        className="shadow-md shadow-green-600"
      />
       <StatsCard
        title="Bounce rate"
        icon={<LuView className="text-green-600" />}
        helperText="Visits that leave without interacting"
        value={data.visits.toLocaleString() + "%" || "" }
        loading={loading}
        className="shadow-md shadow-green-600"
      />
    </div>
  );
}
