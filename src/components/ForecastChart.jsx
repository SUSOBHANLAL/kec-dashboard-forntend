import Plot from "react-plotly.js";

export default function ForecastChart({ forecast }) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <h2 className="mb-2">Forecast</h2>

      <Plot
        data={[
          {
            y: forecast.predictions,
            type: "scatter",
            mode: "lines+markers",
            name: forecast.model,
          },
        ]}
        layout={{
          paper_bgcolor: "#111",
          plot_bgcolor: "#111",
          font: { color: "#fff" },
        }}
      />

      <div className="mt-3 text-sm text-gray-400">
        RMSE: {forecast.metrics.RMSE} | MAE: {forecast.metrics.MAE}
      </div>
    </div>
  );
}