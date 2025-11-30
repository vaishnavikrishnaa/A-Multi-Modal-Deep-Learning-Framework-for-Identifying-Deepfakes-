import React from "react";

export default function HomePage() {
  return (
    <div className="space-y-10">

      {/* HERO SECTION */}
      <section className="section-bg rounded-3xl p-10 border border-gray-200 shadow-sm">
        <h1 className="heading">
          DeepFake Detection: <span className="magenta-text">Identify Real vs Fake</span>
        </h1>

        <p className="text-lg leading-relaxed text-gray-700 max-w-4xl">
          DeepFake Detection is a technology that analyzes photos and videos to check whether
          they are authentic or artificially manipulated using Artificial Intelligence.
          Our tool helps everyday users, journalists, teachers, professionals, and
          organizations protect themselves from fake digital content.
        </p>
      </section>

      {/* WHY DEEPFAKE DETECTION MATTERS */}
      <section className="card">
        <h2 className="text-2xl font-semibold mb-3 gold-text">
          Why is DeepFake Detection Important?
        </h2>

        <p className="text-gray-700 leading-relaxed">
          Deepfakes are becoming extremely realistic and easy to create. People can use
          someone’s face or voice to generate videos or photos that never actually happened.
          This can lead to misinformation, political manipulation, scams, impersonation,
          privacy invasion, embarrassment, and emotional harm.  
          <br /><br />
          Detecting deepfakes is important because it helps:
        </p>

        <ul className="list-disc ml-6 mt-3 text-gray-700 leading-relaxed">
          <li>Protect individuals from identity misuse or defamation</li>
          <li>Prevent fake news and misleading information</li>
          <li>Help companies identify fraudulent media</li>
          <li>Assist law enforcement in digital investigations</li>
          <li>Maintain trust in social media and online communication</li>
          <li>Educate people about digital safety and awareness</li>
        </ul>
      </section>

      {/* WHERE CAN IT BE USED */}
      <section className="card">
        <h2 className="text-2xl font-semibold mb-3 magenta-text">
          Where Can DeepFake Detection Be Used?
        </h2>

        <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
          <li>Social media platforms (Instagram, Snapchat, TikTok)</li>
          <li>Corporate identity verification systems</li>
          <li>Online examinations and interview platforms</li>
          <li>Journalism and media verification</li>
          <li>Law enforcement and digital forensics</li>
          <li>Cybercrime investigations</li>
          <li>Educational institutions spreading awareness</li>
          <li>Video conferencing tools detecting fake participants</li>
        </ul>
      </section>

      {/* HOW YOUR PROJECT WORKS */}
      <section className="card">
        <h2 className="text-2xl font-semibold mb-3 gold-text">
          How Does Our DeepFake Detection Work?
        </h2>

        <p className="text-gray-700 leading-relaxed">
          When you upload an image or video, our system analyzes facial features,
          skin texture, image sharpness, lighting consistency, and various visual patterns.
          The model used in this project is built using:
        </p>

        <ul className="list-disc ml-6 mt-3 text-gray-700 leading-relaxed">
          <li><strong>Face Detection</strong> using the MTCNN model</li>
          <li><strong>Feature Extraction</strong> using EfficientNet-B4</li>
          <li><strong>AI Classification</strong> to determine REAL vs FAKE</li>
          <li><strong>Frame-by-frame Analysis</strong> for videos</li>
          <li><strong>Confidence Scores</strong> to show how sure the model is</li>
          <li><strong>Reasoning Explanation</strong> in simple English</li>
        </ul>

        <p className="text-gray-700 mt-4 leading-relaxed">
          Unlike many research tools that are difficult for beginners,
          this project is built to be simple, clean, and user-friendly.
          Whether you're a student, a parent, a professional, or just a curious user,
          you can easily upload content and understand the result.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 mt-10 py-4">
        © {new Date().getFullYear()} DeepFake Detection — Built with AI, Ethics, and Safety in Mind
      </footer>

    </div>
  );
}
