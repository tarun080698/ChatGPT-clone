"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Login() {
  return (
    <div className="bg-[#11a37f] h-screen flex flex-col justify-center items-center">
      <Image
        src={"https://links.papareact.com/2i6"}
        width={300}
        height={300}
        alt="logo"
      />

      <button
        className="text-white font-bold text-3xl animate-pulse"
        onClick={(e) => {
          e.preventDefault();
          signIn("google");
        }}
      >
        Sign in to use ChatGPT
      </button>
    </div>
  );
}
