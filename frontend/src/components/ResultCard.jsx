import React from "react";

export default function ResultCard({ result, isVideo = false }) {
  if (!result) return null;

  const { label, confidence, reasoning } = result;

  const isFake = label === "FAKE";
  const barWidth = `${confidence}%`;

  return (
    <div className="mt-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            {isVideo ? "Video Analysis Result" : "Image Analysis Result"}
          </p>
          <h2 className="text-xl font-semibold mt-1 flex items-center gap-2">
            {label === "FAKE" ? "⚠️ Deepfake Likely" : "✅ Looks Real"}
          </h2>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            isFake
              ? "bg-red-500/20 text-red-400 border border-red-500/40"
              : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
          }`}
        >
          {label} • {confidence.toFixed(2)}%
        </span>
      </div>

      {/* Confidence bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Confidence</span>
          <span>{confidence.toFixed(2)}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className={`h-2 transition-all duration-500 ${
              isFake ? "bg-red-500" : "bg-emerald-500"
            }`}
            style={{ width: barWidth }}
          />
        </div>
      </div>

      {/* Reasoning */}
      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-1">
          Reasoning
        </p>
        <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
          {reasoning}
        </p>
      </div>
    </div>
  );
}
