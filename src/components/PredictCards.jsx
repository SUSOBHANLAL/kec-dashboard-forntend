const ALGO_CONFIG = [
  {
    key:   "arima",
    label: "ARIMA",
    color: "#3b82f6",
    badge: "bg-blue-950 text-blue-400 border border-blue-900",
  },
  {
    key:   "random_forest",
    label: "Random Forest",
    color: "#22c55e",
    badge: "bg-green-950 text-green-400 border border-green-900",
  },
  {
    key:   "lstm",
    label: "LSTM",
    color: "#a855f7",
    badge: "bg-purple-950 text-purple-400 border border-purple-900",
  },
];

function fmtPrice(v) {
  return parseFloat(v).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function StatChip({ label, value }) {
  return (
    <div className="flex-1 bg-[#181c22] border border-[#2a2f38] rounded-md py-2 text-center">
      <p className="text-[10px] text-[#5a6070] uppercase tracking-widest">{label}</p>
      <p className="text-[13px] font-medium font-mono text-[#e8eaf0] mt-0.5">₹{value}</p>
    </div>
  );
}

export default function PredictCards({ models }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {ALGO_CONFIG.map((cfg) => {
        const preds = models[cfg.key];

        if (!preds || !preds.length) {
          return (
            <div key={cfg.key} className="bg-[#111418] border border-[#2a2f38] rounded-xl p-4">
              <p className="text-[13px] font-medium mb-1">{cfg.label}</p>
              <p className="text-[12px] text-[#5a6070]">No data available</p>
            </div>
          );
        }

        const avg  = preds.reduce((a, b) => a + b, 0) / preds.length;
        const minV = Math.min(...preds);
        const maxV = Math.max(...preds);

        return (
          <div key={cfg.key} className="bg-[#111418] border border-[#2a2f38] rounded-xl p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-medium">{cfg.label}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium ${cfg.badge}`}>
                {preds.length} steps
              </span>
            </div>

            {/* Step rows */}
            <div className="space-y-1.5 mb-3">
              {preds.map((v, i) => {
                const pct = maxV > minV
                  ? ((v - minV) / (maxV - minV)) * 100
                  : 50;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-[#181c22] border border-[#2a2f38] rounded-md px-3 py-1.5"
                  >
                    <span className="text-[11px] text-[#5a6070] font-mono w-7">T+{i + 1}</span>
                    <div className="flex-1 h-[3px] bg-[#1e2229] rounded overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${Math.max(4, pct)}%`,
                          background: cfg.color + "44",
                          borderRight: `2px solid ${cfg.color}`,
                        }}
                      />
                    </div>
                    <span className="text-[13px] font-medium font-mono text-[#e8eaf0] text-right w-24">
                      ₹{fmtPrice(v)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Stat chips */}
            <div className="flex gap-2">
              <StatChip label="Avg" value={avg.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} />
              <StatChip label="Low" value={minV.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} />
              <StatChip label="High" value={maxV.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
