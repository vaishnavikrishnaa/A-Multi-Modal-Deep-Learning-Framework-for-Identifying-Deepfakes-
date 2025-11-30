import React, { useState } from "react";
import UploadCard from "../components/UploadCard.jsx";
import ResultCard from "../components/ResultCard.jsx";

export default function VideoDetectPage({ token }) {
  const [result, setResult] = useState(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#3B2A1B]">Video analysis</h2>
      <p className="text-sm text-[#8C7457]">
        Upload a short video. Key frames will be sampled and analyzed for
        deepfake characteristics.
      </p>
      <UploadCard mode="video" onResult={setResult} token={token} />
      <ResultCard result={result} isVideo />
    </div>
  );
}
