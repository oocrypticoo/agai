"use client";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";
import { SplitString } from "../utils/SplitString";
import { useTheme } from "next-themes";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const generateYearDates = (year: number): string[] => {
  const dates: string[] = [];
  let date = new Date(year, 0, 1);
  while (date.getFullYear() === year) {
    dates.push(date.toISOString().split("T")[0]);
    date.setDate(date.getDate() + 1);
  }
  return dates;
};

const GithubContributions: React.FC = () => {
  const { theme } = useTheme();

  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(currentYear);
  const [data, setData] = useState<Record<string, number>>({});
  const [totalContributions, setTotalContributions] = useState(0);

  const text1 = SplitString("Built by Vincent, Proven in Code.");
  const text2 = SplitString(
    "Continuous development and community contributions"
  );

  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  const getColor = (count: number): string => {
    if (theme === "light") {
      if (year === 2025 || year === 2026) {
        if (count === 0) return "#ebedf0";
        if (count < 40) return "#9be9a8";
        if (count < 70) return "#40c463";
        if (count < 100) return "#30a14e";
        return "#216e39";
      } else {
        if (count === 0) return "#ebedf0";
        if (count < 5) return "#9be9a8";
        if (count < 10) return "#40c463";
        if (count < 20) return "#30a14e";
        return "#216e39";
      }
    } else {
      if (year === 2025 || year === 2026) {
        if (count === 0) return "#161b22";
        if (count < 40) return "#0e4429";
        if (count < 70) return "#006d32";
        if (count < 100) return "#26a641";
        return "#39d353";
      } else {
        if (count === 0) return "#161b22";
        if (count < 2) return "#0e4429";
        if (count < 5) return "#006d32";
        if (count < 10) return "#26a641";
        return "#39d353";
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/contributions?year=${year}`);
        const json = await res.json();

        const contributions: Record<string, number> = {};
        json.data.user.contributionsCollection.contributionCalendar.weeks.forEach(
          (week: any) => {
            week.contributionDays.forEach((day: any) => {
              contributions[day.date] = day.contributionCount;
            });
          }
        );
        setTotalContributions(
          json.data.user.contributionsCollection.contributionCalendar
            .totalContributions
        );
        setData(contributions);
      } catch (error: any) {
        console.log("something went wrong");
      }
    };

    fetchData();
  }, [year]);

  // Generate all days in year
  const yearDates = generateYearDates(year);

  // Group dates by week (GitHub style, vertical = days, horizontal = weeks)
  const weeks: string[][] = [];
  let currentWeek: string[] = [];
  yearDates.forEach((date) => {
    const day = new Date(date).getDay();
    if (day === 0 && currentWeek.length) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(date);
  });
  if (currentWeek.length) weeks.push(currentWeek);

  // Years for sidebar
  const years = [2026, 2025, 2024];

  return (
    <section className="py-20 sm:py-25 px-[20px] bg-white dark:bg-transparent overflow-hidden">
      <Tooltip
        className="font-degular tracking-wide text-sm"
        id="cell-tooltip"
        style={{
          zIndex: 9999, // force tooltip above mapped elements
        }}
      />
      <div className="mx-auto max-w-7xl relative">
        {/* Section Header */}
        <div className="text-center mb-25">
          <motion.h1
            className="mb-5 font-degular-medium text-[60px] leading-[55px] sm:text-[70px] sm:leading-[65px] text-heading tracking-wide"
            style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.025 }}
          >
            {text1.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.h1
            className="mb-10 font-degular text-[30px] leading-[25px] text-text/80 tracking-wide"
            style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
            initial="hidden"
            whileInView="reveal"
            transition={{ staggerChildren: 0.015, delayChildren: 0.4 }}
          >
            {text2.map((char: string, key: number) => (
              <motion.span
                key={key}
                transition={{ duration: 0.5 }}
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full"
        >
          <h1
            className="mb-10 font-degular-medium text-[24px] leading-[20px] text-heading tracking-wide"
            style={{ textShadow: "2px 2px 40px #f8e2fe7c" }}
          >
            Commit Activity - Year {year}
          </h1>
        </motion.div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="w-full flex xl:flex-row flex-col justify-center items-center gap-7 xl:gap-0"
        >
          <div className="w-full flex overflow-x-auto lg:overflow-x-visible">
            {/* Sidebar for year selection */}
            <div className="mr-6">
              <h2 className="font-degular-medium text-heading mb-2 tracking-wide">
                Years
              </h2>
              <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    className={`px-2 py-1 rounded font-degular text-sm tracking-wide cursor-pointer hover:bg-heading hover:text-heading-invert transition-all duration-300 ${
                      y === year
                        ? "bg-heading text-heading-invert"
                        : " text-heading"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            {/* Heatmap */}
            <div>
              {/* Month labels */}
              <div className="flex ml-6 mb-1 text-sm text-gray-600">
                {months.map((m, i) => (
                  <div
                    key={i}
                    className="flex-1 text-center font-degular text-text text-sm tracking-wide"
                  >
                    {m}
                  </div>
                ))}
              </div>

              <div className="flex">
                {/* Day labels */}
                <div className="flex flex-col justify-between mr-2 text-sm text-gray-600">
                  {daysOfWeek.map((d) => (
                    <div
                      className="font-degular text-text text-xs tracking-wide"
                      key={d}
                      style={{ height: 14 }}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Grid */}
                <div key={year} className="flex gap-[2px]">
                  {weeks.map((week, wi) => (
                    <div
                      key={`week-${year}-${wi}`}
                      className="flex flex-col gap-[2px] z-0"
                    >
                      {daysOfWeek.map((_, di) => {
                        const date = week.find(
                          (d) => new Date(d).getDay() === di
                        );
                        const count = date ? data[date] || 0 : 0;

                        return (
                          <div
                            key={`cell-${year}-${wi}-${di}`}
                            data-tooltip-id="cell-tooltip"
                            data-tooltip-content={`${
                              date || "No date"
                            }: ${count} contributions`}
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: 2,
                              backgroundColor: getColor(count),
                            }}
                            className={`${!date ? "opacity-0" : "opacity-100"}`}
                          ></div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="mb-2 w-17 h-17 flex justify-center items-center bg-[#d4a017]/20 dark:bg-[#fbbf24]/20 rounded-full">
              <div className="w-14 h-14 bg-[#d4a017] dark:bg-[#fbbf24] rounded-xl" />
            </div>
            <span className="font-degular-medium text-[30px] text-heading tracking-wide">
              {totalContributions.toLocaleString()}
            </span>
            <span className="font-degular text-text text-[16px] tracking-wide">
              Total Contributions
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubContributions;
