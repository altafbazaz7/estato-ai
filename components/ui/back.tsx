"use client"
import { ArrowLeft } from 'lucide-react';
import React from 'react';

const BackButton = () => {
  return (
    <div>
       <button
        type="button"
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
    </div>
  );
}

export default BackButton;
