import React, { useCallback, useRef } from 'react';

interface TouchOverlayProps {
  onMove: (direction: 'left' | 'right' | null) => void;
  onJump: (pressed: boolean) => void;
  isVisible: boolean;
}

const TouchOverlay: React.FC<TouchOverlayProps> = ({ onMove, onJump, isVisible }) => {
  const lastTapRef = useRef<number>(0);
  const currentDirectionRef = useRef<'left' | 'right' | null>(null);
  const jumpStartTimeRef = useRef<number>(0);
  const isJumpHeldRef = useRef<boolean>(false);
  const jumpTimeoutRef = useRef<number | null>(null);

  // Calculate scale to fit the game in mobile viewport - match Game component scaling
  const getScale = useCallback(() => {
    const gameWidth = 800;
    const gameHeight = 600;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate scale to fit the entire game area within the viewport
    const scaleX = viewportWidth / gameWidth;
    const scaleY = viewportHeight / gameHeight;
    
    // Use the smaller scale to ensure everything fits
    return Math.min(scaleX, scaleY);
  }, []);

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
    
    // Handle jump input - support both quick tap and hold for variable height
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (timeSinceLastTap < 300) { 
      // Double tap detected - start jump immediately and mark as held
      onJump(true);
      isJumpHeldRef.current = true;
      jumpStartTimeRef.current = now;
      lastTapRef.current = 0; // Reset to prevent triple-tap issues
      
      // Clear any existing timeout
      if (jumpTimeoutRef.current) {
        clearTimeout(jumpTimeoutRef.current);
        jumpTimeoutRef.current = null;
      }
    } else {
      // Single tap - start timer for potential double tap
      lastTapRef.current = now;
      
      // Set timeout for single tap jump (if no second tap comes)
      jumpTimeoutRef.current = window.setTimeout(() => {
        if (!isJumpHeldRef.current) {
          // Single tap jump - quick release for small jump
          onJump(true);
          setTimeout(() => {
            onJump(false);
          }, 100); // Quick release after 100ms
        }
        jumpTimeoutRef.current = null;
      }, 300); // Wait 300ms to see if second tap comes
    }
  }, [onMove, onJump]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    
    // Stop movement when touch ends
    if (currentDirectionRef.current) {
      onMove(null);
      currentDirectionRef.current = null;
    }
    
    // Handle jump release for variable height jumping
    if (isJumpHeldRef.current) {
      // Release jump after hold
      onJump(false);
      isJumpHeldRef.current = false;
      jumpStartTimeRef.current = 0;
    }
    
    // Clear any pending single-tap jump timeout
    if (jumpTimeoutRef.current) {
      clearTimeout(jumpTimeoutRef.current);
      jumpTimeoutRef.current = null;
    }
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
    
    // Handle jump input - similar to touch but with mouse
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (timeSinceLastTap < 300) {
      // Double click detected - start jump and mark as held
      onJump(true);
      isJumpHeldRef.current = true;
      jumpStartTimeRef.current = now;
      lastTapRef.current = 0;
      
      if (jumpTimeoutRef.current) {
        clearTimeout(jumpTimeoutRef.current);
        jumpTimeoutRef.current = null;
      }
    } else {
      lastTapRef.current = now;
      
      // Set timeout for single click jump
      jumpTimeoutRef.current = window.setTimeout(() => {
        if (!isJumpHeldRef.current) {
          onJump(true);
          setTimeout(() => {
            onJump(false);
          }, 100);
        }
        jumpTimeoutRef.current = null;
      }, 300);
    }
  }, [onMove, onJump]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    if (currentDirectionRef.current) {
      onMove(null);
      currentDirectionRef.current = null;
    }
    
    if (isJumpHeldRef.current) {
      onJump(false);
      isJumpHeldRef.current = false;
      jumpStartTimeRef.current = 0;
    }
    
    if (jumpTimeoutRef.current) {
      clearTimeout(jumpTimeoutRef.current);
      jumpTimeoutRef.current = null;
    }
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
        top: '50%',
        left: '50%',
        width: '800px', // Match game container original width  
        height: '600px', // Match game container original height
        zIndex: 100, // Above game content but below mobile controls
        pointerEvents: 'auto',
        background: 'transparent',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        transformOrigin: 'center center',
        transform: `translate(-50%, -50%) scale(${getScale()})`, // Match game container scaling and centering
        touchAction: 'manipulation',
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
        Single tap for small jump, double-tap and hold for high jump
      </div>
    </div>
  ) : null;
};

export default TouchOverlay;
