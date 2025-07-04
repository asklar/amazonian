import React, { useCallback, useRef } from 'react';

interface TouchOverlayProps {
  onMove: (direction: 'left' | 'right' | null) => void;
  onJump: (pressed: boolean) => void;
  isVisible: boolean;
}

const TouchOverlay: React.FC<TouchOverlayProps> = ({ onMove, onJump, isVisible }) => {
  const lastTapRef = useRef<number>(0);
  const currentDirectionRef = useRef<'left' | 'right' | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    
    const touch = e.touches[0];
    const screenWidth = window.innerWidth;
    const quarterWidth = screenWidth / 4;
    const x = touch.clientX;
    
    let direction: 'left' | 'right' | null = null;
    
    // Left quarter of screen = move left
    if (x < quarterWidth) {
      direction = 'left';
    }
    // Right quarter of screen = move right
    else if (x > screenWidth - quarterWidth) {
      direction = 'right';
    }
    
    // Update movement
    if (direction) {
      currentDirectionRef.current = direction;
      onMove(direction);
    }
    
    // Handle double-tap for jumping
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (timeSinceLastTap < 300) { // 300ms window for double-tap
      // Double tap detected - jump
      onJump(true);
      // Reset tap timer to prevent triple-tap issues
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  }, [onMove, onJump]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    
    // Stop movement when touch ends
    if (currentDirectionRef.current) {
      onMove(null);
      currentDirectionRef.current = null;
    }
    
    // Stop jumping when touch ends (after a brief delay to allow jump to register)
    setTimeout(() => {
      onJump(false);
    }, 100);
  }, [onMove, onJump]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    
    const touch = e.touches[0];
    const screenWidth = window.innerWidth;
    const quarterWidth = screenWidth / 4;
    const x = touch.clientX;
    
    let direction: 'left' | 'right' | null = null;
    
    // Update direction based on current touch position
    if (x < quarterWidth) {
      direction = 'left';
    } else if (x > screenWidth - quarterWidth) {
      direction = 'right';
    }
    
    // Only update if direction changed
    if (direction !== currentDirectionRef.current) {
      currentDirectionRef.current = direction;
      onMove(direction);
    }
  }, [onMove]);

  // Mouse events for desktop testing
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    const screenWidth = window.innerWidth;
    const quarterWidth = screenWidth / 4;
    const x = e.clientX;
    
    let direction: 'left' | 'right' | null = null;
    
    if (x < quarterWidth) {
      direction = 'left';
    } else if (x > screenWidth - quarterWidth) {
      direction = 'right';
    }
    
    if (direction) {
      currentDirectionRef.current = direction;
      onMove(direction);
    }
    
    // Handle double-click for jumping
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (timeSinceLastTap < 300) {
      onJump(true);
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  }, [onMove, onJump]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    if (currentDirectionRef.current) {
      onMove(null);
      currentDirectionRef.current = null;
    }
    
    setTimeout(() => {
      onJump(false);
    }, 100);
  }, [onMove, onJump]);

  return isVisible ? (
    <div
      className="touch-overlay"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '85vh', // Don't cover the mobile controls
        zIndex: 100, // Above game content but below mobile controls
        pointerEvents: 'auto',
        background: 'transparent',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
    >
      {/* Visual indicators for touch areas (only show in debug mode) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '25%',
          height: '100%',
          background: 'rgba(255, 0, 0, 0.1)',
          border: '2px dashed rgba(255, 0, 0, 0.3)',
          display: 'none', // Will be shown via CSS when in debug mode
          pointerEvents: 'none',
        }}
        className="touch-area-left"
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '25%',
          height: '100%',
          background: 'rgba(0, 255, 0, 0.1)',
          border: '2px dashed rgba(0, 255, 0, 0.3)',
          display: 'none', // Will be shown via CSS when in debug mode
          pointerEvents: 'none',
        }}
        className="touch-area-right"
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '14px',
          textAlign: 'center',
          pointerEvents: 'none',
          display: 'none', // Will be shown via CSS when in debug mode
        }}
        className="touch-instructions"
      >
        Tap left/right quarters to move<br />
        Double-tap anywhere to jump
      </div>
    </div>
  ) : null;
};

export default TouchOverlay;
