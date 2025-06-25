import React from 'react';

export default function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex justify-center my-8 ${className}`} aria-label="Loading">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent" />
    </div>
  )
}