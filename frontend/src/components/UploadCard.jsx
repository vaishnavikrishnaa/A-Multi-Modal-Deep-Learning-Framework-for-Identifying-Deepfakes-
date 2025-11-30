// frontend/src/components/UploadCard.jsx
import React, { useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

export default function UploadCard({ mode, onResult, token }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isImage = mode === "image";
  const endpoint = isImage ? "/api/detect/image" : "/api/detect/video";

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError("");
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleUpload() {
    if (!selectedFile) {
      setError(`Please choose a ${isImage ? "image" : "video"} first.`);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers,
        body: formData,
      });

      const text = await response.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        // ignore JSON parse error, we'll still show a generic error
      }

      if (!response.ok) {
        throw new Error(data.detail || `Upload failed (${response.status})`);
      }

      onResult({
        label: data.label,
        confidence: data.confidence,
        reasoning: data.reasoning,
      });
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      setError(err.message || "Failed to reach server");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white border border-[#E5D3BD] rounded-2xl p-5 shadow-lg">
      <p className="text-xs uppercase tracking-wide text-[#B1997A] mb-3">
        Upload {isImage ? "Image" : "Video"}
      </p>

      <label className="block border-2 border-dashed border-[#E5D3BD] hover:border-[#C8A96A] transition-colors rounded-2xl p-6 text-center cursor-pointer bg-[#F8F2EA]">
        <input
          type="file"
          accept={isImage ? "image/*" : "video/*"}
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-[#FFF7EC] border border-[#E5D3BD] flex items-center justify-center text-2xl">
            {isImage ? "🖼️" : "🎬"}
          </div>
          <p className="text-sm font-medium text-[#5C4631]">
            {selectedFile ? selectedFile.name : "Click to choose a file"}
          </p>
          <p className="text-xs text-[#8C7457]">
            {isImage ? "JPG · PNG · JPEG" : "MP4 · MOV · AVI"}
          </p>
        </div>
      </label>

      {previewUrl && (
        <div className="mt-4">
          <p className="text-xs text-[#8C7457] mb-1">Preview:</p>
          <div className="rounded-xl overflow-hidden border border-[#E5D3BD] bg-white">
            {isImage ? (
              <img
                src={previewUrl}
                alt="preview"
                className="max-h-72 w-full object-contain"
              />
            ) : (
              <video
                src={previewUrl}
                controls
                className="max-h-72 w-full object-contain"
              />
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
          {error}
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={isLoading}
        className="mt-4 w-full py-2.5 rounded-xl text-sm font-medium 
          bg-[#C8A96A] text-white hover:bg-[#B18F54] 
          disabled:bg-[#D9C7A3]"
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}
