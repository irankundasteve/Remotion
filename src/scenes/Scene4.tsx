import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS, FONTS } from '../constants';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Wipe transition: emerald panel slides in (frames 0-15 local)
  const wipeX = interpolate(frame, [0, 15], [-100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Background color shift
  const bgColor = interpolateColors(frame, [0, 15], [COLORS.bg, COLORS.bgEnd]);

  // $ symbol spin-in (spring)
  const dollarScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 1.2, damping: 12, stiffness: 200 },
    delay: 20,
  });

  const dollarRotateY = interpolate(frame, [20, 50], [90, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CURRENCY text entry
  const currencyOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const currencyY = interpolate(frame, [50, 70], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Canvas-like gradient shimmer on text
  const shimmerX = interpolate(frame, [50, 90], [0, 100], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: bgColor, overflow: 'hidden' }}>
      {/* Emerald wipe panel */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: COLORS.bgEnd,
          transform: `translateX(${wipeX}%)`,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 40,
          zIndex: 1,
        }}
      >
        {/* Gold coin / $ symbol */}
        <div
          style={{
            transform: `scale(${dollarScale}) perspective(400px) rotateY(${dollarRotateY}deg)`,
            fontSize: 200,
            lineHeight: 1,
            filter: 'drop-shadow(0 0 40px #D4AF37aa)',
          }}
        >
          💰
        </div>

        {/* CURRENCY text with shimmer gradient */}
        <div
          style={{
            opacity: currencyOpacity,
            transform: `translateY(${currencyY}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: 110,
              fontWeight: 900,
              letterSpacing: 8,
              background: `linear-gradient(90deg, ${COLORS.gold} ${shimmerX - 10}%, #fff ${shimmerX}%, ${COLORS.gold} ${shimmerX + 10}%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            CURRENCY
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: interpolate(frame, [70, 90], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <span
            style={{
              fontFamily: FONTS.thin,
              fontSize: 32,
              color: COLORS.primary,
              opacity: 0.7,
              letterSpacing: 4,
            }}
          >
            solves that.
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
