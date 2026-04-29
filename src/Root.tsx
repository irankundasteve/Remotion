import React from 'react';
import { Composition } from 'remotion';
import { BarterBreakdown } from './BarterBreakdown';

export const Root: React.FC = () => {
  return (
    <>
      {/* Vertical / TikTok */}
      <Composition
        id="BarterBreakdown"
        component={BarterBreakdown}
        durationInFrames={480}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
      {/* Landscape / YouTube */}
      <Composition
        id="BarterBreakdownLandscape"
        component={BarterBreakdown}
        durationInFrames={480}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
