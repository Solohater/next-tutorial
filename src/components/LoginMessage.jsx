'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginMessage() {
  const params = useSearchParams();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setError(params.get("error") || "");
    setSuccess(params.get("success") || "");
  }, [params]);

  return (
    <div>
      {success && <h1 className="text-green-600 text-xl">{success}</h1>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}