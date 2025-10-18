import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the nginx proxy to backend
      const response = await fetch('/api/message');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setQuote(data.message);
    } catch (err) {
      console.error('Error fetching quote:', err);
      setError('Failed to load motivational quote. Please try again.');
      setQuote('Stay positive and keep coding!'); // Fallback quote
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 p-8 text-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Daily Motivation</h1>
            <div className="w-16 h-1 bg-soft-blue mx-auto rounded-full"></div>
          </div>
          
          <div className="min-h-[120px] flex items-center justify-center">
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-soft-blue"></div>
                <span className="text-gray-600">Loading your daily motivation...</span>
              </div>
            ) : (
              <blockquote className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
                "{quote}"
              </blockquote>
            )}
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={fetchQuote}
              disabled={loading}
              className="bg-soft-blue hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>New Quote</span>
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">— Powered by FastAPI</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;