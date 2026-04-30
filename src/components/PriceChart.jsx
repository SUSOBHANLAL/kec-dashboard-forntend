// import { useEffect, useRef } from "react";
// import {
//   Chart,
//   LineController, LineElement, PointElement,
//   LinearScale, CategoryScale,
//   Tooltip, CartesianScaleOptions,
// } from "chart.js";

// Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

// const GRID = "#1e2229";
// const TICK = "#5a6070";

// export default function PriceChart({ chart }) {
//   const canvasRef = useRef(null);
//   const chartRef  = useRef(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;
//     if (chartRef.current) chartRef.current.destroy();

//     const labels = chart.dates.map((d) => d.slice(5));
//     const data   = chart.dates.map((_, i) => ({
//       price: chart.price[i],
//       ma10:  chart.ma10[i] ?? null,
//       ma20:  chart.ma20[i] ?? null,
//     }));

//     chartRef.current = new Chart(canvasRef.current, {
//       type: "line",
//       data: {
//         labels,
//         datasets: [
//           {
//             label: "Price",
//             data: data.map((d) => d.price),
//             borderColor: "#22c55e", borderWidth: 2,
//             pointRadius: 0, tension: 0.3, fill: false,
//           },
//           {
//             label: "MA10",
//             data: data.map((d) => d.ma10),
//             borderColor: "#3b82f6", borderWidth: 1.5,
//             borderDash: [4, 2], pointRadius: 0, tension: 0.3, fill: false,
//           },
//           {
//             label: "MA20",
//             data: data.map((d) => d.ma20),
//             borderColor: "#f59e0b", borderWidth: 1.5,
//             borderDash: [6, 3], pointRadius: 0, tension: 0.3, fill: false,
//           },
//         ],
//       },
//       options: {
//         responsive: true, maintainAspectRatio: false,
//         interaction: { mode: "index", intersect: false },
//         plugins: {
//           legend: { display: false },
//           tooltip: {
//             backgroundColor: "#1e2229", titleColor: "#e8eaf0",
//             bodyColor: "#8b92a0", borderColor: "#2a2f38", borderWidth: 1,
//           },
//         },
//         scales: {
//           x: {
//             ticks: { color: TICK, font: { size: 10 }, maxTicksLimit: 8, maxRotation: 0 },
//             grid:  { color: GRID },
//           },
//           y: {
//             ticks: {
//               color: TICK, font: { size: 10 },
//               callback: (v) => "₹" + Number(v).toLocaleString("en-IN"),
//             },
//             grid: { color: GRID },
//           },
//         },
//       },
//     });

//     return () => chartRef.current?.destroy();
//   }, [chart]);

//   return (
//     <div className="bg-[#111418] border border-[#2a2f38] rounded-xl p-4">
//       <div className="flex items-center justify-between mb-1">
//         <p className="text-[13px] font-medium">Price + Moving Averages</p>
//         <span className="text-[11px] text-[#5a6070]">60d</span>
//       </div>
//       <div className="flex gap-4 text-[11px] mb-3 text-[#8b92a0]">
//         <span><span className="text-green-400">●</span> Price</span>
//         <span><span className="text-blue-400">●</span> MA10</span>
//         <span><span className="text-amber-400">●</span> MA20</span>
//       </div>
//       <div className="relative h-[200px]">
//         <canvas ref={canvasRef} role="img" aria-label="Price and moving average line chart" />
//       </div>
//     </div>
//   );
// }




import { useEffect, useRef } from "react";
import {
  Chart,
  LineController, LineElement, PointElement,
  LinearScale, CategoryScale, Tooltip,
} from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

const GRID = "#1e2229";
const TICK = "#5a6070";

export default function PriceChart({ chart }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const labels = chart.dates.map((d) => d.slice(5));
    const data   = chart.dates.map((_, i) => ({
      price: chart.price[i],
      ma10:  chart.ma10[i] ?? null,
      ma20:  chart.ma20[i] ?? null,
    }));

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Price",
            data: data.map((d) => d.price),
            borderColor: "#22c55e", borderWidth: 2,
            pointRadius: 0, tension: 0.3, fill: false,
          },
          {
            label: "MA10",
            data: data.map((d) => d.ma10),
            borderColor: "#3b82f6", borderWidth: 1.5,
            borderDash: [4, 2], pointRadius: 0, tension: 0.3, fill: false,
          },
          {
            label: "MA20",
            data: data.map((d) => d.ma20),
            borderColor: "#f59e0b", borderWidth: 1.5,
            borderDash: [6, 3], pointRadius: 0, tension: 0.3, fill: false,
          },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1e2229", titleColor: "#e8eaf0",
            bodyColor: "#8b92a0", borderColor: "#2a2f38", borderWidth: 1,
          },
        },
        scales: {
          x: {
            ticks: { color: TICK, font: { size: 10 }, maxTicksLimit: 8, maxRotation: 0 },
            grid:  { color: GRID },
          },
          y: {
            ticks: {
              color: TICK, font: { size: 10 },
              callback: (v) => "₹" + Number(v).toLocaleString("en-IN"),
            },
            grid: { color: GRID },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [chart]);

  return (
    <div className="bg-[#111418] border border-[#2a2f38] rounded-xl p-4">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[13px] font-medium">Price + Moving Averages</p>
        <span className="text-[11px] text-[#5a6070]">60d</span>
      </div>
      <div className="flex gap-4 text-[11px] mb-3 text-[#8b92a0]">
        <span><span className="text-green-400">●</span> Price</span>
        <span><span className="text-blue-400">●</span> MA10</span>
        <span><span className="text-amber-400">●</span> MA20</span>
      </div>
      <div className="relative h-[200px]">
        <canvas ref={canvasRef} role="img" aria-label="Price and moving average line chart" />
      </div>
    </div>
  );
}
