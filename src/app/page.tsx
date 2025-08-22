"use client"

import { useAuth } from "@/hooks/useAuth";
import UnauthenticatedLandingPage from "@/components/layouts/unauthenticatedLandingPage";
import Dashboard from "@/components/layouts/dashboard";

export default function Home() {
  const {isAuthenticated} = useAuth()

  if(!isAuthenticated) {
    return <UnauthenticatedLandingPage/>
  }

  return (
    <Dashboard/>
  );
}
