const NAV_ITEMS = [
  { label: "Dashboard",    icon: "grid"   },
  { label: "Live Forecast", icon: "wave"  },
  { label: "Model Arena",   icon: "radar" },
  { label: "Reports",       icon: "chat"  },
];

function Icon({ name }) {
  if (name === "grid")
    return <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
  if (name === "wave")
    return <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
  if (name === "radar")
    return <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 0 0 4.93 19.07M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>;
  return <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}

export default function Sidebar({ tickers, activeTicker, onSelect }) {
  return (
    <aside className="w-[220px] min-w-[220px] bg-[#111418] border-r border-[#2a2f38] flex flex-col">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-[#2a2f38] text-[15px] font-bold tracking-wide">
        <span className="text-green-400 font-mono">◈</span> MarketLens
      </div>

      {/* Nav */}
      <div className="px-2 pt-4">
        <p className="px-2 mb-2 text-[10px] text-[#5a6070] tracking-widest uppercase">Navigation</p>
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item.label}
            className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-[13px] mb-0.5 transition-colors
              ${i === 0
                ? "bg-[#1e2229] text-[#e8eaf0] border border-[#2a2f38]"
                : "text-[#8b92a0] hover:bg-[#181c22] hover:text-[#e8eaf0]"}`}
          >
            <Icon name={item.icon} />
            {item.label}
          </button>
        ))}
      </div>

      {/* Watchlist */}
      <div className="px-2 mt-auto pb-3 border-t border-[#2a2f38] pt-3">
        <p className="px-2 mb-2 text-[10px] text-[#5a6070] tracking-widest uppercase">Watchlist</p>
        {tickers.map((t) => (
          <button
            key={t.symbol}
            onClick={() => onSelect(t.symbol)}
            className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-md text-[12px] font-mono mb-0.5 transition-colors
              ${t.symbol === activeTicker
                ? "bg-[#1e2229] border border-[#3a4050]"
                : "hover:bg-[#181c22] border border-transparent"}`}
          >
            <span className="text-[#e8eaf0] font-medium">{t.symbol}</span>
            <span className={t.pos ? "text-green-400" : "text-red-400"}>{t.chg}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
