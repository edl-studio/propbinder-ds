import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeVariant } from '../badge/ds-badge';
import { DsLoadingLabelComponent } from '../loading-label/ds-loading-label.component';
import { DsButtonComponent } from '../button/ds-button';
import { DsIconComponent } from '../icon/ds-icon';
import { DsListComponent } from '../list/ds-list';
import { DsListItemComponent } from '../list-item/ds-list-item';
import { DsBadgeComponent } from '../badge/ds-badge';
import { DsMetadataItemComponent } from '../metadata-item/ds-metadata-item';
import { AiSparksLoadingComponent } from '../spark-animation/ai-sparks-loading.component';

export type PropertySuggestion = {
  title: string;
  priority: 'Critical' | 'Important' | 'Moderate';
  inquiryCount: number;
  timeAgo: string;
};

/**
 * Property Suggestions Component
 * 
 * Displays AI-powered property suggestions with three possible states:
 * 1. Loading - Shows processing state with animated messages
 * 2. Empty - Shows initial state with generate button
 * 3. Results - Shows list of property suggestions with actions
 * 
 * @example
 * ```html
 * <ds-property-suggestions
 *   [state]="'loading'"
 *   [suggestions]="suggestions"
 *   (generateClick)="handleGenerate()"
 *   (skipClick)="handleSkip($event)"
 *   (createTaskClick)="handleCreateTask($event)"
 * />
 * ```
 */
@Component({
  selector: 'ds-property-suggestions',
  standalone: true,
  imports: [
    CommonModule,
    DsLoadingLabelComponent,
    DsButtonComponent,
    DsIconComponent,
    DsListComponent,
    DsListItemComponent,
    DsBadgeComponent,
    DsMetadataItemComponent,
    AiSparksLoadingComponent
  ],
  template: `
    <div class="ai-suggestions-container elevation-tile">
      <!-- Header -->
      <div class="ai-suggestions-header">
        <div class="ai-suggestions-title">
          <h3 class="heading-xl">Property suggestions</h3>
          <div class="ai-badge depth-sm">
            <img src="/Assets/ai-spark.png" alt="" width="14" height="14" />
            <span>Propbinder AI</span>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="ai-suggestions-content">
        <div class="ai-suggestions-content-card">
          <!-- Loading State -->
          @if (state() === 'loading') {
            <div class="ai-processing-card">
              <ds-ai-sparks-loading
                [isLoading]="true"
                [sparkImagePath]="'/Assets/ai-spark.png'"
              />
              <div class="ai-processing-content">
                <h2 class="heading-lg">We're processing your property data</h2>
                <ds-loading-label
                  [messages]="[
                    'Reviewing tenant inquiries',
                    'Summarising maintenance patterns',
                    'Updating your recommendations'
                  ]"
                  styleClass="body-sm-regular"
                  spinnerSize="14px"
                  [useShimmer]="true"
                />
              </div>
            </div>
          }

          <!-- Empty State -->
          @if (state() === 'empty') {
            <div class="ai-empty-card">
              <div class="ai-empty-content">
                <h2 class="heading-lg">Stay ahead of your property issues</h2>
                <p class="body-sm-regular tw-text-default-secondary tw-mb-2">
                  Propbinder AI analyses your tenant inquiries, maintenance requests, and system logs to surface actionable insights.
                </p>
                <ds-button variant="ai-primary" class="depth-xs" (click)="generateClick.emit()">
                  <ds-icon slot="leading" name="remixSparkling2Fill" [color]="'var(--ai-gradient-color-1)'" />
                  <span>Generate suggestions</span>
                </ds-button>
              </div>
            </div>
          }

          <!-- Results State -->
          @if (state() === 'results' && suggestions().length > 0) {
            <div class="tw-p-2 tw-bg-white tw-rounded-lg">
              <ds-list>
                @for (suggestion of suggestions(); track suggestion.title) {
                  <ds-list-item [title]="suggestion.title">
                    <div slot="metadata">
                      <ds-badge 
                        [content]="suggestion.priority" 
                        contentType="indicator-text" 
                        [variant]="getPriorityVariant(suggestion.priority)"
                        [indicatorShape]="getPriorityShape(suggestion.priority)"
                      />
                      <ds-metadata-item 
                        icon="remixClipboardLine" 
                        [value]="'Based on ' + suggestion.inquiryCount + ' inquiries'" 
                      />
                      <ds-metadata-item 
                        icon="remixTimeLine" 
                        [value]="suggestion.timeAgo" 
                      />
                    </div>
                    <div slot="actions">
                      <ds-button 
                        variant="ghost" 
                        size="sm"
                        (click)="skipClick.emit(suggestion)"
                      >Skip</ds-button>
                      <ds-button 
                        variant="ai-primary" 
                        size="sm"
                        (click)="createTaskClick.emit(suggestion)"
                      >Create task</ds-button>
                    </div>
                  </ds-list-item>
                }
              </ds-list>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .ai-suggestions-container {
      @apply tw-rounded-2xl;
      background: linear-gradient(180deg, #EDE5FF 0%, #D1D7FF 100%);
    }

    .ai-suggestions-header {
      @apply tw-flex tw-items-center tw-justify-between tw-p-5;
    }

    .ai-suggestions-title {
      @apply tw-flex tw-items-center tw-gap-2;
    }

    .ai-badge {
      @apply tw-bg-[#221A4C] tw-py-1.5 tw-pl-2 tw-pr-3 tw-rounded-full tw-inline-flex tw-items-center tw-gap-1.5;

      img {
        @apply tw-w-3 tw-h-3;
        filter: brightness(1.4) contrast(1.1);
      }

      span {
        @apply tw-text-white tw-text-xs tw-font-medium tw-leading-none;
      }
    }

    .ai-suggestions-content {
      @apply tw-pt-0 tw-px-5 tw-pb-5;
    }

    .ai-suggestions-content-card {
      @apply tw-bg-white tw-rounded-lg;
    }

    .ai-processing-card {
      @apply tw-flex tw-items-center tw-p-5 tw-gap-12;
    }

    .ai-empty-card {
      @apply tw-flex tw-items-center tw-p-5 tw-gap-12;
    }

    .ai-empty-content {
      @apply tw-flex tw-flex-col tw-gap-2;
    }

    .ai-processing-content {
      @apply tw-flex tw-flex-col tw-gap-5;
    }

    .ai-processing-content h2 {
      @apply tw-text-default-primary;
    }

    .ai-processing-content p {
      @apply tw-text-default-secondary;
    }
  `]
})
export class DsPropertySuggestionsComponent {
  /** Current state of the component */
  state = input<'loading' | 'empty' | 'results'>('empty');

  /** List of property suggestions to display */
  suggestions = input<PropertySuggestion[]>([]);

  /** Event emitted when generate button is clicked */
  generateClick = output<void>();

  /** Event emitted when skip button is clicked */
  skipClick = output<PropertySuggestion>();

  /** Event emitted when create task button is clicked */
  createTaskClick = output<PropertySuggestion>();

  /** Get badge variant based on priority */
  protected getPriorityVariant(priority: string): BadgeVariant {
    switch (priority) {
      case 'Critical': return 'destructive';
      case 'Important': return 'warning';
      case 'Moderate': return 'blue';
      default: return 'blue';
    }
  }

  /** Get indicator shape based on priority */
  protected getPriorityShape(priority: string): 'triangle' | 'square' | 'circle' {
    switch (priority) {
      case 'Critical': return 'triangle';
      case 'Important': return 'square';
      case 'Moderate': return 'circle';
      default: return 'circle';
    }
  }
}
