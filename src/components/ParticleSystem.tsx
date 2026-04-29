import React from 'react';
import { interpolate } from 'remotion';

interface Props {
  frame: number;
  triggerFrame: number;
  count?: number;
  color?: string;
}

export const ParticleSystem: React.FC<Props> = ({
  frame,
  triggerFrame,
  count = 16,
  color = '#F9F9F9',
}) => {
  const elapsed = frame - triggerFrame;
  if (elapsed < 0 || elapsed > 40) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const distance = interpolate(elapsed, [0, 40], [0, 180]);
        const opacity = interpolate(elapsed, [0, 10, 40], [0, 1, 0]);
        const scale = interpolate(elapsed, [0, 20, 40], [0.2, 1, 0.4]);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: color,
              opacity,
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
            }}
          />
        );
      })}
    </div>
  );
};
