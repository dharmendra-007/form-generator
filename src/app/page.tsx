"use client"

import { useAuth } from "@/hooks/useAuth";
import UnauthenticatedLandingPage from "@/components/pages/unauthenticatedLandingPage";
import Dashboard from "@/components/pages/dashboard";

export default function Home() {
  const {isAuthenticated} = useAuth()

  if(!isAuthenticated) {
    return <UnauthenticatedLandingPage/>
  }

  return (
    <Dashboard/>
  );
}
