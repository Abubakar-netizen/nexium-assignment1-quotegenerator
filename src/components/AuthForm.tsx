// src/components/AuthForm.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AuthForm({ onAuth }: { onAuth: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      onAuth();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-black p-6 rounded-xl shadow-md max-w-sm mx-auto mt-10 space-y-4">
      <h2 className="text-lg font-semibold text-center text-black dark:text-white">{isLogin ? 'Sign In' : 'Sign Up'}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded shadow"
      >
        {isLogin ? 'Sign In' : 'Sign Up'}
      </button>

      <p
        className="text-sm text-center text-indigo-600 cursor-pointer hover:underline"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
      </p>
    </form>
  );
}
