import { Component, ViewEncapsulation, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsLabelComponent } from '../label/ds-label';
import { DsIconComponent } from '../icon/ds-icon';
import { DsAvatarComponent } from '../avatar/ds-avatar';
import { DsBadgeComponent } from '../badge/ds-badge';

export type DataItemLayout = 'vertical' | 'horizontal';
export type DataItemValueType = 'text' | 'icon-text' | 'avatar-text' | 'badge' | 'multi-badge';

export interface DataItemBadgeConfig {
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'destructive' | 'blue' | 'light-purple' | 'pink' | 'salmon-orange' | 'orange' | 'lime-green' | 'grey';
  content: string;
  contentType?: 'text' | 'icon-text' | 'indicator-text';
  leadingIcon?: string;
  indicatorShape?: 'circle' | 'square';
}

@Component({
  selector: 'ds-data-item',
  standalone: true,
  imports: [CommonModule, DsLabelComponent, DsIconComponent, DsAvatarComponent, DsBadgeComponent],
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./ds-data-item.css'],
  template: `
    <div [class]="containerClasses()">
      <!-- Label Container -->
      <div [class]="labelContainerClasses()">
        <ds-label [className]="labelClassName()" [size]="layout() === 'horizontal' ? 'md' : 'sm'">
          {{ label() }}
        </ds-label>
      </div>
      
      <!-- Value Container -->
      <div [class]="valueContainerClasses()">
        <div class="data-item__value-container">
          @switch (valueType()) {
            @case ('text') {
              <span class="data-item__value-text ui-sm-regular">{{ value() }}</span>
            }
            
            @case ('icon-text') {
              <ds-icon [name]="iconName()!" size="16px" color="secondary" class="data-item__value-icon" />
              <span class="data-item__value-text ui-sm-regular">{{ value() }}</span>
            }
            
            @case ('avatar-text') {
              <ds-avatar
                [type]="avatarType()"
                [initials]="avatarInitials()"
                [src]="avatarSrc()"
                [iconName]="avatarIconName()"
                size="xs"
                class="data-item__value-avatar"
              />
              <span class="data-item__value-text ui-sm-regular">{{ value() }}</span>
            }
            
            @case ('badge') {
              <ds-badge
                [variant]="badgeVariant()"
                [contentType]="badgeContentType()"
                [content]="badgeContent()"
                [leadingIcon]="badgeIcon()"
                [indicatorShape]="badgeIndicatorShape()"
              />
            }
            @case ('multi-badge') {
              @if (badges()?.length) {
                @for (badge of badges(); track badge.content) {
                  <ds-badge
                    [variant]="badge.variant || 'default'"
                    [contentType]="badge.contentType || 'text'"
                    [content]="badge.content"
                    [leadingIcon]="badge.leadingIcon"
                    [indicatorShape]="badge.indicatorShape || 'circle'"
                  />
                }
              }
            }
          }
        </div>
      </div>
    </div>
  `,
})
export class DsDataItemComponent {
  // Basic inputs
  label = input.required<string>();
  value = input<string>('');
  layout = input<DataItemLayout>('vertical');
  valueType = input<DataItemValueType>('text');
  
  // Icon-text specific inputs
  iconName = input<string>();
  
  // Avatar-text specific inputs
  avatarType = input<'initials' | 'photo' | 'icon'>('initials');
  avatarInitials = input<string>('');
  avatarSrc = input<string>('');
  avatarIconName = input<string>('remixUser3Fill');
  
  // Badge specific inputs
  badgeVariant = input<'default' | 'brand' | 'success' | 'warning' | 'destructive' | 'blue' | 'light-purple' | 'pink' | 'salmon-orange' | 'orange' | 'lime-green' | 'grey'>('default');
  badgeContentType = input<'text' | 'icon-text' | 'indicator-text'>('text');
  badgeContent = input<string>('');
  badgeIcon = input<string>();
  badgeIndicatorShape = input<'circle' | 'square'>('circle');

  // Multi-badge specific inputs
  badges = input<DataItemBadgeConfig[]>();

  // Computed classes
  containerClasses = computed(() => {
    const classes = ['data-item'];
    classes.push(`data-item--${this.layout()}`);
    return classes.join(' ');
  });
  
  labelContainerClasses = computed(() => {
    const classes = ['data-item__label'];
    classes.push(`data-item__label--${this.layout()}`);
    return classes.join(' ');
  });
  
  valueContainerClasses = computed(() => {
    const classes = ['data-item__value'];
    classes.push(`data-item__value--${this.layout()}`);
    return classes.join(' ');
  });
  
  labelClassName = computed(() => {
    return 'data-item__label-text';
  });
}
