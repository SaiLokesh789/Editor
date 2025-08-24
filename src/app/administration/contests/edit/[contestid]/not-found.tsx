"use client";
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <svg
          className="h-16 w-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
        >
          <circle cx="24" cy="24" r="22" strokeWidth="4" />
          <path strokeWidth="4" strokeLinecap="round" d="M16 20h16M16 28h16" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contest Not Found</h2>
        <p className="text-gray-500 mb-6 text-center">
          Check the contest ID or try again later.
        </p>
        <button
          onClick={() => router.back()}
          className="inline-block rounded-lg bg-black text-white font-semibold px-6 py-3 hover:bg-gray-900 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}