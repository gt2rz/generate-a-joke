"use client";

import { useState } from "react";

const HomePage = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setResult(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <div className="bg-zinc-950 w-screen h-screen flex justify-center items-center">
      <form onSubmit={onSubmit} className="bg-zinc-900 p-10 w-3/12 rounded-md">
        <h1 className="text-white font-bold text-2xl my-4">Generate a Joke</h1>
        <input
          type="text"
          onChange={(e) => setPrompt(e.target.value)}
          className="p-2 block bg-neutral-700 text-white w-full rounded-md"
          placeholder="Enter a theme"
        />
        <button
          className="text-white bg-green-500 p-2 rounded-md block mt-2 disabled:opacity-50"
          disabled={!prompt || loading}
        >
          {loading ? "Thinking..." : "Generate"}
        </button>
        {result && (
          <p className="text-xl font-bold text-white max-w-s my-10">{result}</p>
        )}
      </form>
    </div>
  );
};

export default HomePage;
