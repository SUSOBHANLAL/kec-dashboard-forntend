function Card({ label, value, sub, subColor }) {
  return (
    <div className="bg-[#111418] border border-[#2a2f38] rounded-xl px-4 py-4">
      <p className="text-[11px] text-[#5a6070] tracking-widest uppercase mb-1.5">{label}</p>
      <p className="text-[22px] font-bold font-mono leading-none">{value}</p>
      {sub && (
        <p className={`text-[12px] font-mono mt-1 ${subColor || "text-[#8b92a0]"}`}>{sub}</p>
      )}
    </div>
  );
}

export default function SummaryCards({ data, volatility }) {
  const chg   = parseFloat(data.change_pct);
  const isPos = chg >= 0;
  const fmt   = (v) => parseFloat(v).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const latestVol = volatility?.slice(-1)[0]?.toFixed(4) ?? "—";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Card
        label="Current Price"
        value={`₹${fmt(data.price)}`}
        sub={`${isPos ? "+" : ""}${chg.toFixed(2)}%`}
        subColor={isPos ? "text-green-400" : "text-red-400"}
      />
      <Card
        label="52W High"
        value={`₹${fmt(data.high_52w)}`}
        sub="Resistance zone"
      />
      <Card
        label="52W Low"
        value={`₹${fmt(data.low_52w)}`}
        sub="Support zone"
      />
      <Card
        label="Volatility"
        value={latestVol}
        sub="Std deviation (latest)"
      />
    </div>
  );
}
