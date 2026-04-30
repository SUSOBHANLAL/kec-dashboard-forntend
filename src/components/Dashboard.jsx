import { useEffect, useState } from "react";
import axios from "axios";
import PriceChart from "./PriceChart";
import ForecastChart from "./ForecastChart";
import SummaryCards from "./SummaryCards";

const API = "http://127.0.0.1:5000/api/v1/forecast";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [ticker, setTicker] = useState("TCS");
  const [model, setModel] = useState("arima");

  useEffect(() => {
    axios
      .get(`${API}?ticker=${ticker}&model=${model}`)
      .then((res) => setData(res.data));
  }, [ticker, model]);

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{data.ticker} Dashboard</h1>

        <div className="flex gap-3">
          <select onChange={(e) => setTicker(e.target.value)}
                  className="bg-gray-800 p-2 rounded">
            {["HLL","TCS","RELIANCE","MSFT","HDBK"].map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <select onChange={(e) => setModel(e.target.value)}
                  className="bg-gray-800 p-2 rounded">
            <option value="arima">ARIMA</option>
            <option value="rf">Random Forest</option>
          </select>
        </div>
      </div>

      {/* Summary */}
      <SummaryCards data={data.summary} />

      {/* Charts */}
      {/* <div className="grid grid-cols-2 gap-6">
        <PriceChart chart={data.chart} />
        <ForecastChart forecast={data.forecast} />
      </div> */}

      {/* Volatility */}
      <div className="bg-gray-900 p-4 rounded-xl">
        <h2 className="mb-2">Volatility</h2>
        <div className="text-sm text-gray-400">
          Latest: {data.volatility.slice(-1)[0].toFixed(4)}
        </div>
      </div>

    </div>
  );
}