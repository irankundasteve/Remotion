import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../constants';
import { ParticleSystem } from '../components/ParticleSystem';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // BAKER spring entry — heavy thud (mass: 3)
  const bakerY = spring({
    frame,
    fps,
    from: -400,
    to: 0,
    config: { mass: 3, damping: 18, stiffness: 80 },
  });

  // Divider line scaleY
  const lineScale = interpolate(frame, [45, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // BAKER split — left half
  const leftX = interpolate(frame, [60, 90], [0, -200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const leftRot = interpolate(frame, [60, 90], [0, -15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // BAKER split — right half
  const rightX = interpolate(frame, [60, 90], [0, 200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rightRot = interpolate(frame, [60, 90], [0, 15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // HAIRCUT fade + letterSpacing
  const haircutOpacity = interpolate(frame, [75, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const haircutLetterSpacing = interpolate(frame, [75, 110], [24, 2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const showParticles = frame >= 15 && frame <= 55;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 40,
      }}
    >
      {/* BAKER word split into two clip-path halves */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Left half of BAKER */}
        <div
          style={{
            transform: `translateY(${bakerY}px) translateX(${leftX}px) rotate(${leftRot}deg)`,
            clipPath: 'inset(0 50% 0 0)',
            position: 'absolute',
          }}
        >
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: 140,
              fontWeight: 900,
              fontStyle: 'italic',
              color: COLORS.primary,
              letterSpacing: -4,
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            BAKER
          </span>
        </div>

        {/* Right half of BAKER */}
        <div
          style={{
            transform: `translateY(${bakerY}px) translateX(${rightX}px) rotate(${rightRot}deg)`,
            clipPath: 'inset(0 0 0 50%)',
            position: 'absolute',
          }}
        >
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: 140,
              fontWeight: 900,
              fontStyle: 'italic',
              color: COLORS.primary,
              letterSpacing: -4,
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            BAKER
          </span>
        </div>

        {/* Invisible spacer to hold layout height */}
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 140,
            fontWeight: 900,
            fontStyle: 'italic',
            color: 'transparent',
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          BAKER
        </span>
      </div>

      {/* Flour puff particles */}
      {showParticles && (
        <ParticleSystem frame={frame} triggerFrame={15} count={20} color={COLORS.primary} />
      )}

      {/* Divider line */}
      <div
        style={{
          width: 320,
          height: 1,
          background: COLORS.primary,
          transform: `scaleY(${lineScale})`,
          transformOrigin: 'center',
          opacity: lineScale,
        }}
      />

      {/* HAIRCUT */}
      <span
        style={{
          fontFamily: FONTS.thin,
          fontSize: 72,
          fontWeight: 100,
          color: COLORS.primary,
          letterSpacing: haircutLetterSpacing,
          opacity: haircutOpacity,
          textTransform: 'uppercase',
          userSelect: 'none',
        }}
      >
        HAIRCUT
      </span>
    </AbsoluteFill>
  );
};
