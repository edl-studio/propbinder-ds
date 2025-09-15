import type { Meta, StoryObj } from '@storybook/angular';
import { DsAvatarComponent } from './ds-avatar';

const meta: Meta<DsAvatarComponent> = {
  title: 'Primitives/Avatar',
  component: DsAvatarComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['initials', 'photo', 'icon'],
      description: 'The type of avatar display',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size of the avatar',
    },
    initials: {
      control: { type: 'text' },
      description: 'Initials to display (for initials type)',
    },
    src: {
      control: { type: 'text' },
      description: 'Image source URL (for photo type)',
    },
    alt: {
      control: { type: 'text' },
      description: 'Alternative text for the image',
    },
    iconName: {
      control: { type: 'text' },
      description: 'Icon name to display (for icon type)',
    },
    iconColor: {
      control: { type: 'text' },
      description: 'Color of the icon (automatically white for icon avatars)',
      table: { disable: true }, // Disable control since it's always white for icon avatars
    },
  },
};

export default meta;
type Story = StoryObj<DsAvatarComponent>;

export const Default: Story = {
  args: {
    type: 'initials',
    size: 'md',
    initials: 'JD',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="initials" size="sm" initials="JD"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Small (24px)</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="initials" size="md" initials="JD"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Medium (32px)</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="initials" size="lg" initials="JD"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Large (48px)</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="initials" size="xl" initials="JD"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">XLarge (64px)</span>
        </div>
      </div>
    `,
  }),
};

export const InitialsType: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="initials" size="md" initials="JD"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">John Doe</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="initials" size="md" initials="AS"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Alice Smith</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="initials" size="md" initials="MJ"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Michael Johnson</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="initials" size="md" initials="EB"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Emily Brown</span>
        </div>
      </div>
    `,
  }),
};

export const PhotoType: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar 
            type="photo" 
            size="md" 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            alt="John Doe"
          ></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">John Doe</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar 
            type="photo" 
            size="md" 
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
            alt="Alice Smith"
          ></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Alice Smith</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar 
            type="photo" 
            size="md" 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            alt="Michael Johnson"
          ></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Michael Johnson</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar 
            type="photo" 
            size="md" 
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
            alt="Emily Brown"
          ></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Emily Brown</span>
        </div>
      </div>
    `,
  }),
};

export const IconType: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="icon" size="sm" iconName="remixUser3Fill"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Small (6px radius)</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="icon" size="md" iconName="remixUser3Fill"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Medium (8px radius)</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="icon" size="lg" iconName="remixUser3Fill"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Large (12px radius)</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="icon" size="xl" iconName="remixUser3Fill"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">XLarge (16px radius)</span>
        </div>
      </div>
    `,
  }),
};

export const IconVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="icon" size="md" iconName="remixUser3Fill"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Default User</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="icon" size="md" iconName="remixTeamFill"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Team</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="icon" size="md" iconName="remixBuildingFill"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Organization</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
          <ds-avatar type="icon" size="md" iconName="remixRobotFill"></ds-avatar>
          <span style="font-size: 12px; color: var(--text-color-default-secondary);">Bot</span>
        </div>
      </div>
    `,
  }),
};

export const AllTypes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 2rem; align-items: start; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: var(--text-color-default-primary);">Initials (Always Round)</h3>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <ds-avatar type="initials" size="sm" initials="JD"></ds-avatar>
            <ds-avatar type="initials" size="md" initials="JD"></ds-avatar>
            <ds-avatar type="initials" size="lg" initials="JD"></ds-avatar>
            <ds-avatar type="initials" size="xl" initials="JD"></ds-avatar>
          </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: var(--text-color-default-primary);">Photo (Always Round)</h3>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <ds-avatar 
              type="photo" 
              size="sm" 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              alt="Profile"
            ></ds-avatar>
            <ds-avatar 
              type="photo" 
              size="md" 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              alt="Profile"
            ></ds-avatar>
            <ds-avatar 
              type="photo" 
              size="lg" 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              alt="Profile"
            ></ds-avatar>
            <ds-avatar 
              type="photo" 
              size="xl" 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              alt="Profile"
            ></ds-avatar>
          </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: var(--text-color-default-primary);">Icon (Brand Background + Depth)</h3>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <ds-avatar type="icon" size="sm" iconName="remixUser3Fill"></ds-avatar>
            <ds-avatar type="icon" size="md" iconName="remixUser3Fill"></ds-avatar>
            <ds-avatar type="icon" size="lg" iconName="remixUser3Fill"></ds-avatar>
            <ds-avatar type="icon" size="xl" iconName="remixUser3Fill"></ds-avatar>
          </div>
          <div style="font-size: 12px; color: var(--text-color-default-secondary);">
            6px → 8px → 12px → 16px radius<br/>
            depth-sm → depth-sm → depth-md → depth-lg
          </div>
        </div>
      </div>
    `,
  }),
};

export const Static: Story = {
  args: {
    type: 'initials',
    size: 'md',
    initials: 'JD',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <ds-avatar 
          [type]="type"
          [size]="size"
          [initials]="initials"
          [src]="src"
          [alt]="alt"
          [iconName]="iconName"
          [iconColor]="iconColor"
        ></ds-avatar>
        <p style="font-size: 0.875rem; color: var(--text-color-default-secondary);">
          Static avatar with no interactions
        </p>
      </div>
    `,
  }),
};
