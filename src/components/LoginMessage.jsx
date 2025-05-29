"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const LoginMessage = () => {
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError(params.get("error") || "");
    setSuccess(params.get("success") || "");
  }, [params]);

  return (
    <div>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginMessage;