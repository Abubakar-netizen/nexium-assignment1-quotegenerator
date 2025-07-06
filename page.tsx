'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import MoodDetector from '@/components/MoodDetector';
import QuoteForm from '@/components/QuoteForm';
import QuoteList from '@/components/QuoteList';
import { quotes as allQuotes } from '@/data/quotes';
import ThemeToggle from '@/components/ThemeToggle';
import FeedbackForm from '@/components/FeedbackForm';
import { getDailyQuote } from '@/utils/getDailyQuote';

export default function Home() {
  const router = useRouter();
  const dailyQuote = getDailyQuote();

  const [results, setResults] = useState<{ text: string; author: string }[]>([]);
  const [user, setUser] = useState<any>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [showMoodDetector, setShowMoodDetector] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push('/auth');
      } else {
        setUser(data.user);
      }
    };
    checkAuth();
  }, [router]);

  const getQuotes = (topic: string) => {
    const match = allQuotes
      .filter((q) => q.topic === topic)
      .map((q) => ({ text: q.text, author: q.author }));

    setResults(match.slice(0, 3));
  };

  const getRandomQuote = () => {
    const shuffled = allQuotes.sort(() => 0.5 - Math.random());
    setResults(shuffled.slice(0, 1));
  };

  const clearQuotes = () => {
    setResults([]);
  };

  const handleMood = (detectedMood: string) => {
    setMood(detectedMood);

    const matchedQuotes = allQuotes
      .filter((q) => q.topic.toLowerCase().includes(detectedMood.toLowerCase()))
      .map((q) => ({ text: q.text, author: q.author }));

    if (matchedQuotes.length > 0) {
      setResults(matchedQuotes.slice(0, 3));
    }
  };

  return (
    <main className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-hidden">
      <img
        src="/background.jpg"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover brightness-50 z-0"
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-black/40 dark:bg-white/10 backdrop-blur sticky top-0 z-20 px-6 py-4 shadow flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-white dark:text-white">
            💬 Quote Generator
          </h1>
          <div className="flex gap-4 items-center">
            <ThemeToggle />
            {user ? (
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  setUser(null);
                  router.push('/auth');
                }}
                className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow"
              >
                Logout
              </button>
            ) : (
              <a
                href="/auth"
                className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow"
              >
                Login
              </a>
            )}
            <a
              href="https://github.com/Abubakar-neitzen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded shadow"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/malik-abubakar-429672315"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded shadow"
            >
              LinkedIn
            </a>
          </div>
        </header>

        {user && (
          <>
            {/* Quote of the Day */}
            <section className="max-w-2xl mx-auto mt-6 px-4 py-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl shadow text-center">
              <h2 className="text-lg font-semibold mb-2">🌞 Quote of the Day</h2>
              <p className="italic text-gray-800 dark:text-white">“{dailyQuote.text}”</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">— {dailyQuote.author}</p>
            </section>

            {/* Content */}
            <section className="max-w-2xl mx-auto py-10 px-4 text-center">
              <p className="text-lg text-white/90 dark:text-white mb-4">
                ✨ Welcome! Select a topic or detect your mood to get inspired.
              </p>

              {/* Toggle Mood Detector */}
              <button
                onClick={() => setShowMoodDetector((prev) => !prev)}
                className="mb-4 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded shadow transition"
              >
                {showMoodDetector ? 'Hide Mood Detector' : '🎭 Detect Mood'}
              </button>

              {/* Conditionally render video */}
              {showMoodDetector && <MoodDetector onMoodDetected={handleMood} />}

              {/* Show detected mood */}
              {mood && (
                <p className="mt-4 text-white text-lg">
                  😊 Detected Mood: <span className="font-bold capitalize">{mood}</span>
                </p>
              )}

              <QuoteForm onSubmit={getQuotes} onClear={clearQuotes} onRandom={getRandomQuote} />
              <QuoteList quotes={results} />
            </section>

            <FeedbackForm />

            <footer className="text-center text-sm py-4 text-white/70 dark:text-gray-400">
              Built with ❤️ by Abubakar Awan
            </footer>
          </>
        )}
      </div>
    </main>
  );
}
