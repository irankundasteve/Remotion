import React from 'react';
import { AbsoluteFill, interpolate, interpolateColors, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // frame is relative (Scene2 starts at frame 120 globally)
  const f = frame; // local frame passed in from BarterBreakdown

  // "10" elastic scale
  const tenScale = spring({
    frame: f,
    fps,
    from: 0,
    to: 1.5,
    config: { mass: 1, damping: 10, stiffness: 200 },
    delay: 0,
  });

  // Bread rows stagger (5 frames per row)
  const breadRows = Array.from({ length: 10 }, (_, i) => {
    const delay = i * 5;
    const opacity = interpolate(f, [delay + 30, delay + 45], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const translateX = interpolate(f, [delay + 30, delay + 45], [-60, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return { opacity, translateX };
  });

  // Color: Gold → Red at frame 90 (global 210 - 120 = 90 local)
  const breadColor = f >= 90
    ? interpolateColors(f, [90, 100], [COLORS.gold, COLORS.red])
    : COLORS.gold;

  // Wiggle at frame 90
  const wiggle = f >= 90 && f <= 120
    ? Math.sin((f - 90) * 0.8) * 14
    : 0;

  // X stamp spring (global 240 = local 120)
  const xScale = f >= 120
    ? spring({
        frame: f - 120,
        fps,
        from: 1.4,
        to: 1.0,
        config: { mass: 1, damping: 8, stiffness: 300 },
      })
    : 0;

  const xOpacity = interpolate(f, [120, 126], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      {/* "10" */}
      <div style={{ transform: `scale(${tenScale})` }}>
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 180,
            fontWeight: 900,
            color: COLORS.gold,
            lineHeight: 1,
          }}
        >
          10
        </span>
      </div>

      {/* Bread rows */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          transform: `translateX(${wiggle}px)`,
        }}
      >
        {breadRows.map((row, i) => (
          <div
            key={i}
            style={{
              opacity: row.opacity,
              transform: `translateX(${row.translateX}px)`,
              fontFamily: FONTS.bold,
              fontSize: 28,
              fontWeight: 700,
              color: breadColor,
              letterSpacing: 6,
            }}
          >
            🍞 BREAD
          </div>
        ))}
      </div>

      {/* X stamp */}
      {f >= 120 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: xOpacity,
          }}
        >
          <svg
            width={340}
            height={340}
            viewBox="0 0 100 100"
            style={{ transform: `scale(${xScale})` }}
          >
            <line
              x1="10" y1="10" x2="90" y2="90"
              stroke={COLORS.red}
              strokeWidth={12}
              strokeLinecap="round"
            />
            <line
              x1="90" y1="10" x2="10" y2="90"
              stroke={COLORS.red}
              strokeWidth={12}
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </AbsoluteFill>
  );
};
