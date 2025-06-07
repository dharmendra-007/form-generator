
// import StatsCards from "./StatsCards";

// export default async function CardStatsWrapper() {
//   const stats = await GetFormStats();

//   return <StatsCards loading={false} data={stats} />;
// }
// components/CardStatsWrapper.tsx
import StatsCards from "./StatsCards";

export default async function CardStatsWrapper() {

  const stats = {
    visits: 0,
  };

  return <StatsCards loading={false} data={stats} />;
}
