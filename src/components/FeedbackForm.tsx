'use client';

import { useState } from 'react';

export default function FeedbackForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('https://formspree.io/f/xkgbelwb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, message }),
    });

    if (res.ok) {
      setStatus('✅ Feedback sent successfully!');
      setEmail('');
      setMessage('');
    } else {
      setStatus('❌ Failed to send feedback. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 dark:bg-zinc-800 p-6 rounded-xl shadow-xl space-y-4 max-w-md mx-auto mt-10"
    >
      <h2 className="text-xl font-semibold text-center text-zinc-900 dark:text-white">📝 Send Feedback</h2>

      <input
        type="email"
        placeholder="Your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-zinc-700 dark:text-white"
      />

      <textarea
        placeholder="Your message"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-zinc-700 dark:text-white h-24"
      />

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full"
      >
        🚀 Submit Feedback
      </button>

      {status && <p className="text-center text-sm pt-2">{status}</p>}
    </form>
  );
}
