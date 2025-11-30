import React, { useState } from "react";
import UploadCard from "../components/UploadCard.jsx";
import ResultCard from "../components/ResultCard.jsx";

export default function ImageDetectPage({ token }) {
  const [result, setResult] = useState(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#3B2A1B]">Image analysis</h2>
      <p className="text-sm text-[#8C7457]">
        Upload a face image. The system will check for signs of AI-generated or
        manipulated content.
      </p>
      <UploadCard mode="image" onResult={setResult} token={token} />
      <ResultCard result={result} />
    </div>
  );
}
