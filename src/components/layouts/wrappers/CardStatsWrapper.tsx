"use client";
import API from "@/lib/axios";
import StatsCards from "./StatsCards";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function CardStatsWrapper() {
  const { token, user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get(`/api/v1/form/stats/${user?.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setStats(res.data.data);
    });
  }, [token, user?.userId]);

  return <StatsCards loading={false} data={stats} />;
}
