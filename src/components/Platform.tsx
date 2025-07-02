import React from 'react';
import type { Platform as PlatformType, Position } from './types';

interface PlatformProps {
  platform: PlatformType;
  cameraOffset: Position;
}

const Platform: React.FC<PlatformProps> = ({ platform, cameraOffset }) => {
  const style: React.CSSProperties = {
    left: platform.x - cameraOffset.x,
    top: platform.y - cameraOffset.y,
    width: platform.width,
    height: platform.height,
  };

  return (
    <div 
      className={`platform ${platform.type}`}
      style={style}
    />
  );
};

export default Platform;
