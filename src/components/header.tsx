"use client";

import { ProfileMenu } from "./profile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-white">Form Generator</h1>
        </div>
        <div className="flex items-center space-x-4">
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
