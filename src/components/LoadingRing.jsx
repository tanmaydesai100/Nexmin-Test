import React from 'react';
import { RingLoader } from 'react-spinners';

/**
 * Props:
 *  - loading: boolean (show/hide)
 *  - color: string (CSS color)
 *  - size: number (px)
 *  - override: optional style object to override loader container styles (cssOverride prop)
 */
export default function LoadingRing({
  loading = true,
  color = '#5B32B4',
  size = 80,
  override = {},
}) {
  // default css override to center the spinner
  const cssOverride = {
    display: 'block',      // recommended for many loaders
    margin: '0 auto',      // center horizontally
    borderColor: 'red',    // example if you want to experiment with border color
    ...override,
  };

  if (!loading) return null;

  return (
    <div 
      aria-live="polite" 
      aria-busy={loading} 
      style={{ 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
      }}
    >
      <RingLoader
        color={color}
        loading={loading}
        size={size}
        cssOverride={cssOverride}
      />
    </div>
  );
}

