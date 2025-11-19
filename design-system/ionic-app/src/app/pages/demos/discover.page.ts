import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-discover',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-content">
      <div class="header-section">
        <h1 class="heading-2xl">Discover</h1>
        <p class="body-base-regular" style="color: var(--text-color-default-secondary); margin-top: 8px;">
          Explore what's new and trending
        </p>
      </div>

      <div class="discovery-grid">
        @for (item of discoveryItems; track item.id) {
          <div class="discovery-card">
            <div class="discovery-card__image" [style.background-color]="item.color"></div>
            <div class="discovery-card__content">
              <h3 class="ui-base-semiBold" style="margin-bottom: 4px;">{{ item.title }}</h3>
              <p class="body-sm-regular" style="color: var(--text-color-default-secondary);">
                {{ item.description }}
              </p>
              <div class="discovery-card__meta">
                <span class="body-xs-medium" style="color: var(--text-color-default-tertiary);">
                  {{ item.category }}
                </span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .page-content {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header-section {
      margin-bottom: 24px;
    }

    .discovery-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }

    @media (min-width: 768px) {
      .discovery-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
    }

    @media (min-width: 992px) {
      .discovery-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }
    }

    .discovery-card {
      background: var(--color-background-neutral-primary);
      border: 1px solid var(--border-color-default);
      border-radius: 12px;
      overflow: hidden;
      transition: all var(--transition-duration-fast) var(--ease-smooth);
      cursor: pointer;
    }

    .discovery-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--box-shadow-md);
    }

    .discovery-card__image {
      width: 100%;
      height: 160px;
    }

    .discovery-card__content {
      padding: 16px;
    }

    .discovery-card__meta {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--border-color-default);
    }
  `]
})
export class MobileDiscoverPageComponent {
  discoveryItems = [
    {
      id: '1',
      title: 'Design Systems',
      description: 'Building scalable component libraries',
      category: 'Development',
      color: 'var(--color-brand-weak)'
    },
    {
      id: '2',
      title: 'Mobile UX',
      description: 'Creating intuitive mobile experiences',
      category: 'Design',
      color: 'var(--color-success-weak)'
    },
    {
      id: '3',
      title: 'Responsive Layouts',
      description: 'Adapting across all screen sizes',
      category: 'Development',
      color: 'var(--color-blue-weak)'
    },
    {
      id: '4',
      title: 'Typography',
      description: 'Perfecting the art of readable text',
      category: 'Design',
      color: 'var(--color-light-purple-weak)'
    },
    {
      id: '5',
      title: 'Performance',
      description: 'Optimizing for speed and efficiency',
      category: 'Development',
      color: 'var(--color-orange-weak)'
    },
    {
      id: '6',
      title: 'Accessibility',
      description: 'Making apps usable for everyone',
      category: 'Quality',
      color: 'var(--color-pink-weak)'
    }
  ];
}

