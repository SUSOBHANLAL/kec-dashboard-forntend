const ALGO_CONFIG = [
  { key: "arima",         label: "ARIMA",         color: "#3b82f6" },
  { key: "random_forest", label: "Random Forest",  color: "#22c55e" },
  { key: "lstm",          label: "LSTM",           color: "#a855f7" },
];

export default function ModelConsensus({ models }) {
  const avgs = ALGO_CONFIG.map(({ key }) => {
    const preds = models[key];
    if (!preds || !preds.length) return null;
    return preds.reduce((a, b) => a + b, 0) / preds.length;
  });

  const valid  = avgs.filter((v) => v !== null);
  const maxAvg = Math.max(...valid);
  const minAvg = Math.min(...valid);

  return (
    <div className="bg-[#111418] border border-[#2a2f38] rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] font-medium">Model Consensus</p>
        <span className="text-[11px] text-[#5a6070]">avg. prediction comparison</span>
      </div>

      <div className="space-y-3">
        {ALGO_CONFIG.map(({ key, label, color }, i) => {
          const avg = avgs[i];
          if (avg === null) return null;

          const pct = maxAvg > minAvg
            ? ((avg - minAvg) / (maxAvg - minAvg)) * 100
            : 50;

          return (
            <div key={key} className="grid items-center gap-3" style={{ gridTemplateColumns: "110px 1fr 90px" }}>
              <span className="text-[12px] font-mono" style={{ color }}>{label}</span>
              <div className="h-1.5 bg-[#181c22] rounded overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-500"
                  style={{ width: `${Math.max(4, pct)}%`, background: color }}
                />
              </div>
              <span className="text-[12px] font-mono text-right text-[#e8eaf0]">
                ₹{avg.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
