import React, { useEffect, useState } from "react";

// ⭐ Use 127.0.0.1 — NOT localhost (Fixes fail-to-fetch on Mac)
const API_BASE = "http://127.0.0.1:8000";

export default function HistoryPage({ token }) {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  async function loadHistory() {
    try {
      setError("");

      const res = await fetch(`${API_BASE}/api/history`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      // If backend gives non-JSON on error → prevent crash
      let data = {};
      try {
        data = await res.json();
      } catch (e) {
        throw new Error("Server error");
      }

      if (!res.ok) {
        throw new Error(data.detail || "Failed to load history");
      }

      setHistory(data.history || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  }

  useEffect(() => {
    if (token) {
      loadHistory();
    }
  }, [token]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-[#3B2A1B]">
            Your scan history
          </h2>
          <p className="text-sm text-[#8C7457]">
            Only your own scans are shown here. Other users’ results remain private.
          </p>
        </div>

        <button
          onClick={loadHistory}
          className="px-3 py-1.5 rounded-full border border-[#E5D3BD] bg-white text-xs text-[#7A6246] hover:bg-[#FFF1DD]"
        >
          Refresh
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
          {error}
        </p>
      )}

      {history.length === 0 ? (
        <p className="text-sm text-[#8C7457]">
          No scans yet. Analyze an image or video to see it here.
        </p>
      ) : (
        <div className="space-y-2">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5D3BD] rounded-2xl p-3 flex items-center justify-between shadow-sm"
            >
              <div>
                <p className="text-xs text-[#8C7457]">
                  {item.file_type.toUpperCase()} • {item.filename}
                </p>
                <p className="text-xs text-[#5C4631]">
                  {item.prediction} • {item.confidence.toFixed(2)}%
                </p>
              </div>

              <p className="text-[10px] text-[#B1997A]">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
