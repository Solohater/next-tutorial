'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import LoginMessage from '@/components/LoginMessage';

function LoginPageContent() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setError(searchParams.get('error') || '');
    setSuccess(searchParams.get('success') || '');
  }, [searchParams]);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn('credentials', {
      email,
      password,
    });
  };

  return (
    <div className={styles.container}>
      <LoginMessage />
      <h1 className={styles.title}>{success || 'Welcome Back'}</h1>
      <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button className={styles.button}>Login</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>

      <button
        onClick={() => signIn('google')}
        className={'${styles.button} ${styles.google}'}
      >
        Login with Google
      </button>

      <span className={styles.or}>- OR -</span>

      <Link className={styles.link} href="/dashboard/register">
        Create new account
      </Link>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login page...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}