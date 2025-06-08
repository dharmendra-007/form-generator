import { LuView } from "react-icons/lu";
import StatsCard from "./StatsCard";

type Stats = {
  visits: number;
  submissions: number;
  submissionRate: number,
  bounceRate: number
};

interface StatsCardProps {
  data: Stats | null;
  loading: boolean;
}

export default function StatsCards({ data, loading }: StatsCardProps) {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<LuView className="text-green-600" />}
        helperText="All time form visits"
        value={data?.visits?.toLocaleString() || "0"}
        loading={loading}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="Total Submissions"
        icon={<LuView className="text-green-600" />}
        helperText="All time form submissions"
        value={data?.submissions?.toLocaleString() || "0"}
        loading={loading}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="Submission rate"
        icon={<LuView className="text-green-600" />}
        helperText="All time form visits"
        value={
          data?.submissionRate === undefined ? "0 %" :
            data?.submissionRate?.toLocaleString() + " %"
        }
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Bounce rate"
        icon={<LuView className="text-green-600" />}
        helperText="Visits that leave without interacting"
        value={
          data?.bounceRate === undefined ? "0 %" : data?.bounceRate?.toLocaleString() + "%"
        }
        loading={loading}
        className="shadow-md shadow-green-600"
      />
    </div>
  );
}
