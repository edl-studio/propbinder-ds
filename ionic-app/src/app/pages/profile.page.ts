import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DsDataItemComponent,
  DsBadgeComponent
} from '@propbinder/design-system';

@Component({
  selector: 'app-mobile-profile',
  standalone: true,
  imports: [CommonModule, DsDataItemComponent, DsBadgeComponent],
  template: `
    <div class="page-content">
      <div class="profile-header">
        <div class="profile-avatar">
          <span class="ui-2xl-semiBold" style="color: var(--text-color-default-primary-inverse);">JD</span>
        </div>
        <h1 class="heading-2xl" style="margin-top: 16px;">John Doe</h1>
        <p class="body-base-regular" style="color: var(--text-color-default-secondary); margin-top: 4px;">
          Product Designer
        </p>
        <ds-badge variant="brand" size="md" style="margin-top: 12px;">
          Pro Member
        </ds-badge>
      </div>

      <div class="profile-stats">
        <div class="stat-item">
          <div class="ui-2xl-semiBold" style="color: var(--color-brand-base);">42</div>
          <div class="body-sm-regular" style="color: var(--text-color-default-secondary); margin-top: 4px;">Projects</div>
        </div>
        <div class="stat-item">
          <div class="ui-2xl-semiBold" style="color: var(--color-success-base);">1.2k</div>
          <div class="body-sm-regular" style="color: var(--text-color-default-secondary); margin-top: 4px;">Followers</div>
        </div>
        <div class="stat-item">
          <div class="ui-2xl-semiBold" style="color: var(--color-blue-base);">328</div>
          <div class="body-sm-regular" style="color: var(--text-color-default-secondary); margin-top: 4px;">Following</div>
        </div>
      </div>

      <div class="profile-section">
        <h2 class="ui-lg-semiBold" style="margin-bottom: 16px;">Account Information</h2>
        <div class="info-list">
          <ds-data-item
            [label]="'Email'"
            [value]="'john.doe@example.com'"
            [layout]="'horizontal'"
            [valueType]="'text'"
          />
          <ds-data-item
            [label]="'Location'"
            [value]="'San Francisco, CA'"
            [layout]="'horizontal'"
            [valueType]="'text'"
          />
          <ds-data-item
            [label]="'Member Since'"
            [value]="'January 2024'"
            [layout]="'horizontal'"
            [valueType]="'text'"
          />
          <ds-data-item
            [label]="'Language'"
            [value]="'English'"
            [layout]="'horizontal'"
            [valueType]="'text'"
          />
        </div>
      </div>

      <div class="profile-section">
        <h2 class="ui-lg-semiBold" style="margin-bottom: 16px;">Preferences</h2>
        <div class="preference-list">
          <div class="preference-item">
            <span class="body-base-regular">Email Notifications</span>
            <div class="toggle toggle--on"></div>
          </div>
          <div class="preference-item">
            <span class="body-base-regular">Push Notifications</span>
            <div class="toggle toggle--on"></div>
          </div>
          <div class="preference-item">
            <span class="body-base-regular">Dark Mode</span>
            <div class="toggle"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-content {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }

    .profile-header {
      text-align: center;
      padding: 32px 0;
    }

    .profile-avatar {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-brand-base), var(--color-brand-base-hover));
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }

    .profile-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin: 32px 0;
      padding: 24px;
      background: var(--color-background-neutral-secondary);
      border-radius: 16px;
    }

    .stat-item {
      text-align: center;
    }

    .profile-section {
      margin-bottom: 32px;
      padding: 24px;
      background: var(--color-background-neutral-secondary);
      border-radius: 16px;
    }

    .info-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .preference-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .preference-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid var(--border-color-default);
    }

    .preference-item:last-child {
      border-bottom: none;
    }

    .toggle {
      width: 44px;
      height: 24px;
      border-radius: 12px;
      background: var(--color-background-neutral-disabled);
      position: relative;
      transition: background-color var(--transition-duration-fast);
    }

    .toggle::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: white;
      top: 2px;
      left: 2px;
      transition: transform var(--transition-duration-fast);
    }

    .toggle--on {
      background: var(--color-brand-base);
    }

    .toggle--on::after {
      transform: translateX(20px);
    }
  `]
})
export class MobileProfilePageComponent {}

