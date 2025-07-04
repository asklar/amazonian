import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current device is likely a mobile device
 * This checks for touch capability and screen size
 * @param forceOverride - Optional boolean to force mobile mode (for debugging)
 */
export const useIsMobile = (forceOverride?: boolean): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // If there's a force override, use that instead of detection
    if (forceOverride !== undefined) {
      setIsMobile(forceOverride);
      return;
    }

    const checkIsMobile = () => {
      // Check for touch capability and small screen size
      const hasTouchscreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      
      // Check user agent for mobile indicators
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      // Consider mobile if:
      // 1. Has mobile user agent, OR
      // 2. Has touch AND (small screen OR coarse pointer)
      const mobile = isMobileUserAgent || (hasTouchscreen && (isSmallScreen || hasCoarsePointer));
      setIsMobile(mobile);
    };

    // Check on mount
    checkIsMobile();

    // Check on resize
    window.addEventListener('resize', checkIsMobile);
    
    // Check for orientation change (mobile specific)
    window.addEventListener('orientationchange', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('orientationchange', checkIsMobile);
    };
  }, [forceOverride]);

  return isMobile;
};
