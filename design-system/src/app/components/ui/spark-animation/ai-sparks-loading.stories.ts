import { Meta, StoryObj } from '@storybook/angular';
import { AiSparksLoadingComponent } from './ai-sparks-loading.component';

const meta: Meta<AiSparksLoadingComponent> = {
  title: 'Primitives/AISparksLoading',
  component: AiSparksLoadingComponent,
  tags: ['autodocs'],
  argTypes: {
    sparkImagePath: {
      control: { type: 'text' },
      description: 'Path to the spark image asset'
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'Whether the loading animation is active'
    },
    customSparks: {
      control: { type: 'object' },
      description: 'Optional custom spark configurations'
    }
  }
};

export default meta;
type Story = StoryObj<AiSparksLoadingComponent>;

export const Example: Story = {
  args: {
    sparkImagePath: './Assets/ai-spark.png',
    isLoading: true
  }
};