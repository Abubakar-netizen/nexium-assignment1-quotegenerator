'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="bg-white/20 dark:bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded text-sm border border-white/30 hover:scale-105 transition"
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
