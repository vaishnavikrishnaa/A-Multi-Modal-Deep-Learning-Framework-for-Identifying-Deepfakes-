import React, { useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ UPDATED HANDLE SUBMIT (JSON BASED LOGIN)
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Login failed");
      }

      onLoginSuccess(data.access_token, data.user.email);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white border border-[#E5D3BD] rounded-3xl p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-[#3B2A1B] mb-2">
        Login to continue
      </h2>
      <p className="text-sm text-[#8C7457] mb-5">
        Use your registered email and password to access DeepFake analysis.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#5C4631] mb-1">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full rounded-xl border border-[#E5D3BD] px-3 py-2 text-sm bg-[#FFFDF8] focus:outline-none focus:ring-2 focus:ring-[#F3D9A4]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#5C4631] mb-1">
            Password
          </label>
          <input
            type="password"
            required
            className="w-full rounded-xl border border-[#E5D3BD] px-3 py-2 text-sm bg-[#FFFDF8] focus:outline-none focus:ring-2 focus:ring-[#F3D9A4]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-2.5 rounded-xl text-sm font-medium bg-[#C9A227] text-white hover:bg-[#B48C1D] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
