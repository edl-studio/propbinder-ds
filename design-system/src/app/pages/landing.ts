import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="landing">
      <div class="landing__header">
        <img src="favicon.ico" alt="Propbinder Logo" class="landing__logo" />
        <h1 class="landing__title">Propbinder Design System</h1>
        <p class="landing__description">
          Explore our comprehensive design system with interactive components and documentation.
        </p>
      </div>

      <div class="landing__cards">
        <a href="/storybook.html" class="landing__card">
          <div class="landing__card-icon">📚</div>
          <h2 class="landing__card-title">Storybook</h2>
          <p class="landing__card-description">
            Interactive component library with documentation, examples, and testing tools.
          </p>
        </a>

        <a routerLink="/layout-preview" class="landing__card">
          <div class="landing__card-icon">🔧</div>
          <h2 class="landing__card-title">Layout Preview</h2>
          <p class="landing__card-description">
            Debug and test the responsive app layout with interactive controls and real-time feedback.
          </p>
        </a>
      </div>

      <footer class="landing__footer">
        <p>Built with Angular, Storybook, and Tailwind CSS</p>
      </footer>
    </div>
  `,
  styles: [`
    .landing {
      min-height: 100vh;
      padding: 48px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(135deg, #6B5FF5 0%, #4B3FD5 100%);
      color: white;
    }

    .landing__header {
      text-align: center;
      margin-bottom: 48px;
    }

    .landing__logo {
      width: 64px;
      height: 64px;
      margin-bottom: 24px;
    }

    .landing__title {
      font-size: 36px;
      font-weight: 600;
      margin: 0 0 16px;
    }

    .landing__description {
      font-size: 18px;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }

    .landing__cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      width: 100%;
      max-width: 800px;
      margin-bottom: 48px;
    }

    .landing__card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      border-radius: 12px;
      padding: 24px;
      text-decoration: none;
      color: white;
      transition: transform 0.2s ease, background-color 0.2s ease;
    }

    .landing__card:hover {
      transform: translateY(-4px);
      background: rgba(255, 255, 255, 0.15);
    }

    .landing__card-icon {
      font-size: 32px;
      margin-bottom: 16px;
    }

    .landing__card-title {
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 8px;
    }

    .landing__card-description {
      font-size: 16px;
      opacity: 0.9;
      margin: 0;
      line-height: 1.5;
    }

    .landing__footer {
      margin-top: auto;
      text-align: center;
      opacity: 0.7;
      font-size: 14px;
    }
  `]
})
export class LandingComponent {}
