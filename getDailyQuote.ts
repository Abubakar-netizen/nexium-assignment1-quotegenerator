// src/utils/getDailyQuote.ts
import { quotes } from '@/data/quotes';

export function getDailyQuote() {
  const today = new Date().toISOString().slice(0, 10); // format: YYYY-MM-DD
  let hash = 0;

  for (let i = 0; i < today.length; i++) {
    hash += today.charCodeAt(i);
  }

  const index = hash % quotes.length;
  return quotes[index];
}
