import { useState, useEffect, useRef } from 'react';

export interface SpriteAnimation {
  frames: string[];
  frameRate: number; // frames per second
  loop: boolean;
  currentFrame: number;
  isPlaying: boolean;
}

export const useSpriteAnimation = (
  frames: string[],
  frameRate: number = 8,
  loop: boolean = true,
  autoPlay: boolean = true
) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<number | null>(null);

  // Calculate frame duration in milliseconds
  const frameDuration = 1000 / frameRate;

  useEffect(() => {
    if (!isPlaying || frames.length <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setCurrentFrame(prevFrame => {
        const nextFrame = prevFrame + 1;
        
        if (nextFrame >= frames.length) {
          if (loop) {
            return 0; // Loop back to first frame
          } else {
            setIsPlaying(false); // Stop animation
            return prevFrame; // Stay on last frame
          }
        }
        
        return nextFrame;
      });
    }, frameDuration);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, frames.length, frameDuration, loop]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const stop = () => {
    setIsPlaying(false);
    setCurrentFrame(0);
  };
  const reset = () => setCurrentFrame(0);

  const getCurrentSprite = () => {
    if (frames.length === 0) return undefined;
    return frames[Math.min(currentFrame, frames.length - 1)];
  };

  return {
    currentFrame,
    isPlaying,
    getCurrentSprite,
    play,
    pause,
    stop,
    reset,
    totalFrames: frames.length,
  };
};

interface AnimationConfig {
  frames: string[];
  frameRate?: number;
  loop?: boolean;
}

/**
 * Hook for managing multiple sprite animations for a game entity
 */
export const useEntitySpriteAnimations = <T extends string>(
  animationConfigs: Record<T, AnimationConfig>
) => {
  const [currentAnimation, setCurrentAnimation] = useState<T | null>(null);
  
  // Initialize all animations
  const animations = Object.fromEntries(
    Object.entries(animationConfigs).map(([key, config]) => {
      const typedConfig = config as AnimationConfig;
      return [
        key,
        useSpriteAnimation(
          typedConfig.frames,
          typedConfig.frameRate || 8,
          typedConfig.loop !== false, // default to true
          false // don't auto-play
        )
      ];
    })
  ) as Record<T, ReturnType<typeof useSpriteAnimation>>;

  const playAnimation = (animationName: T) => {
    // Stop current animation
    if (currentAnimation && animations[currentAnimation]) {
      animations[currentAnimation].stop();
    }
    
    // Start new animation
    setCurrentAnimation(animationName);
    if (animations[animationName]) {
      animations[animationName].reset();
      animations[animationName].play();
    }
  };

  const getCurrentSprite = (): string | undefined => {
    if (!currentAnimation || !animations[currentAnimation]) {
      return undefined;
    }
    return animations[currentAnimation].getCurrentSprite();
  };

  return {
    currentAnimation,
    animations,
    playAnimation,
    getCurrentSprite,
  };
};
