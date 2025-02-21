// src/components/Logout.tsx
"use client"
import { signOut } from "next-auth/react";
import federatedLogout from "@/utils/federatedLogout";

export default function Logout() {
  return <button className="flex p-2 bg-red-600 rounded-md mt-8" onClick={() => federatedLogout()}>
    Signout of keycloak
  </button>
}