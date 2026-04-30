import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ForecastChart({ forecast }) {
  const data = forecast.predictions.map((p, i) => ({
    step: `T+${i + 1}`,
    value: p,
  }));

  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <h2 className="mb-3 text-lg">Forecast ({forecast.model})</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="step" />
          <Tooltip />

          <Line type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      {/* Metrics */}
      <div className="mt-4 text-sm text-gray-400">
        MAE: {forecast.metrics.MAE} | RMSE: {forecast.metrics.RMSE} | MAPE: {forecast.metrics.MAPE}
      </div>
    </div>
  );
}