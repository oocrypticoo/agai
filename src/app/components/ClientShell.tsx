"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import StarfieldPage from "./Stars";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black">
      {mounted && theme !== "light" && (
        <StarfieldPage color="white" size={0.003} count={700} />
      )}
      {children}
    </div>
  );
}

export function MountainsBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-[url('/mountains.jpg')] dark:bg-no-repeat dark:bg-cover">
      {children}
    </div>
  );
}
