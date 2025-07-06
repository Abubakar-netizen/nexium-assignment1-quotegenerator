'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuoteList({ quotes }: { quotes: { text: string; author: string }[] }) {
  const [favorites, setFavorites] = useState<{ text: string; author: string }[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const addToFavorites = (quote: { text: string; author: string }) => {
    const updated = [...favorites, quote];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const removeFromFavorites = (quoteToRemove: { text: string; author: string }) => {
    const updated = favorites.filter(
      (q) => q.text !== quoteToRemove.text || q.author !== quoteToRemove.author
    );
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleCopy = (quote: string) => {
    navigator.clipboard.writeText(quote);
    alert('Quote copied!');
  };

  const displayedQuotes = showFavorites ? favorites : quotes;

  return (
    <div className="grid gap-6 p-4 sm:grid-cols-1">
      {displayedQuotes.length === 0 ? (
        <p className="text-center text-gray-500 mt-6 text-lg">
          No quotes found. Try another topic.
        </p>
      ) : (
        <AnimatePresence>
          {displayedQuotes.slice(0, 3).map((quote, index) => (
            <motion.div
              key={quote.text + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white/70 dark:bg-black/60 backdrop-blur border-l-4 border-indigo-500 shadow-xl p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <p className="text-lg text-gray-800 dark:text-gray-200 italic">“{quote.text}”</p>
              <p className="text-sm mt-2 text-right text-gray-500 dark:text-gray-400">— {quote.author}</p>

              {/* Buttons */}
              <div className="mt-2 flex gap-4 items-center">
                {/* 🔊 Listen */}
                <button
                  onClick={() => {
                    const msg = new SpeechSynthesisUtterance(`"${quote.text}" by ${quote.author}`);
                    msg.lang = 'en-US';
                    window.speechSynthesis.cancel();
                    window.speechSynthesis.speak(msg);
                  }}
                  className="text-xs text-purple-600 hover:underline"
                >
                  🔊 Listen
                </button>

                {/* ❤️ Save or 🗑️ Remove */}
                {!showFavorites ? (
                  <button
                    onClick={() => addToFavorites(quote)}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded shadow text-sm transition"
                  >
                    ❤️ Save to Favorites
                  </button>
                ) : (
                  <button
                    onClick={() => removeFromFavorites(quote)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow text-sm transition"
                  >
                    🗑️ Remove
                  </button>
                )}
              </div>

              {/* 📋 Copy (top-right corner) */}
              <button
                onClick={() => handleCopy(`"${quote.text}" — ${quote.author}`)}
                className="absolute top-2 right-2 text-xs bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600"
              >
                Copy
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      {(favorites.length > 0 || showFavorites) && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="text-sm px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700"
          >
            {showFavorites ? '🔙 Back to Results' : '💖 View Favorites'}
          </button>
        </div>
      )}
    </div>
  );
}
