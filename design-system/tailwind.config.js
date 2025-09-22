/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './projects/**/*.{html,ts}',
    './stories/**/*.{ts,mdx}',
    './.storybook/**/*.{ts,js,mdx,html}',
  ],
  prefix: 'tw-',
  theme: {
    extend: {
      screens: {
        'xs': '0px',
        'sm': '576px',
        'md': '768px',
        'lg': '992px',
        'xl': '1440px',
        '2xl': '1768px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      maxWidth: {
        'content-xs': 'var(--content-max-width-xs)',
        'content-sm': 'var(--content-max-width-sm)',
        'content-md': 'var(--content-max-width-md)',
        'content-lg': 'var(--content-max-width-lg)',
        'content-xl': 'var(--content-max-width-xl)',
        'content-2xl': 'var(--content-max-width-2xl)',
        'content-3xl': 'var(--content-max-width-3xl)',
        'content-4xl': 'var(--content-max-width-4xl)',
      },
      padding: {
        'content-xs': 'var(--content-padding-xs)',
        'content-sm': 'var(--content-padding-sm)',
        'content-md': 'var(--content-padding-md)',
        'content-lg': 'var(--content-padding-lg)',
        'content-xl': 'var(--content-padding-xl)',
        'content-2xl': 'var(--content-padding-2xl)',
        'content-3xl': 'var(--content-padding-3xl)',
        'content-4xl': 'var(--content-padding-4xl)',
      },
      backgroundColor: {
        // Page and layout colors
        'page': 'var(--background-color-page)',
        'surface': 'var(--background-color-surface)',
        
        // Interactive element backgrounds
        'interactive': {
          'default': 'var(--background-color-interactive-default)',
          'default-hover': 'var(--background-color-interactive-default-hover)',
          'default-disabled': 'var(--background-color-interactive-default-disabled)',
          'brand': 'var(--background-color-interactive-brand)',
          'brand-hover': 'var(--background-color-interactive-brand-hover)',
          'brand-disabled': 'var(--background-color-interactive-brand-disabled)',
        },
      },
      
      borderColor: {
        'default': 'var(--border-color-default)',
      },
      
      colors: {
        // Brand colors (can be used for any color utility)
        'brand': {
          'base': 'var(--color-brand-base)',
          'base-hover': 'var(--color-brand-base-hover)',
          'weak': 'var(--color-brand-weak)',
          'weak-hover': 'var(--color-brand-weak-hover)',
          'strong': 'var(--color-brand-strong)',
          'strong-hover': 'var(--color-brand-strong-hover)',
        },
        
        // Success colors
        'success': {
          'base': 'var(--color-success-base)',
          'base-hover': 'var(--color-success-base-hover)',
          'weak': 'var(--color-success-weak)',
          'weak-hover': 'var(--color-success-weak-hover)',
          'strong': 'var(--color-success-strong)',
          'strong-hover': 'var(--color-success-strong-hover)',
        },
        
        // Warning colors
        'warning': {
          'base': 'var(--color-warning-base)',
          'base-hover': 'var(--color-warning-base-hover)',
          'weak': 'var(--color-warning-weak)',
          'weak-hover': 'var(--color-warning-weak-hover)',
          'strong': 'var(--color-warning-strong)',
          'strong-hover': 'var(--color-warning-strong-hover)',
        },
        
        // Destructive colors
        'destructive': {
          'base': 'var(--color-destructive-base)',
          'base-hover': 'var(--color-destructive-base-hover)',
          'weak': 'var(--color-destructive-weak)',
          'weak-hover': 'var(--color-destructive-weak-hover)',
          'strong': 'var(--color-destructive-strong)',
          'strong-hover': 'var(--color-destructive-strong-hover)',
        },
      },
      
      textColor: {
        // Text-specific color mappings for cleaner class names
        'primary': 'var(--text-color-default-primary)',
        'primary-inverse': 'var(--text-color-default-primary-inverse)',
        'secondary': 'var(--text-color-default-secondary)',
        'tertiary': 'var(--text-color-default-tertiary)',
        'disabled': 'var(--text-color-default-disabled)',
        'brand': 'var(--text-color-brand)',
        'brand-disabled': 'var(--text-color-brand-disabled)',
      },
      
      fontSize: {
        '2xs': 'var(--font-size-2xs)',
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
      },
      
      boxShadow: {
        'sm': 'var(--box-shadow-sm)',
        'md': 'var(--box-shadow-md)',
        'lg': 'var(--box-shadow-lg)',
      },
      
      transitionDuration: {
        'fast': 'var(--transition-duration-fast)',
        'normal': 'var(--transition-duration-normal)',
        'slow': 'var(--transition-duration-slow)',
      },
      
      transitionTimingFunction: {
        'ease-out-quart': 'var(--ease-out-quart)',
        'ease-in-out-quart': 'var(--ease-in-out-quart)',
        'ease-out-back': 'var(--ease-out-back)',
        'ease-smooth': 'var(--ease-smooth)',
      },
      
      outlineColor: {
        'default': 'var(--outline-color-default)',
      },
      
      scale: {
        '98': '0.98',
      },
    },
  },
  plugins: [],
};