import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage.jsx";
import ImageDetectPage from "./pages/ImageDetectPage.jsx";
import VideoDetectPage from "./pages/VideoDetectPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

const TABS = {
  HOME: "home",
  IMAGE: "image",
  VIDEO: "video",
  HISTORY: "history",
  LOGIN: "login",
  REGISTER: "register",
};

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS.HOME);
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  // Load auth info from localStorage on start
  useEffect(() => {
    const savedToken = localStorage.getItem("df_token");
    const savedEmail = localStorage.getItem("df_email");
    if (savedToken && savedEmail) {
      setToken(savedToken);
      setUserEmail(savedEmail);
    }
  }, []);

  function handleLoginSuccess(newToken, email) {
    setToken(newToken);
    setUserEmail(email);
    localStorage.setItem("df_token", newToken);
    localStorage.setItem("df_email", email);
    setActiveTab(TABS.IMAGE);
  }

  function handleLogout() {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem("df_token");
    localStorage.removeItem("df_email");
    setActiveTab(TABS.HOME);
  }

  function goToProtected(tabKey) {
    if (!token) {
      alert("Please log in to use DeepFake analysis.");
      setActiveTab(TABS.LOGIN);
      return;
    }
    setActiveTab(tabKey);
  }

  const renderPage = () => {
    switch (activeTab) {
      case TABS.IMAGE:
        return <ImageDetectPage token={token} />;
      case TABS.VIDEO:
        return <VideoDetectPage token={token} />;
      case TABS.HISTORY:
        return <HistoryPage token={token} />;
      case TABS.LOGIN:
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case TABS.REGISTER:
        return <RegisterPage onRegistered={() => setActiveTab(TABS.LOGIN)} />;
      case TABS.HOME:
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#5C4631] flex flex-col">
      {/* Top navbar */}
      <header className="border-b border-[#E5D3BD] bg-white/90 backdrop-blur sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#F3D9A4] to-[#E5B97A] flex items-center justify-center text-lg font-bold text-[#5C4631] shadow-sm">
              DF
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[#3B2A1B]">
                DeepFake Detection
              </h1>
              <p className="text-xs text-[#8C7457]">
                Secure AI-based media authenticity checker
              </p>
            </div>
          </div>

          {/* Nav buttons */}
          <nav className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setActiveTab(TABS.HOME)}
              className={`px-3 py-1.5 rounded-full border text-xs ${
                activeTab === TABS.HOME
                  ? "bg-[#F3D9A4] border-[#E5B97A] text-[#3B2A1B]"
                  : "bg-white border-[#E5D3BD] text-[#7A6246] hover:bg-[#FFF1DD]"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => goToProtected(TABS.IMAGE)}
              className={`px-3 py-1.5 rounded-full border text-xs ${
                activeTab === TABS.IMAGE
                  ? "bg-[#F3D9A4] border-[#E5B97A] text-[#3B2A1B]"
                  : "bg-white border-[#E5D3BD] text-[#7A6246] hover:bg-[#FFF1DD]"
              }`}
            >
              Image
            </button>
            <button
              onClick={() => goToProtected(TABS.VIDEO)}
              className={`px-3 py-1.5 rounded-full border text-xs ${
                activeTab === TABS.VIDEO
                  ? "bg-[#F3D9A4] border-[#E5B97A] text-[#3B2A1B]"
                  : "bg-white border-[#E5D3BD] text-[#7A6246] hover:bg-[#FFF1DD]"
              }`}
            >
              Video
            </button>
            <button
              onClick={() => goToProtected(TABS.HISTORY)}
              className={`px-3 py-1.5 rounded-full border text-xs ${
                activeTab === TABS.HISTORY
                  ? "bg-[#F3D9A4] border-[#E5B97A] text-[#3B2A1B]"
                  : "bg-white border-[#E5D3BD] text-[#7A6246] hover:bg-[#FFF1DD]"
              }`}
            >
              History
            </button>

            {/* Auth area */}
            {token ? (
              <div className="flex items-center gap-2 ml-2">
                <span className="text-[11px] text-[#8C7457] truncate max-w-[120px]">
                  {userEmail}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-full border border-[#E0C39F] bg-white text-[11px] hover:bg-[#FFEFD7]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() => setActiveTab(TABS.LOGIN)}
                  className={`px-3 py-1.5 rounded-full border text-[11px] ${
                    activeTab === TABS.LOGIN
                      ? "bg-[#F3D9A4] border-[#E5B97A] text-[#3B2A1B]"
                      : "bg-white border-[#E5D3BD] text-[#7A6246] hover:bg-[#FFF1DD]"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab(TABS.REGISTER)}
                  className={`px-3 py-1.5 rounded-full border text-[11px] ${
                    activeTab === TABS.REGISTER
                      ? "bg-[#EBD2F5] border-[#D9A7E0] text-[#4A314A]"
                      : "bg-white border-[#E5D3BD] text-[#7A6246] hover:bg-[#FDEBFF]"
                  }`}
                >
                  Register
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-8">{renderPage()}</div>
      </main>

      <footer className="border-t border-[#E5D3BD] py-3 text-center text-[11px] text-[#8C7457] bg-white/70">
        DeepFake Detection • Secure media analysis • Local demo
      </footer>
    </div>
  );
}
