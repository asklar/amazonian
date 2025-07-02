import React from 'react';
import type { Position } from './types';

interface BackgroundProps {
  cameraOffset: Position;
}

const Background: React.FC<BackgroundProps> = ({ cameraOffset }) => {
  return (
    <div className="background-container">
      {/* Far background (mountains) - slowest parallax */}
      <div 
        className="background-layer mountains"
        style={{
          transform: `translateX(${-cameraOffset.x * 0.1}px)`
        }}
      />
      
      {/* Mid background (hills) - medium parallax */}
      <div 
        className="background-layer hills"
        style={{
          transform: `translateX(${-cameraOffset.x * 0.3}px)`
        }}
      />
      
      {/* Near background (trees) - faster parallax */}
      <div 
        className="background-layer trees"
        style={{
          transform: `translateX(${-cameraOffset.x * 0.6}px)`
        }}
      />
      
      {/* Sky gradient - static */}
      <div className="background-layer sky" />
    </div>
  );
};

export default Background;
