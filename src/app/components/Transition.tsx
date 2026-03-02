"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  useMotionValueEvent,
} from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Transition({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) {
  const { theme, setTheme } = useTheme();
  const [tempTheme, setTempTheme] = useState(theme);
  const [visible, setVisible] = useState(show);
  const [displayProgress, setDisplayProgress] = useState(0);

  const progress = useMotionValue(0);
  const widthPercent = useTransform(progress, (v) => `${v}%`);
  const rounded = useTransform(progress, (v) => Math.round(v));

  useMotionValueEvent(rounded, "change", (latest) => {
    setDisplayProgress(latest);
  });

  useEffect(() => {
    if (show) {
      setVisible(true);
      progress.set(0);

      const controls = animate(progress, 100, {
        duration: 2.5,
        ease: "easeInOut",
        onComplete: () => {
          setTheme(theme === "dark" ? "light" : "dark");
          setTimeout(() => {
            setTempTheme(theme === "dark" ? "light" : "dark");
            setVisible(false);
            setShow(false);
          }, 500);
        },
      });

      return () => controls.stop();
    }
  }, [show]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-2 ${
            tempTheme === "light" ? "bg-black" : "bg-white"
          }`}
        >
          <Image
            className="mb-[5px]"
            src={tempTheme === "light" ? "/AGIWhite.png" : "/AGIBlack.png"}
            width={200}
            height={200}
            alt="logo"
          />
          <div
            className={`w-64 h-2 rounded overflow-hidden ${
              tempTheme === "light" ? "bg-gray-700" : "bg-black/10"
            }`}
          >
            <motion.div
              className={`h-full  rounded ${
                tempTheme === "light" ? "bg-white" : "bg-black"
              }`}
              style={{ width: widthPercent }}
            />
          </div>
          <div
            className={`text-xl font-degular tracking-wider ${
              tempTheme === "light" ? "text-white" : "text-black"
            }`}
          >
            {displayProgress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
