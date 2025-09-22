import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  staticDirs: [{ from: '../public', to: '/' }],
  framework: {
    name: '@storybook/angular',
    options: {
      builder: {
        options: {
          styles: ['src/app/styles/globals.css']
        }
      }
    },
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
  },
  webpackFinal: async (config) => {
    // Ensure TypeScript files are processed with proper decorator support
    const tsRule = config.module?.rules?.find((rule: any) => 
      rule.test && rule.test.toString().includes('.ts')
    );
    
    if (tsRule && typeof tsRule === 'object' && 'use' in tsRule) {
      const tsLoader = Array.isArray(tsRule.use) ? 
        tsRule.use.find((loader: any) => loader.loader && loader.loader.includes('ts-loader')) : 
        tsRule.use;
      
      if (tsLoader && typeof tsLoader === 'object' && 'options' in tsLoader) {
        tsLoader.options = {
          ...tsLoader.options,
          compilerOptions: {
            ...tsLoader.options?.compilerOptions,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
          },
        };
      }
    }

    // Add PostCSS loader for CSS files to enable Tailwind processing
    const cssRule = config.module?.rules?.find((rule: any) =>
      rule.test && rule.test.toString().includes('.css')
    );

    if (cssRule && typeof cssRule === 'object' && 'use' in cssRule && Array.isArray(cssRule.use)) {
      // Find if postcss-loader already exists
      const hasPostcssLoader = cssRule.use.some((loader: any) => 
        loader.loader && loader.loader.includes('postcss-loader')
      );

      // Only add postcss-loader if it doesn't exist
      if (!hasPostcssLoader) {
        cssRule.use.splice(cssRule.use.length - 1, 0, {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
              ],
            },
          },
        });
      }
    }
    
    return config;
  },

};

export default config;