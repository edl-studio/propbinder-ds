import { Meta, StoryObj } from '@storybook/angular';
import { AiSparksStaticComponent } from './ai-sparks-static.component';

const meta: Meta<AiSparksStaticComponent> = {
  title: 'Primitives/AISparksStatic',
  component: AiSparksStaticComponent,
  tags: ['autodocs'],
  argTypes: {
    sparkImagePath: {
      control: { type: 'text' },
      description: 'Path to the spark image asset'
    },
    animationState: {
      control: { type: 'select' },
      options: ['appear', 'static', 'disappear'],
      description: 'Current animation state'
    },
    customSparks: {
      control: { type: 'object' },
      description: 'Optional custom spark configurations'
    }
  }
};

export default meta;
type Story = StoryObj<AiSparksStaticComponent>;

export const Example: Story = {
  args: {
    sparkImagePath: './Assets/ai-spark.png',
    animationState: 'static'
  }
};