import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function PriceChart({ chart }) {
  const data = chart.dates.map((date, i) => ({
    date,
    price: chart.price[i],
    ma10: chart.ma10[i] || null,
    ma20: chart.ma20[i] || null,
  }));

  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <h2 className="mb-3 text-lg">Price + Moving Average</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} />
          <Line type="monotone" dataKey="ma10" stroke="#3b82f6" />
          <Line type="monotone" dataKey="ma20" stroke="#f59e0b" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}