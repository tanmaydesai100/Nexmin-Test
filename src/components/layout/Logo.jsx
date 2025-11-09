import React from 'react';

export default function Logo({ size = 40 }) {
  return (
    <div 
      className="flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: '#5B32B4',
      }}
    >
      <span 
        className="text-black font-semibold lowercase"
        style={{
          fontSize: size * 0.4,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          letterSpacing: '-0.5px',
        }}
      >
        nexmin
      </span>
    </div>
  );
}

