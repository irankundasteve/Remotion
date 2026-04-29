import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { COLORS, SCENES } from './constants';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';
import { Scene3 } from './scenes/Scene3';
import { Scene4 } from './scenes/Scene4';

export const BarterBreakdown: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg, fontFamily: 'sans-serif' }}>
      {/* Font preloads */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,400;0,700;0,900;1,900&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* Scene 1: The Baker's Dilemma — 0 to 120 */}
      <Sequence from={SCENES.s1Start} durationInFrames={SCENES.s1End - SCENES.s1Start}>
        <Scene1 />
      </Sequence>

      {/* Scene 2: The Rejected Offer — 120 to 300 */}
      <Sequence from={SCENES.s2Start} durationInFrames={SCENES.s2End - SCENES.s2Start}>
        <Scene2 />
      </Sequence>

      {/* Scene 3: Barter Logic — 300 to 390 */}
      <Sequence from={SCENES.s3Start} durationInFrames={SCENES.s3End - SCENES.s3Start}>
        <Scene3 />
      </Sequence>

      {/* Scene 4: Currency Resolution — 390 to 480 */}
      <Sequence from={SCENES.s4Start} durationInFrames={SCENES.s4End - SCENES.s4Start}>
        <Scene4 />
      </Sequence>
    </AbsoluteFill>
  );
};
