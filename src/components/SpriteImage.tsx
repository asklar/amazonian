import React, { useState, useEffect } from 'react';

interface SpriteImageProps {
  src?: string;
  fallbackClassName?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  onSpriteLoad?: (hasSvg: boolean) => void;
}

/**
 * SpriteImage component that renders SVG sprites when available,
 * falls back to CSS background styling when SVG is not available
 */
const SpriteImage: React.FC<SpriteImageProps> = ({
  src,
  fallbackClassName = '',
  alt = '',
  className = '',
  style = {},
  onSpriteLoad
}) => {
  const [imageExists, setImageExists] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!src) {
      setImageLoading(false);
      onSpriteLoad?.(false);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setImageExists(true);
      setImageLoading(false);
      onSpriteLoad?.(true);
    };
    img.onerror = () => {
      setImageExists(false);
      setImageLoading(false);
      onSpriteLoad?.(false);
    };
    img.src = src;
  }, [src, onSpriteLoad]);

  // Show loading state or fallback immediately if no src
  if (imageLoading || !src || !imageExists) {
    return (
      <div 
        className={`sprite-fallback ${fallbackClassName} ${className}`}
        style={style}
        aria-label={alt}
      />
    );
  }

  // Render SVG image - don't apply fallback classes when we have a working SVG
  const imageStyle: React.CSSProperties = {
    ...style,
    display: 'block',
    width: '100%',
    height: '100%',
    imageRendering: 'pixelated', // Maintain crisp pixel art
    background: 'transparent', // Ensure no background
  };

  return (
    <img 
      src={src}
      alt={alt}
      className={`sprite-image ${className}`}
      style={imageStyle}
    />
  );
};

export default SpriteImage;
