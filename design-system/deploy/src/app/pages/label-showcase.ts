import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsLabelComponent } from '../components/ui/label/ds-label';

@Component({
  selector: 'app-label-showcase',
  standalone: true,
  imports: [CommonModule, DsLabelComponent],
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div class="tw-min-h-screen tw-bg-page tw-text-primary tw-p-8">
      <div class="tw-max-w-6xl tw-mx-auto">
        <!-- Header -->
        <header class="tw-mb-12 tw-text-center">
          <h1 class="tw-text-4xl tw-font-bold tw-text-primary tw-mb-4">Label Component Preview</h1>
          <p class="tw-text-lg tw-text-secondary tw-max-w-2xl tw-mx-auto">
            A comprehensive showcase of the label component from the Propbinder Design System, demonstrating various use cases and styling options.
          </p>
        </header>

        <main class="tw-space-y-12">
          <!-- Basic Label Examples -->
          <section class="tw-bg-interactive-default tw-border tw-border-border-default tw-rounded-lg tw-p-8">
            <h2 class="tw-text-2xl tw-font-semibold tw-text-primary tw-mb-6">Basic Label Examples</h2>
            
            <h3 class="tw-text-xl tw-font-medium tw-text-primary tw-mb-4">Simple Labels</h3>
            <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 tw-mb-8">
              <div class="tw-border tw-border-border-default tw-rounded-lg tw-p-6">
                <h4 class="tw-text-base tw-font-medium tw-text-primary tw-mb-4">Default Label</h4>
                <div class="tw-space-y-3">
                  <ds-label for="default-input">Default Label</ds-label>
                  <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-border-default tw-rounded-md tw-bg-interactive-default" 
                         id="default-input" type="text" placeholder="Enter text...">
                </div>
              </div>

              <div class="tw-border tw-border-border-default tw-rounded-lg tw-p-6">
                <h4 class="tw-text-base tw-font-medium tw-text-primary tw-mb-4">Required Field</h4>
                <div class="tw-space-y-3">
                  <ds-label for="required-input" className="after:content-['_*'] after:tw-text-destructive-base">
                    Email Address
                  </ds-label>
                  <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-border-default tw-rounded-md tw-bg-interactive-default" 
                         id="required-input" type="email" placeholder="you@example.com" required>
                </div>
              </div>

              <div class="tw-border tw-border-border-default tw-rounded-lg tw-p-6">
                <h4 class="tw-text-base tw-font-medium tw-text-primary tw-mb-4">Optional Field</h4>
                <div class="tw-space-y-3">
                  <ds-label for="optional-input" className="after:content-['_(optional)'] after:tw-text-secondary after:tw-font-normal">
                    Middle Name
                  </ds-label>
                  <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-border-default tw-rounded-md tw-bg-interactive-default" 
                         id="optional-input" type="text" placeholder="Optional field">
                </div>
              </div>
            </div>

            <!-- Label Variations -->
            <h3 class="tw-text-xl tw-font-medium tw-text-primary tw-mb-4">Label Variations</h3>
            <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
              
              <div class="tw-border tw-border-border-default tw-rounded-lg tw-p-6">
                <h4 class="tw-text-base tw-font-medium tw-text-primary tw-mb-4">Small Label</h4>
                <div class="tw-space-y-3">
                  <ds-label for="small-input" className="tw-text-xs">
                    Small Label Text
                  </ds-label>
                  <input class="tw-w-full tw-h-8 tw-px-2 tw-text-sm tw-border tw-border-border-default tw-rounded-md tw-bg-interactive-default" 
                         id="small-input" type="text" placeholder="Small input">
                </div>
              </div>

              <div class="tw-border tw-border-border-default tw-rounded-lg tw-p-6">
                <h4 class="tw-text-base tw-font-medium tw-text-primary tw-mb-4">Medium Weight</h4>
                <div class="tw-space-y-3">
                  <ds-label for="medium-input" className="tw-font-medium">
                    Medium Weight Label
                  </ds-label>
                  <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-border-default tw-rounded-md tw-bg-interactive-default" 
                         id="medium-input" type="text" placeholder="Medium weight">
                </div>
              </div>

              <div class="tw-border tw-border-border-default tw-rounded-lg tw-p-6">
                <h4 class="tw-text-base tw-font-medium tw-text-primary tw-mb-4">Bold Label</h4>
                <div class="tw-space-y-3">
                  <ds-label for="bold-input" className="tw-font-semibold">
                    Bold Label Text
                  </ds-label>
                  <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-border-default tw-rounded-md tw-bg-interactive-default" 
                         id="bold-input" type="text" placeholder="Bold label">
                </div>
              </div>

              <div class="tw-border tw-border-border-default tw-rounded-lg tw-p-6">
                <h4 class="tw-text-base tw-font-medium tw-text-primary tw-mb-4">Brand Color</h4>
                <div class="tw-space-y-3">
                  <ds-label for="brand-input" className="tw-text-brand">
                    Brand Colored Label
                  </ds-label>
                  <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-brand-base tw-rounded-md tw-bg-interactive-default tw-focus:tw-ring-2 tw-focus:tw-ring-brand-weak" 
                         id="brand-input" type="text" placeholder="Brand themed">
                </div>
              </div>
            </div>
          </section>

          <!-- Form Examples -->
          <section class="tw-bg-interactive-default tw-border tw-border-border-default tw-rounded-lg tw-p-8">
            <h2 class="tw-text-2xl tw-font-semibold tw-text-primary tw-mb-6">Form Examples</h2>
            
            <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
              <!-- Login Form -->
              <div class="tw-border tw-border-border-default tw-rounded-lg tw-p-6">
                <h3 class="tw-text-lg tw-font-medium tw-text-primary tw-mb-4">Login Form</h3>
                <form class="tw-space-y-4">
                  <div>
                    <ds-label for="login-email" className="after:content-['_*'] after:tw-text-destructive-base">
                      Email Address
                    </ds-label>
                    <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-border-default tw-rounded-md tw-bg-interactive-default tw-mt-1" 
                           id="login-email" type="email" placeholder="you@example.com" required>
                  </div>
                  
                  <div>
                    <ds-label for="login-password" className="after:content-['_*'] after:tw-text-destructive-base">
                      Password
                    </ds-label>
                    <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-border-default tw-rounded-md tw-bg-interactive-default tw-mt-1" 
                           id="login-password" type="password" placeholder="••••••••" required>
                  </div>
                  
                  <div class="tw-flex tw-items-center">
                    <input class="tw-mr-2" id="remember-me" type="checkbox">
                    <ds-label for="remember-me" className="tw-text-sm tw-cursor-pointer">
                      Remember me
                    </ds-label>
                  </div>
                </form>
              </div>

              <!-- Contact Form -->
              <div class="tw-border tw-border-border-default tw-rounded-lg tw-p-6">
                <h3 class="tw-text-lg tw-font-medium tw-text-primary tw-mb-4">Contact Form</h3>
                <form class="tw-space-y-4">
                  <div>
                    <ds-label for="contact-name" className="after:content-['_*'] after:tw-text-destructive-base">
                      Full Name
                    </ds-label>
                    <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-border-default tw-rounded-md tw-bg-interactive-default tw-mt-1" 
                           id="contact-name" type="text" placeholder="John Doe" required>
                  </div>
                  
                  <div>
                    <ds-label for="contact-email" className="after:content-['_*'] after:tw-text-destructive-base">
                      Email Address
                    </ds-label>
                    <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-border-default tw-rounded-md tw-bg-interactive-default tw-mt-1" 
                           id="contact-email" type="email" placeholder="john@example.com" required>
                  </div>
                  
                  <div>
                    <ds-label for="contact-phone" className="after:content-['_(optional)'] after:tw-text-secondary after:tw-font-normal">
                      Phone Number
                    </ds-label>
                    <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-border-default tw-rounded-md tw-bg-interactive-default tw-mt-1" 
                           id="contact-phone" type="tel" placeholder="+1 (555) 123-4567">
                  </div>
                  
                  <div>
                    <ds-label for="contact-message" className="after:content-['_*'] after:tw-text-destructive-base">
                      Message
                    </ds-label>
                    <textarea class="tw-w-full tw-h-24 tw-px-3 tw-py-2 tw-border tw-border-border-default tw-rounded-md tw-bg-interactive-default tw-mt-1 tw-resize-none" 
                              id="contact-message" placeholder="Your message here..." required></textarea>
                  </div>
                </form>
              </div>
            </div>
          </section>

          <!-- State Examples -->
          <section class="tw-bg-interactive-default tw-border tw-border-border-default tw-rounded-lg tw-p-8">
            <h2 class="tw-text-2xl tw-font-semibold tw-text-primary tw-mb-6">State Examples</h2>
            
            <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
              
              <!-- Success State -->
              <div class="tw-border tw-border-success-base tw-rounded-lg tw-p-6 tw-bg-success-weak">
                <h4 class="tw-text-base tw-font-medium tw-text-success-strong tw-mb-4">Success State</h4>
                <div class="tw-space-y-3">
                  <ds-label for="success-input" className="tw-text-success-strong">
                    Valid Email
                  </ds-label>
                  <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-success-base tw-rounded-md tw-bg-page" 
                         id="success-input" type="email" value="user@example.com" readonly>
                  <p class="tw-text-xs tw-text-success-base">✓ Email address is valid</p>
                </div>
              </div>

              <!-- Warning State -->
              <div class="tw-border tw-border-warning-base tw-rounded-lg tw-p-6 tw-bg-warning-weak">
                <h4 class="tw-text-base tw-font-medium tw-text-warning-strong tw-mb-4">Warning State</h4>
                <div class="tw-space-y-3">
                  <ds-label for="warning-input" className="tw-text-warning-strong">
                    Password Strength
                  </ds-label>
                  <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-warning-base tw-rounded-md tw-bg-page" 
                         id="warning-input" type="password" placeholder="Enter password">
                  <p class="tw-text-xs tw-text-warning-base">⚠ Password should be stronger</p>
                </div>
              </div>

              <!-- Error State -->
              <div class="tw-border tw-border-destructive-base tw-rounded-lg tw-p-6 tw-bg-destructive-weak">
                <h4 class="tw-text-base tw-font-medium tw-text-destructive-strong tw-mb-4">Error State</h4>
                <div class="tw-space-y-3">
                  <ds-label for="error-input" className="tw-text-destructive-strong">
                    Invalid Input
                  </ds-label>
                  <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-destructive-base tw-rounded-md tw-bg-page" 
                         id="error-input" type="email" value="invalid-email" readonly>
                  <p class="tw-text-xs tw-text-destructive-base">✗ Please enter a valid email address</p>
                </div>
              </div>

              <!-- Disabled State -->
              <div class="tw-border tw-border-border-default tw-rounded-lg tw-p-6 tw-opacity-60">
                <h4 class="tw-text-base tw-font-medium tw-text-primary tw-mb-4">Disabled State</h4>
                <div class="tw-space-y-3">
                  <ds-label for="disabled-input" className="tw-text-disabled">
                    Disabled Field
                  </ds-label>
                  <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-border-default tw-rounded-md tw-bg-interactive-default-disabled tw-cursor-not-allowed" 
                         id="disabled-input" type="text" placeholder="Cannot edit" disabled>
                  <p class="tw-text-xs tw-text-disabled">This field is currently disabled</p>
                </div>
              </div>

              <!-- Focus State -->
              <div class="tw-border tw-border-brand-base tw-rounded-lg tw-p-6 tw-bg-brand-weak">
                <h4 class="tw-text-base tw-font-medium tw-text-brand-strong tw-mb-4">Focus State</h4>
                <div class="tw-space-y-3">
                  <ds-label for="focus-input" className="tw-text-brand-strong">
                    Focused Input
                  </ds-label>
                  <input class="tw-w-full tw-h-10 tw-px-3 tw-border-2 tw-border-brand-base tw-rounded-md tw-bg-page tw-ring-2 tw-ring-brand-weak" 
                         id="focus-input" type="text" placeholder="Click to focus">
                  <p class="tw-text-xs tw-text-brand-base">Input is currently focused</p>
                </div>
              </div>

              <!-- Loading State -->
              <div class="tw-border tw-border-border-default tw-rounded-lg tw-p-6">
                <h4 class="tw-text-base tw-font-medium tw-text-primary tw-mb-4">Loading State</h4>
                <div class="tw-space-y-3">
                  <ds-label for="loading-input" className="tw-flex tw-items-center">
                    <span>Processing...</span>
                    <div class="tw-ml-2 tw-animate-spin tw-h-4 tw-w-4 tw-border-2 tw-border-brand-base tw-border-t-transparent tw-rounded-full"></div>
                  </ds-label>
                  <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-border-default tw-rounded-md tw-bg-interactive-default tw-animate-pulse" 
                         id="loading-input" type="text" placeholder="Loading..." readonly>
                  <p class="tw-text-xs tw-text-secondary">Please wait while we process your request</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Accessibility Examples -->
          <section class="tw-bg-interactive-default tw-border tw-border-border-default tw-rounded-lg tw-p-8">
            <h2 class="tw-text-2xl tw-font-semibold tw-text-primary tw-mb-6">Accessibility Features</h2>
            
            <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
              
              <div class="tw-border tw-border-border-default tw-rounded-lg tw-p-6">
                <h4 class="tw-text-base tw-font-medium tw-text-primary tw-mb-4">Screen Reader Support</h4>
                <div class="tw-space-y-3">
                  <ds-label for="sr-input" className="tw-sr-only">
                    Screen Reader Only Label
                  </ds-label>
                  <input class="tw-w-full tw-h-10 tw-px-3 tw-border tw-border-border-default tw-rounded-md tw-bg-interactive-default" 
                         id="sr-input" type="text" placeholder="Label only visible to screen readers" 
                         aria-label="Screen Reader Only Label">
                  <p class="tw-text-xs tw-text-secondary">Label is hidden visually but available to screen readers</p>
                </div>
              </div>

              <div class="tw-border tw-border-border-default tw-rounded-lg tw-p-6">
                <h4 class="tw-text-base tw-font-medium tw-text-primary tw-mb-4">High Contrast</h4>
                <div class="tw-space-y-3">
                  <ds-label for="contrast-input" className="tw-text-primary tw-font-semibold">
                    High Contrast Label
                  </ds-label>
                  <input class="tw-w-full tw-h-10 tw-px-3 tw-border-2 tw-border-primary tw-rounded-md tw-bg-page tw-text-primary" 
                         id="contrast-input" type="text" placeholder="High contrast styling">
                  <p class="tw-text-xs tw-text-primary">Enhanced contrast for better accessibility</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <!-- Footer -->
        <footer class="tw-text-center tw-py-8 tw-border-t tw-border-border-default tw-mt-12">
          <p class="tw-text-secondary">
            Label Component Preview - Propbinder Design System
          </p>
          <p class="tw-text-tertiary tw-text-sm tw-mt-2">
            All labels use the ds-label component with custom Tailwind classes
          </p>
        </footer>
      </div>
    </div>
  `,
  styles: []
})
export class LabelShowcaseComponent {
}
