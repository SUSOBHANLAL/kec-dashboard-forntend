import { useEffect, useRef } from "react";
import {
  Chart,
  BarController, BarElement,
  LinearScale, CategoryScale, Tooltip,
} from "chart.js";

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip);

const THRESHOLD = 0.025;

export default function VolatilityChart({ volatility }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const data   = volatility.slice(-30);
    const labels = Array.from({ length: data.length }, (_, i) => `-${data.length - 1 - i}d`);

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Volatility",
          data,
          backgroundColor: data.map((v) => v > THRESHOLD ? "#ef444455" : "#3b82f655"),
          borderColor:     data.map((v) => v > THRESHOLD ? "#ef4444"   : "#3b82f6"),
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1e2229", titleColor: "#e8eaf0",
            bodyColor: "#8b92a0", borderColor: "#2a2f38", borderWidth: 1,
          },
        },
        scales: {
          x: {
            ticks:  { color: "#5a6070", font: { size: 9 }, maxTicksLimit: 10 },
            grid:   { display: false },
          },
          y: {
            ticks:  { color: "#5a6070", font: { size: 9 } },
            grid:   { color: "#1e2229" },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [volatility]);

  return (
    <div className="bg-[#111418] border border-[#2a2f38] rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[13px] font-medium">Volatility Trend</p>
        <span className="text-[11px] text-[#5a6070]">30d rolling &nbsp;·&nbsp; <span className="text-red-400">red</span> = spike</span>
      </div>
      <div className="relative h-[80px]">
        <canvas ref={canvasRef} role="img" aria-label="Volatility bar chart over last 30 days" />
      </div>
    </div>
  );
}
