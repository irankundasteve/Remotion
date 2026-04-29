import React from 'react';
import { interpolate } from 'remotion';

interface Props {
  frame: number;
  drawStart: number;
  breakFrame?: number;
  color?: string;
}

export const DoubleArrow: React.FC<Props> = ({
  frame,
  drawStart,
  breakFrame,
  color = '#D4AF37',
}) => {
  const totalLength = 300;
  const drawProgress = interpolate(frame, [drawStart, drawStart + 20], [totalLength, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const broken = breakFrame !== undefined && frame >= breakFrame;
  const breakProgress = broken
    ? interpolate(frame, [breakFrame, breakFrame + 20], [0, 1], {
        extrapolateRight: 'clamp',
      })
    : 0;

  const leftRotate = broken ? breakProgress * -30 : 0;
  const rightRotate = broken ? breakProgress * 30 : 0;

  return (
    <svg width="320" height="60" viewBox="0 0 320 60">
      {/* Left half */}
      <g
        style={{
          transformOrigin: '160px 30px',
          transform: `rotate(${leftRotate}deg)`,
        }}
      >
        <path
          d="M 20 30 L 160 30 M 20 30 L 40 15 M 20 30 L 40 45"
          stroke={broken ? '#E11D48' : color}
          strokeWidth={3}
          fill="none"
          strokeDasharray={totalLength}
          strokeDashoffset={drawProgress}
          strokeLinecap="round"
          style={{ transition: 'stroke 0.2s' }}
        />
      </g>
      {/* Right half */}
      <g
        style={{
          transformOrigin: '160px 30px',
          transform: `rotate(${rightRotate}deg)`,
        }}
      >
        <path
          d="M 160 30 L 300 30 M 300 30 L 280 15 M 300 30 L 280 45"
          stroke={broken ? '#E11D48' : color}
          strokeWidth={3}
          fill="none"
          strokeDasharray={totalLength}
          strokeDashoffset={drawProgress}
          strokeLinecap="round"
          style={{ transition: 'stroke 0.2s' }}
        />
      </g>
    </svg>
  );
};
