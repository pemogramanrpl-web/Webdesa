import { useState } from 'react';
import { Mountain } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ResilientImage({ src, alt, className = '' }: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#f2e6db] text-[#1b4332] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Mountain className="w-8 h-8 mb-2 text-[#52796f]" strokeWidth={1.6} />
        <span className="text-sm font-medium text-[#3e3a36] max-w-[22ch]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
