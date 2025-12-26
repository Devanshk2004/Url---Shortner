"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [analyticsId, setAnalyticsId] = useState("");
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handler to generate a short URL
  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      setTimeout(() => {
        const mockId = Math.random().toString(36).substring(7);
        setShortUrl(`${window.location.host}/${mockId}`);
        setLoading(false);
      }, 1000);

    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
      setLoading(false);
    }
  };

  const handleAnalytics = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setVisitCount(null);

    try {
      setTimeout(() => {
        setVisitCount(42);
        setLoading(false);
      }, 1000);

    } catch (err) {
      setError("Failed to fetch analytics.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-gray-800 font-sans">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-2">Url_Shortner</h1>
          <p className="text-gray-500">Shorten your links and track their clicks.</p>
        </div>

        {/* SECTION 1: Shorten URL */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Generate Short URL</h2>
          <form onSubmit={handleShorten} className="space-y-4">
            <div>
              <input
                type="url"
                required
                placeholder="Enter your long URL here (e.g., https://github.com/...)"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-200 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Shorten URL"}
            </button>
          </form>

          {/* Result Display */}
          {shortUrl && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md text-center">
              <p className="text-sm text-green-800 mb-1">Success! Here is your short URL:</p>
              <div className="flex items-center justify-center gap-2">
                <a 
                  href={`http://${shortUrl}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-blue-600 underline break-all"
                >
                  {shortUrl}
                </a>
                <button 
                  onClick={() => navigator.clipboard.writeText(shortUrl)}
                  className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200"></div>

        {/* SECTION 2: Analytics */}
        <div className="p-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Check Analytics</h2>
          <form onSubmit={handleAnalytics} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="Enter Short ID (e.g. xyz123)"
              value={analyticsId}
              onChange={(e) => setAnalyticsId(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold px-6 py-3 rounded-md transition duration-200 disabled:opacity-50"
            >
              Check
            </button>
          </form>

          {/* Analytics Result */}
          {visitCount !== null && (
            <div className="mt-4 text-center">
              <div className="inline-block p-4 bg-purple-50 rounded-full border border-purple-100">
                <span className="text-gray-500 text-sm block">Total Visits</span>
                <span className="text-3xl font-bold text-purple-600">{visitCount}</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}