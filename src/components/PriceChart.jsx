import Plot from "react-plotly.js";

export default function PriceChart({ chart }) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <h2 className="mb-2">Price Trend</h2>

      <Plot
        data={[
          {
            x: chart.dates,
            y: chart.price,
            type: "scatter",
            mode: "lines",
            name: "Price",
          },
          {
            x: chart.dates,
            y: chart.ma10,
            type: "scatter",
            mode: "lines",
            name: "MA10",
          },
          {
            x: chart.dates,
            y: chart.ma20,
            type: "scatter",
            mode: "lines",
            name: "MA20",
          },
        ]}
        layout={{
          paper_bgcolor: "#111",
          plot_bgcolor: "#111",
          font: { color: "#fff" },
        }}
      />
    </div>
  );
}