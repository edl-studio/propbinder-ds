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
    
    return config;
  },

};

export default config;