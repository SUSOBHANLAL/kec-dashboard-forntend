// import { useEffect, useState, useCallback } from "react";
// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";
// import SummaryCards from "./SummaryCards";
// import PriceChart from "./PriceChart";
// import ForecastChart from "./ForecastChart";
// import PredictCards from "./PredictCards";
// import ModelConsensus from "./ModelConsensus";
// import VolatilityChart from "./VolatilityChart";

// const FORECAST_API = "http://127.0.0.1:5000/api/v1/forecast";
// const PREDICT_API  = "http://127.0.0.1:5000/api/v1/predict-model";

// export const TICKERS = [
//   { symbol: "TCS",      name: "Tata Consult.",       chg: "+1.23%", pos: true  },
//   { symbol: "RELIANCE", name: "Reliance Ind.",        chg: "-0.45%", pos: false },
//   { symbol: "MSFT",     name: "Microsoft",            chg: "+0.87%", pos: true  },
//   { symbol: "HLL",      name: "Hindustan Unilever",   chg: "+0.12%", pos: true  },
//   { symbol: "HDFCBANK", name: "HDFC Bank",            chg: "-0.31%", pos: false },
// ];

// export default function Dashboard() {
//   const [ticker, setTicker]           = useState("TCS");
//   const [model,  setModel]            = useState("arima");
//   const [forecastData, setForecastData] = useState(null);
//   const [predictData,  setPredictData]  = useState(null);
//   const [loading, setLoading]         = useState(false);
//   const [error,   setError]           = useState(null);

//   const fetchAll = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const [fRes, pRes] = await Promise.all([
//         fetch(`${FORECAST_API}?ticker=${ticker}&model=${model}`),
//         fetch(`${PREDICT_API}?ticker=${ticker}`),
//       ]);
//       if (!fRes.ok || !pRes.ok) throw new Error("API error");
//       const [fd, pd] = await Promise.all([fRes.json(), pRes.json()]);
//       setForecastData(fd);
//       setPredictData(pd);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [ticker, model]);

//   useEffect(() => { fetchAll(); }, [fetchAll]);

//   return (
//     <div className="flex h-screen overflow-hidden bg-[#0a0c10] text-[#e8eaf0] font-sans">
//       <Sidebar tickers={TICKERS} activeTicker={ticker} onSelect={setTicker} />

//       <div className="flex flex-col flex-1 min-w-0">
//         <Topbar
//           ticker={ticker}
//           model={model}
//           onSearch={setTicker}
//           onModelChange={setModel}
//           onRefresh={fetchAll}
//         />

//         <main className="flex-1 overflow-y-auto p-5 space-y-5">
//           {loading && (
//             <div className="flex items-center justify-center h-64 gap-3 text-[#8b92a0] text-sm">
//               <span className="w-6 h-6 border-2 border-[#2a2f38] border-t-green-500 rounded-full animate-spin" />
//               Loading market data…
//             </div>
//           )}

//           {error && !loading && (
//             <div className="text-red-400 text-sm px-4 py-3 bg-[#1f0e0e] border border-[#3d1a1a] rounded-lg">
//               Error: {error}
//             </div>
//           )}

//           {!loading && !error && forecastData && predictData && (
//             <>
//               <p className="text-[10px] text-[#5a6070] tracking-widest uppercase">
//                 {ticker} · Overview
//               </p>

//               <SummaryCards data={forecastData.summary} volatility={forecastData.volatility} />

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <PriceChart chart={forecastData.chart} />
//                 <ForecastChart forecast={forecastData.forecast} model={model} />
//               </div>

//               <p className="text-[10px] text-[#5a6070] tracking-widest uppercase pt-1">
//                 Algorithm Comparison · predict-model
//               </p>

//               <PredictCards models={predictData.models} />

//               <ModelConsensus models={predictData.models} />

//               <VolatilityChart volatility={forecastData.volatility} />
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }




import { useEffect, useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import SummaryCards from "./SummaryCards";
import PriceChart from "./PriceChart";
import ForecastChart from "./ForecastChart";
import PredictCards from "./PredictCards";
import ModelConsensus from "./ModelConsensus";
import VolatilityChart from "./VolatilityChart";

const FORECAST_API   = "http://127.0.0.1:5000/api/v1/forecast";
const PREDICT_API    = "http://127.0.0.1:5000/api/v1/predict-model";
const KNOWN_TICKERS  = ["HLL", "TCS", "RELIANCE", "MSFT", "HDBK"];

export const TICKERS = [
  { symbol: "TCS",      name: "Tata Consult.",       chg: "+1.23%", pos: true  },
  { symbol: "RELIANCE", name: "Reliance Ind.",        chg: "-0.45%", pos: false },
  { symbol: "MSFT",     name: "Microsoft",            chg: "+0.87%", pos: true  },
  { symbol: "HLL",      name: "Hindustan Unilever",   chg: "+0.12%", pos: true  },
  { symbol: "HDFCBANK", name: "HDFC Bank",            chg: "-0.31%", pos: false },
];

export default function Dashboard() {
  const [ticker, setTicker]           = useState("TCS");
  const [model,  setModel]            = useState("arima");
  const [forecastData, setForecastData] = useState(null);
  const [predictData,  setPredictData]  = useState(null);
  const [loading, setLoading]         = useState(false);
  const [error,   setError]           = useState(null);

  const fetchAll = useCallback(async () => {
    if (!KNOWN_TICKERS.includes(ticker.toUpperCase())) {
      setError("not_found");
      setForecastData(null);
      setPredictData(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [fRes, pRes] = await Promise.all([
        fetch(`${FORECAST_API}?ticker=${ticker}&model=${model}`),
        fetch(`${PREDICT_API}?ticker=${ticker}`),
      ]);
      if (!fRes.ok || !pRes.ok) throw new Error("API error");
      const [fd, pd] = await Promise.all([fRes.json(), pRes.json()]);
      setForecastData(fd);
      setPredictData(pd);
    } catch (err) {
      setError("api_error");
    } finally {
      setLoading(false);
    }
  }, [ticker, model]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0c10] text-[#e8eaf0] font-sans">
      <Sidebar tickers={TICKERS} activeTicker={ticker} onSelect={setTicker} />

      <div className="flex flex-col flex-1 min-w-0">
        <Topbar
          ticker={ticker}
          model={model}
          onSearch={setTicker}
          onModelChange={setModel}
          onRefresh={fetchAll}
        />

        <main className="flex-1 overflow-y-auto p-5 space-y-5">
          {loading && (
            <div className="flex items-center justify-center h-64 gap-3 text-[#8b92a0] text-sm">
              <span className="w-6 h-6 border-2 border-[#2a2f38] border-t-green-500 rounded-full animate-spin" />
              Loading market data…
            </div>
          )}

          {error === "not_found" && !loading && (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
              <svg className="w-10 h-10 text-[#3a4050]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <div>
                <p className="text-[#e8eaf0] text-[15px] font-medium mb-1">Ticker not found</p>
                <p className="text-[#5a6070] text-[13px]">
                  We currently only have data for:
                </p>
                <div className="flex gap-2 justify-center mt-3 flex-wrap">
                  {KNOWN_TICKERS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTicker(t)}
                      className="px-3 py-1 bg-[#181c22] border border-[#2a2f38] rounded-md font-mono text-[12px] text-[#8b92a0] hover:text-[#e8eaf0] hover:border-[#3a4050] transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {error === "api_error" && !loading && (
            <div className="flex flex-col items-center justify-center h-64 gap-3 text-center">
              <svg className="w-10 h-10 text-[#3a4050]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <div>
                <p className="text-[#e8eaf0] text-[15px] font-medium mb-1">Server unreachable</p>
                <p className="text-[#5a6070] text-[13px]">Make sure your Flask API is running on port 5000.</p>
                <button
                  onClick={fetchAll}
                  className="mt-3 px-4 py-1.5 bg-[#181c22] border border-[#2a2f38] rounded-lg text-[12px] text-[#8b92a0] hover:text-[#e8eaf0] hover:border-[#3a4050] transition-colors font-sans"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {!loading && !error && forecastData && predictData && (
            <>
              <p className="text-[10px] text-[#5a6070] tracking-widest uppercase">
                {ticker} · Overview
              </p>

              <SummaryCards data={forecastData.summary} volatility={forecastData.volatility} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PriceChart chart={forecastData.chart} />
                <ForecastChart forecast={forecastData.forecast} model={model} />
              </div>

              <p className="text-[10px] text-[#5a6070] tracking-widest uppercase pt-1">
                Algorithm Comparison · predict-model
              </p>

              <PredictCards models={predictData.models} />

              <ModelConsensus models={predictData.models} />

              <VolatilityChart volatility={forecastData.volatility} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
