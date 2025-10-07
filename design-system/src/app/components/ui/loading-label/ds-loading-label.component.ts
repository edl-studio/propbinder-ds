import { Component, input, signal, effect, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsSpinnerComponent } from '../spinner/ds-spinner.component';
import { IconSize } from '../icon/ds-icon';

/**
 * Loading Label Component
 * 
 * Displays a sequence of loading messages with smooth transitions and animated ellipsis.
 * Messages slide in/out vertically and ellipsis dots animate independently.
 * 
 * @example
 * ```html
 * <ds-loading-label
 *   [messages]="[
 *     'Reviewing tenant inquiries',
 *     'Summarising maintenance patterns',
 *     'Updating your recommendations'
 *   ]"
 *   styleClass="body-sm-regular"
 * />
 * ```
 */
@Component({
  selector: 'ds-loading-label',
  standalone: true,
  imports: [CommonModule, DsSpinnerComponent],
  template: `
    <div class="loading-label" [class]="styleClass()">
      <div class="loading-label__content">
        <div class="loading-label__spinner">
          <ds-spinner [size]="spinnerSize()" />
        </div>
        <div class="loading-label__message-container">
          <!-- Hidden messages to size the container -->
          @for (message of messages(); track message) {
            <div 
              class="loading-label__message loading-label__message--hidden"
              [class.loading-label__message--shimmer]="useShimmer()"
            >
              {{ message }}<span class="loading-label__dots">...</span>
            </div>
          }
          <!-- Visible animated message -->
          <div 
            class="loading-label__message"
            [class.loading-label__message--exiting]="isExiting()"
            [class.loading-label__message--entering]="isEntering()"
            [class.loading-label__message--shimmer]="useShimmer()"
          >
            {{ currentMessage() }}<span class="loading-label__dots">...</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-label {
      position: relative;
      overflow: hidden;
      display: inline-block;
    }

    .loading-label__content {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .loading-label__spinner {
      flex-shrink: 0;
      transform: translateY(-1px); /* Optical alignment */
    }

    .loading-label__message-container {
      position: relative;
      height: 1.5em; /* Fixed height for consistent layout */
      overflow: hidden;
    }

    .loading-label__message {
      transform-origin: left center;
      transition: transform var(--transition-duration-normal) var(--ease-smooth),
                  opacity var(--transition-duration-normal) var(--ease-smooth);
      white-space: nowrap;
      position: relative; /* Ensure positioning context for shimmer */
    }

    .loading-label__message--hidden {
      visibility: hidden;
      position: static;
      height: 0;
      overflow: hidden;
    }

    .loading-label__message:not(.loading-label__message--hidden) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

    /* Custom shimmer effect for loading labels */
    .loading-label__message--shimmer {
      position: relative;
      color: var(--text-color-default-tertiary);
    }

    .loading-label__message--shimmer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0) 30%,
        rgba(255, 255, 255, 0.6) 50%,
        rgba(255, 255, 255, 0) 70%,
        transparent 100%
      );
      background-size: 500px 100%;
      animation: loading-label-shimmer 4s infinite linear;
      pointer-events: none;
    }

    @keyframes loading-label-shimmer {
      0% {
        background-position: -500px 0;
      }
      100% {
        background-position: 500px 0;
      }
    }

    .loading-label__message--exiting {
      transform: translateY(100%);
      opacity: 0;
    }

    .loading-label__message--entering {
      transform: translateY(-100%);
      opacity: 0;
    }

    .loading-label__dots {
      display: inline-block;
      animation: dot-animation 1.4s infinite steps(4, jump-none);
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }

    @keyframes dot-animation {
      0% { clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%); }
      25% { clip-path: polygon(0 0, 33% 0, 33% 100%, 0% 100%); }
      50% { clip-path: polygon(0 0, 66% 0, 66% 100%, 0% 100%); }
      75% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class DsLoadingLabelComponent {
  /** Array of loading messages to cycle through */
  messages = input.required<string[]>();
  
  /** CSS class for text styling (e.g., body-sm-regular) */
  styleClass = input<string>('');
  
  /** Size of the spinner in pixels 
   * @default '14px'
   */
  spinnerSize = input<IconSize>('14px');
  
  /** Whether to apply shimmer effect to the text 
   * @default true
   */
  useShimmer = input<boolean>(true);

  /** Current message index */
  private currentIndex = signal(0);
  
  /** Current message being displayed */
  currentMessage = signal('');
  
  /** Animation state signals */
  isExiting = signal(false);
  isEntering = signal(false);

  constructor() {
    // Initialize first message
    effect(() => {
      if (this.messages().length > 0) {
        this.currentMessage.set(this.messages()[0]);
        this.startMessageCycle();
      }
    });
  }

  private startMessageCycle() {
    setInterval(() => {
      this.cycleToNextMessage();
    }, 5000); // Change message every 5 seconds
  }

  private async cycleToNextMessage() {
    // Start exit animation
    this.isExiting.set(true);
    
    // Wait for exit animation
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Update index and message
    this.currentIndex.set((this.currentIndex() + 1) % this.messages().length);
    this.currentMessage.set(this.messages()[this.currentIndex()]);
    
    // Start enter animation
    this.isExiting.set(false);
    this.isEntering.set(true);
    
    // Complete enter animation
    setTimeout(() => {
      this.isEntering.set(false);
    }, 200);
  }
}
