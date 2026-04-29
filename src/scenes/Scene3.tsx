import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS, FONTS } from '../constants';
import { DoubleArrow } from '../components/DoubleArrow';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // BARTER title entry
  const barterY = spring({
    frame,
    fps,
    from: -80,
    to: 0,
    config: { mass: 1, damping: 14, stiffness: 180 },
    delay: 15,
  });

  // Icons pop in
  const iconScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    config: { mass: 1, damping: 12, stiffness: 200 },
    delay: 15,
  });

  // Circles pulse
  const pulse = Math.sin(frame * 0.15) * 0.06 + 1;

  // SAME TIME flash every 15 frames
  const sameTimeOpacity = Math.sin(frame * (Math.PI / 15)) > 0 ? 1 : 0;

  // Exit: gravity fall at frame 85+ (local, Scene3 starts at global 300)
  const exitY = frame >= 85
    ? interpolate(frame, [85, 90], [0, 1000], {
        extrapolateRight: 'clamp',
      })
    : 0;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 48,
        transform: `translateY(${exitY}px)`,
      }}
    >
      {/* BARTER title */}
      <div style={{ transform: `translateY(${barterY}px)` }}>
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 100,
            fontWeight: 900,
            color: COLORS.primary,
            letterSpacing: -2,
          }}
        >
          BARTER
        </span>
      </div>

      {/* Icons + arrow row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          transform: `scale(${iconScale})`,
        }}
      >
        {/* Baker icon */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: COLORS.gold,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
              transform: `scale(${pulse})`,
            }}
          >
            🍞
          </div>
          <span style={{ fontFamily: FONTS.thin, fontSize: 22, color: COLORS.primary }}>Baker</span>
        </div>

        {/* Double arrow */}
        <DoubleArrow
          frame={frame}
          drawStart={30}
          breakFrame={45}
          color={COLORS.gold}
        />

        {/* Barber icon */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: COLORS.gold,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 48,
              transform: `scale(${pulse})`,
            }}
          >
            ✂️
          </div>
          <span style={{ fontFamily: FONTS.thin, fontSize: 22, color: COLORS.primary }}>Barber</span>
        </div>
      </div>

      {/* SAME TIME flash */}
      <div
        style={{
          opacity: frame >= 60 ? sameTimeOpacity : 0,
          fontFamily: FONTS.display,
          fontSize: 64,
          fontWeight: 900,
          color: COLORS.red,
          letterSpacing: 6,
          textTransform: 'uppercase',
        }}
      >
        SAME TIME
      </div>
    </AbsoluteFill>
  );
};
