"use client";
import React, { useEffect, useState } from "react";
import NextTopLoader from "nextjs-toploader";
import { useTheme } from "next-themes";

const TopLoader = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <NextTopLoader color={theme === "light" ? "#000000" : "#ffffff"} />;
};

export default TopLoader;
