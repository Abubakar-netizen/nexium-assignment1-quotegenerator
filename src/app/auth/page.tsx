'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabaseClient';

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === 'SIGNED_IN') {
        router.push('/'); // Redirect after login
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-black relative">
      {/* Online background image */}
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1650&q=80')`,
        }}
      ></div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          🔐 Sign in or Sign up
        </h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={['google']}
        />
      </div>
    </div>
  );
}
