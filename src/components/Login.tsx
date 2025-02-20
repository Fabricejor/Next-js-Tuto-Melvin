// src/components/Login.tsx
"use client"
import { signIn } from "next-auth/react";
export default function Login() {
  return <button type="button" className="flex flex-col p-2 bg-cyan-400 rounded text-lg font-bold" onClick={() => signIn("keycloak")}>
    Signin with keycloak
  </button>
}