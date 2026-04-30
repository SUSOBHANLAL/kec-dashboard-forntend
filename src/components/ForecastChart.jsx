import { useEffect, useRef } from "react";
import {
  Chart,
  LineController, LineElement, PointElement,
  LinearScale, CategoryScale, Tooltip,
} from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

const MODEL_COLORS = { arima: "#3b82f6", rf: "#22c55e", random_forest: "#22c55e", lstm: "#a855f7" };
const MODEL_BADGES = {
  arima:         "bg-blue-950  text-blue-400  border border-blue-900",
  rf:            "bg-green-950 text-green-400 border border-green-900",
  random_forest: "bg-green-950 text-green-400 border border-green-900",
  lstm:          "bg-purple-950 text-purple-400 border border-purple-900",
};

const GRID = "#1e2229";
const TICK = "#5a6070";

export default function ForecastChart({ forecast, model }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const color  = MODEL_COLORS[model] || "#3b82f6";
    const steps  = forecast.predictions.map((_, i) => `T+${i + 1}`);

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: steps,
        datasets: [{
          label: "Forecast",
          data:  forecast.predictions,
          borderColor: color, borderWidth: 2.5,
          pointRadius: 5, pointBackgroundColor: color,
          tension: 0.4, fill: false,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1e2229", titleColor: "#e8eaf0",
            bodyColor: "#8b92a0", borderColor: "#2a2f38", borderWidth: 1,
            callbacks: {
              label: (ctx) =>
                `₹${Number(ctx.parsed.y).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
            },
          },
        },
        scales: {
          x: {
            ticks: { color: TICK, font: { size: 10 } },
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
  }, [forecast, model]);

  const { MAE, RMSE, MAPE } = forecast.metrics;

  return (
    <div className="bg-[#111418] border border-[#2a2f38] rounded-xl p-4">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[13px] font-medium">
          {model.toUpperCase()} Forecast
        </p>
        <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium ${MODEL_BADGES[model] || MODEL_BADGES.arima}`}>
          {model.toUpperCase()}
        </span>
      </div>
      <p className="text-[11px] text-[#5a6070] mb-3">
        MAE: {parseFloat(MAE).toFixed(2)} &nbsp;·&nbsp;
        RMSE: {parseFloat(RMSE).toFixed(2)} &nbsp;·&nbsp;
        MAPE: {parseFloat(MAPE).toFixed(2)}%
      </p>
      <div className="relative h-[200px]">
        <canvas ref={canvasRef} role="img" aria-label={`${model} forecast chart`} />
      </div>
    </div>
  );
}
