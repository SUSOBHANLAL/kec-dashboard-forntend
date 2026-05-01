


// import { useState } from "react";

// const MODELS = [
//   { value: "arima", label: "ARIMA"         },
//   { value: "rf",    label: "Random Forest" },
//   { value: "lstm",  label: "LSTM"          },
// ];

// export default function Topbar({ ticker, model, onSearch, onModelChange, onRefresh }) {
//   const [query, setQuery] = useState("");

//   const handleSearch = (e) => {
//     if (e.key === "Enter" && query.trim()) {
//       onSearch(query.trim().toUpperCase());
//       setQuery("");
//     }
//   };

//   return (
//     <header className="h-[54px] bg-[#111418] border-b border-[#2a2f38] flex items-center px-5 gap-3 flex-shrink-0">
//       {/* Search */}
//       <div className="relative flex-1 max-w-xs">
//         <input
//           className="w-full bg-[#181c22] border border-[#2a2f38] rounded-lg px-3 py-1.5 text-[13px] text-[#e8eaf0] placeholder-[#5a6070] outline-none focus:border-[#3a4050] font-sans"
//           placeholder="Search ticker… (press Enter)"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyDown={handleSearch}
//         />
//       </div>

//       {/* Active ticker */}
//       <span className="font-mono text-[13px] text-[#8b92a0] px-2">{ticker}.NS</span>

//       {/* Model tabs */}
//       <div className="flex gap-1 bg-[#181c22] p-0.5 rounded-lg border border-[#2a2f38]">
//         {MODELS.map((m) => (
//           <button
//             key={m.value}
//             onClick={() => onModelChange(m.value)}
//             className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors font-sans
//               ${model === m.value
//                 ? "bg-[#1e2229] text-[#e8eaf0] border border-[#3a4050]"
//                 : "text-[#8b92a0] hover:text-[#e8eaf0]"}`}
//           >
//             {m.label}
//           </button>
//         ))}
//       </div>

//       {/* Refresh */}
//       <button
//         onClick={onRefresh}
//         className="flex items-center gap-1.5 px-3 py-1.5 border border-[#2a2f38] rounded-lg text-[12px] text-[#8b92a0] hover:text-[#e8eaf0] hover:border-[#3a4050] transition-colors font-sans"
//       >
//         <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
//           <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
//         </svg>
//         Refresh
//       </button>

//       {/* Live indicator */}
//       <div className="flex items-center gap-1.5 text-[12px] text-[#8b92a0]">
//         <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
//         Live
//       </div>
//     </header>
//   );
// }




import { useState } from "react";

const MODELS = [
  { value: "arima", label: "ARIMA"         },

];

export default function Topbar({ ticker, model, onSearch, onModelChange, onRefresh }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      onSearch(query.trim().toUpperCase());
      setQuery("");
    }
  };

  return (
    <header className="h-[54px] bg-[#111418] border-b border-[#2a2f38] flex items-center px-5 gap-3 flex-shrink-0">
      {/* Search */}
      <div className="relative flex-1 max-w-xs">
        <input
          className="w-full bg-[#181c22] border border-[#2a2f38] rounded-lg px-3 py-1.5 text-[13px] text-[#e8eaf0] placeholder-[#5a6070] outline-none focus:border-[#3a4050] font-sans"
          placeholder="Search ticker… (press Enter)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      {/* Active ticker */}
      <span className="font-mono text-[13px] text-[#8b92a0] px-2">{ticker}.NS</span>

      {/* Model tabs */}
      <div className="flex gap-1 bg-[#181c22] p-0.5 rounded-lg border border-[#2a2f38]">
        {MODELS.map((m) => (
          <button
            key={m.value}
            onClick={() => onModelChange(m.value)}
            className={`px-3 py-1 rounded-md text-[12px] font-medium transition-colors font-sans
              ${model === m.value
                ? "bg-[#1e2229] text-[#e8eaf0] border border-[#3a4050]"
                : "text-[#8b92a0] hover:text-[#e8eaf0]"}`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Refresh */}
      <button
        onClick={onRefresh}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-[#2a2f38] rounded-lg text-[12px] text-[#8b92a0] hover:text-[#e8eaf0] hover:border-[#3a4050] transition-colors font-sans"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
        </svg>
        Refresh
      </button>

      {/* Live indicator */}
      <div className="flex items-center gap-1.5 text-[12px] text-[#8b92a0]">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        Live
      </div>
    </header>
  );
}
