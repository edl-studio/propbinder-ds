/**
 * Available sizes for spark elements
 */
export type SparkSize = 'large' | 'medium' | 'small';

/**
 * Animation states for the spark component
 */
export type SparkAnimationState = 'static' | 'appear' | 'loading' | 'disappear';

/**
 * Position configuration for a spark element
 */
export interface SparkPosition {
  /** X coordinate in pixels */
  x: number;
  /** Y coordinate in pixels */
  y: number;
}

/**
 * Configuration for a single spark element
 */
export interface SparkConfig {
  /** Unique identifier for the spark */
  id: string;
  /** Size variant of the spark */
  size: SparkSize;
  /** Position coordinates */
  position: SparkPosition;
  /** Animation delay in milliseconds */
  delay: number;
  /** Rotation angle in degrees */
  rotation: number;
}
