import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { applicationConfig } from '@storybook/angular';
import { provideAllRemixIcons } from '../src/app/lib/icons';
const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideAllRemixIcons()
      ]
    })
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['*'],
        method: 'alphabetical'
      },
    },
  },
};

export default preview;