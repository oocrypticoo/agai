"use client";
import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { motion } from "framer-motion";

am4core.useTheme(am4themes_animated);

export const DonutChartLight = () => {
  const chartRef = useRef<am4charts.PieChart3D | null>(null);
  const chartDiv = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 700;

    const chart = am4core.create(chartDiv.current!, am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0;
    chart.logo.disabled = true;
    chart.fontFamily = "Degular";

    chart.data = [
      { label: "Architect & Agent", percentage: 30 },
      { label: "Team", percentage: 20 },
      { label: "Treasury", percentage: 15 },
      { label: "Advisors", percentage: 3 },
      { label: "Liquidity", percentage: 25 },
      { label: "Ecosystem Fund", percentage: 7 },
    ];

    chart.innerRadius = isMobile ? 70 : 120;

    chart.legend = new am4charts.Legend();
    chart.legend.marginTop = 50;
    chart.legend.labels.template.text = "{category}";
    chart.legend.valueLabels.template.text = "";
    chart.legend.labels.template.fontFamily = "Degular";
    chart.legend.labels.template.fontSize = 14;
    chart.legend.labels.template.fill = am4core.color("#000");
    chart.legend.markers.template.stroke = am4core.color("#888");
    chart.legend.markers.template.strokeWidth = 1;

    const series: any = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "percentage";
    series.dataFields.category = "label";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 1;

    series.slices.template.tooltipText = "{category}: {value}%";
    series.tooltip.background.fill = am4core.color("#1f1f1f");
    series.tooltip.background.stroke = am4core.color("#444");
    series.tooltip.background.cornerRadius = 8;
    series.tooltip.background.strokeWidth = 1;

    series.tooltip.label.fill = am4core.color("#ffffff");
    series.tooltip.label.fontSize = 14;
    series.tooltip.label.fontFamily = "Degular";
    series.tooltip.label.fontWeight = "400";

    series.colors.list = [
      am4core.color("#D4D4D4"), // Soft Gray
      am4core.color("#737373"), // Charcoal Gray
      am4core.color("#525252"), // Darker Gray
      am4core.color("#404040"), // Near-Black
      am4core.color("#262626"), // Very Dark
      am4core.color("#1A1A1A"),
    ];

    // ✅ Show labels
    series.labels.template.text =
      "{category}: {value.percent.formatNumber('#.0')}%";
    series.labels.template.fill = am4core.color("#000000");
    series.labels.template.fontSize = isMobile ? 10 : 14;
    series.labels.template.disabled = false;
    series.ticks.template.stroke = am4core.color("#000000");
    series.labels.template.relativeRotation = 90;
    series.labels.template.radius = isMobile
      ? am4core.percent(-15)
      : am4core.percent(0);
    series.labels.template.wrap = isMobile;
    series.labels.template.maxWidth = 60;

    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div
      id="chartdiv"
      ref={chartDiv}
      style={{ width: "100%", height: "600px" }}
    />
  );
};

export const DonutChartDark = () => {
  const chartRef = useRef<am4charts.PieChart3D | null>(null);
  const chartDiv = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 700;

    const chart = am4core.create(chartDiv.current!, am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0;
    chart.logo.disabled = true;
    chart.fontFamily = "Degular";

    chart.data = [
      { label: "Architect & Agent", percentage: 30 },
      { label: "Team", percentage: 20 },
      { label: "Treasury", percentage: 15 },
      { label: "Advisors", percentage: 3 },
      { label: "Liquidity", percentage: 25 },
      { label: "Ecosystem Fund", percentage: 7 },
    ];

    chart.innerRadius = isMobile ? 70 : 120;

    chart.legend = new am4charts.Legend();
    chart.legend.marginTop = 50;
    chart.legend.labels.template.text = "{category}";
    chart.legend.valueLabels.template.text = "";
    chart.legend.labels.template.fontFamily = "Degular";
    chart.legend.labels.template.fontSize = 14;
    chart.legend.labels.template.fill = am4core.color("#fff");
    chart.legend.markers.template.stroke = am4core.color("#888");
    chart.legend.markers.template.strokeWidth = 1;

    const series: any = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "percentage";
    series.dataFields.category = "label";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 1;

    series.slices.template.tooltipText = "{category}: {value}%";
    series.tooltip.background.fill = am4core.color("#1f1f1f");
    series.tooltip.background.stroke = am4core.color("#444");
    series.tooltip.background.cornerRadius = 8;
    series.tooltip.background.strokeWidth = 1;

    series.tooltip.label.fill = am4core.color("#ffffff");
    series.tooltip.label.fontSize = 14;
    series.tooltip.label.fontFamily = "Degular";
    series.tooltip.label.fontWeight = "400";

    series.colors.list = [
      am4core.color("#D4D4D4"), // Soft Gray
      am4core.color("#737373"), // Charcoal Gray
      am4core.color("#525252"), // Darker Gray
      am4core.color("#404040"), // Near-Black
      am4core.color("#262626"), // Very Dark
      am4core.color("#1A1A1A"),
    ];

    // ✅ Show labels
    series.labels.template.text =
      "{category}: {value.percent.formatNumber('#.0')}%";
    series.labels.template.fill = am4core.color("#ffffff");
    series.labels.template.fontSize = isMobile ? 10 : 14;
    series.labels.template.disabled = false;
    series.ticks.template.stroke = am4core.color("#ffffff");
    series.labels.template.relativeRotation = 90;
    series.labels.template.radius = isMobile
      ? am4core.percent(-15)
      : am4core.percent(0);
    series.labels.template.wrap = isMobile;
    series.labels.template.maxWidth = 60;

    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div
        id="chartdiv"
        ref={chartDiv}
        style={{ width: "50%", height: "600px" }}
      />
    </motion.div>
  );
};
