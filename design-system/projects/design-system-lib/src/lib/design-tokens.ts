/**
 * Design Token System
 * 
 * This file contains TypeScript interfaces and utilities for working with
 * design tokens defined in the Tailwind CSS v4 @theme directive.
 */

export interface ColorTokens {
  brand: string;
  brandHover: string;
  neutralPrimary: string;
  neutralPrimaryHover: string;
  neutralSecondary: string;
  neutralSecondaryHover: string;
  neutralTertiary: string;
  neutralTertiaryHover: string;
  neutralDisabled: string;
}

export interface TextColorTokens {
  primary: string;
  secondary: string;
  disabled: string;
  disabledInverse: string;
}

export interface BorderColorTokens {
  weak: string;
  strong: string;
}

export interface StateColorTokens {
  base: string;
  baseHover: string;
  weak: string;
  strong: string;
}

export interface TypographyTokens {
  displayLg: string;
  displayMd: string;
  displaySm: string;
  headingLg: string;
  headingMd: string;
  headingSm: string;
  bodyLg: string;
  bodyMd: string;
  bodySm: string;
  bodyXs: string;
}

export interface SpacingTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

export interface BorderRadiusTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ShadowTokens {
  sm: string;
  md: string;
  lg: string;
}

export interface TransitionTokens {
  fast: string;
  normal: string;
  slow: string;
}

export interface DesignTokens {
  colors: {
    background: ColorTokens;
    text: TextColorTokens;
    border: BorderColorTokens;
    success: StateColorTokens;
    warning: StateColorTokens;
    destructive: StateColorTokens;
  };
  typography: TypographyTokens;
  spacing: SpacingTokens;
  borderRadius: BorderRadiusTokens;
  shadows: ShadowTokens;
  transitions: TransitionTokens;
}

/**
 * Design token mappings for Tailwind CSS classes
 */
export const designTokenMap = {
  // Background colors - Neutral
  'bg-neutral-primary': 'var(--color-background-neutral-primary)',
  'bg-neutral-primary-hover': 'var(--color-background-neutral-primary-hover)',
  'bg-neutral-secondary': 'var(--color-background-neutral-secondary)',
  'bg-neutral-secondary-hover': 'var(--color-background-neutral-secondary-hover)',
  'bg-neutral-tertiary': 'var(--color-background-neutral-tertiary)',
  'bg-neutral-tertiary-hover': 'var(--color-background-neutral-tertiary-hover)',
  'bg-neutral-disabled': 'var(--color-background-neutral-disabled)',
  
  // Background colors - Brand
  'bg-brand': 'var(--color-background-brand)',
  'bg-brand-hover': 'var(--color-background-brand-hover)',
  'bg-brand-disabled': 'var(--color-background-brand-disabled)',
  
  // Brand unscoped colors (for non-background uses)
  'brand-base': 'var(--color-brand-base)',
  'brand-base-hover': 'var(--color-brand-base-hover)',
  'brand-weak': 'var(--color-brand-weak)',
  'brand-weak-hover': 'var(--color-brand-weak-hover)',
  'brand-strong': 'var(--color-brand-strong)',
  'brand-strong-hover': 'var(--color-brand-strong-hover)',

  // Text colors
  'text-primary': 'var(--text-color-default-primary)',
  'text-secondary': 'var(--text-color-default-secondary)',
  'text-brand': 'var(--text-color-brand)',
  'text-brand-hover': 'var(--color-brand-base-hover)',
  'text-brand-strong': 'var(--color-brand-strong)',
  'text-disabled': 'var(--text-color-disabled)',
  'text-disabled-inverse': 'var(--text-color-disabled-inverse)',

  // Border colors
  'border-brand': 'var(--color-brand-base)',
  'border-brand-hover': 'var(--color-brand-base-hover)',
  'border-brand-strong': 'var(--color-brand-strong)',
  'border-weak': 'var(--border-color-default)',
  'border-strong': 'var(--border-color-strong)',

  // Outline colors
  'outline-brand': 'var(--color-brand-base)',

  // State colors
  'bg-success-base': 'var(--color-success-base)',
  'bg-success-base-hover': 'var(--color-success-base-hover)',
  'bg-success-weak': 'var(--color-success-weak)',
  'text-success-strong': 'var(--color-success-strong)',
  'border-success-base': 'var(--color-success-base)',

  'bg-warning-base': 'var(--color-warning-base)',
  'bg-warning-base-hover': 'var(--color-warning-base-hover)',
  'bg-warning-weak': 'var(--color-warning-weak)',
  'text-warning-strong': 'var(--color-warning-strong)',
  'border-warning-base': 'var(--color-warning-base)',

  'bg-destructive-base': 'var(--color-destructive-base)',
  'bg-destructive-base-hover': 'var(--color-destructive-base-hover)',
  'bg-destructive-weak': 'var(--color-destructive-weak)',
  'bg-destructive-strong': 'var(--color-destructive-strong)',
  'text-destructive-strong': 'var(--color-destructive-strong)',
  'border-destructive-base': 'var(--color-destructive-base)',
  'border-destructive-base-hover': 'var(--color-destructive-base-hover)',
  'border-destructive-strong': 'var(--color-destructive-strong)',
} as const;

/**
 * Utility function to get design token value
 */
export function getDesignToken(tokenName: keyof typeof designTokenMap): string {
  return designTokenMap[tokenName] || tokenName;
}

/**
 * Type-safe component variant definitions
 */
export const componentVariants = {
  button: {
    primary: 'bg-brand text-white hover:bg-brand-hover',
    outline: 'bg-neutral-secondary border border-weak text-primary hover:bg-neutral-secondary-hover',
    success: 'bg-success-base text-white hover:bg-success-base-hover',
    warning: 'bg-warning-base text-white hover:bg-warning-base-hover',
    destructive: 'bg-destructive-base text-white hover:bg-destructive-base-hover',
  },
  input: {
    default: 'bg-neutral-secondary border-weak text-primary hover:bg-neutral-secondary-hover',
    success: 'bg-success-weak border-success-base text-success-strong',
    warning: 'bg-warning-weak border-warning-base text-warning-strong',
    destructive: 'bg-destructive-weak border-destructive-base text-destructive-strong',
  },
  card: {
    default: 'bg-neutral-primary rounded-md p-4',
    interactive: 'bg-neutral-primary hover:bg-neutral-primary-hover cursor-pointer transition-colors rounded-md p-4',
  },
} as const;