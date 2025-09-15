import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge class names using clsx
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Utility function to generate component class names based on variants
 */
export function createVariantClasses<T extends Record<string, any>>(
  baseClasses: string,
  variants: T,
  selectedVariant: keyof T,
  additionalClasses?: string
): string {
  return cn(
    baseClasses,
    variants[selectedVariant],
    additionalClasses
  );
}

/**
 * Utility function to format design tokens for CSS custom properties
 */
export function formatTokenName(tokenName: string): string {
  return `--${tokenName.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
}

/**
 * Utility function to get CSS custom property value
 */
export function getCSSCustomProperty(propertyName: string): string {
  return `theme(${formatTokenName(propertyName)})`;
}

/**
 * Utility function to debounce function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
}

/**
 * Utility function to throttle function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}