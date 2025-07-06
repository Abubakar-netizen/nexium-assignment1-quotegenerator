'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const topics = [
  'success', 'life', 'motivation', 'discipline', 'dreams', 'education',
  'courage', 'failure', 'happiness', 'leadership', 'focus', 'growth'
];

export default function QuoteForm({
  onSubmit,
  onClear,
  onRandom,
}: {
  onSubmit: (topic: string) => void;
  onClear: () => void;
  onRandom: () => void;
}) 
{
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTopic) onSubmit(selectedTopic);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center px-4">
      <Select onValueChange={setSelectedTopic}>
        <SelectTrigger className="w-[260px]">
          <SelectValue placeholder="🌟 Choose a topic…" />
        </SelectTrigger>
        <SelectContent>
          {topics.map((topic) => (
            <SelectItem key={topic} value={topic}>
              {topic.charAt(0).toUpperCase() + topic.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="submit" disabled={!selectedTopic}>🎯 Get Inspiration</Button>
<Button type="button" variant="outline" onClick={onClear}>🧹 Clear</Button>
<Button type="button" variant="secondary" onClick={onRandom}>🎲 Inspire Me</Button>

    </form>
  );
}
export function QuoteFormClear({ onClear }: { onClear: () => void }) {
  return (
    <Button type="button" variant="outline" onClick={onClear} className="mt-4">
      🧹 Clear
    </Button>
  );
}