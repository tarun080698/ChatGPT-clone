import React from "react";

export default function Loading() {
  return (
    <div className="flex place-items-center m-auto gap-2">
      <div className="w-3 h-3 rounded-full animate-pulse bg-gray-500"></div>
      <div className="w-3 h-3 rounded-full animate-pulse bg-gray-500"></div>
      <div className="w-3 h-3 rounded-full animate-pulse bg-gray-500"></div>
    </div>
  );
}
