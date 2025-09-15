import { Component, input, computed, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconComponent } from '../icon/ds-icon';

export type AvatarType = 'initials' | 'photo' | 'icon';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'ds-avatar',
  imports: [CommonModule, DsIconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-avatar.css'],
  template: `
    <div [class]="avatarClasses()">
      <!-- Initials Avatar -->
      @if (type() === 'initials') {
        <span [class]="initialsClasses()">
          {{ displayInitials() }}
        </span>
      }
      
      <!-- Photo Avatar -->
      @if (type() === 'photo') {
        <img 
          [src]="src()" 
          [alt]="alt() || 'Avatar'"
          [class]="imageClasses()"
          (error)="onImageError()"
        />
      }
      
      <!-- Icon Avatar -->
      @if (type() === 'icon') {
        <ds-icon 
          [name]="iconName() || 'remixUser3Fill'"
          [size]="iconSize()"
          color="var(--text-color-default-primary-inverse)"
          class="avatar__icon"
        />
      }
    </div>
  `,
})
export class DsAvatarComponent {
  // Input signals
  type = input<AvatarType>('initials');
  size = input<AvatarSize>('md');
  
  // Initials specific inputs
  initials = input<string>('');
  
  // Photo specific inputs
  src = input<string>('');
  alt = input<string>('');
  
  // Icon specific inputs
  iconName = input<string>('remixUser3Fill');
  iconColor = input<string>('secondary');
  
  // Computed properties
  avatarClasses = computed(() => {
    const classes = ['avatar'];
    
    // Size classes
    classes.push(`avatar--${this.size()}`);
    
    // Type classes
    classes.push(`avatar--${this.type()}`);
    
    // Add depth classes for icon avatars based on size
    if (this.type() === 'icon') {
      const depthClass = this.getDepthClass();
      classes.push(depthClass);
    }
    
    return classes.join(' ');
  });
  
  initialsClasses = computed(() => {
    const classes = ['avatar__initials'];
    classes.push(`avatar__initials--${this.size()}`);
    return classes.join(' ');
  });
  
  imageClasses = computed(() => {
    const classes = ['avatar__image'];
    return classes.join(' ');
  });
  
  displayInitials = computed(() => {
    const initialsValue = this.initials();
    if (!initialsValue) return '';
    
    // Take first 2 characters and uppercase them
    return initialsValue.substring(0, 2).toUpperCase();
  });
  
  iconSize = computed(() => {
    const sizeMap: Record<AvatarSize, string> = {
      xs: '12px',
      sm: '14px',
      md: '18px', 
      lg: '24px',
      xl: '32px'
    };
    return sizeMap[this.size()];
  });
  
  // Get depth class based on avatar size for icon avatars
  private getDepthClass(): string {
    const size = this.size();
    const depthMap: Record<AvatarSize, string> = {
      xs: 'depth-sm',
      sm: 'depth-sm',
      md: 'depth-sm',
      lg: 'depth-md',
      xl: 'depth-lg'
    };
    return depthMap[size];
  }
  
  // Event handlers
  onImageError() {
    // Could emit an event or handle fallback logic here
    console.warn('Avatar image failed to load');
  }
}
