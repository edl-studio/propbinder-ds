import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tailwind-showcase',
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div class="tw-min-h-screen tw-bg-page tw-p-8">
      <div class="tw-max-w-6xl tw-mx-auto tw-space-y-12">
        
        <!-- Header -->
        <header class="tw-text-center tw-mb-16">
          <h1 class="tw-text-4xl tw-text-primary tw-font-bold tw-mb-4">Custom Tailwind Classes</h1>
          <p class="tw-text-lg tw-text-secondary">
            All custom Tailwind utilities generated from our design system CSS variables
          </p>
        </header>

        <!-- Background Colors Section -->
        <section>
          <h2 class="tw-text-2xl tw-text-primary tw-font-semibold tw-mb-6">Background Colors</h2>
          <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
            
            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <div class="tw-bg-page tw-p-4 tw-rounded tw-border tw-mb-2">
                <code class="tw-text-sm">tw-bg-page</code>
              </div>
              <small class="tw-text-tertiary">Page background</small>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <div class="tw-bg-interactive-default tw-p-4 tw-rounded tw-mb-2">
                <code class="tw-text-sm">tw-bg-interactive-default</code>
              </div>
              <small class="tw-text-tertiary">Interactive default</small>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <div class="tw-bg-interactive-default-hover tw-p-4 tw-rounded tw-mb-2">
                <code class="tw-text-sm">tw-bg-interactive-default-hover</code>
              </div>
              <small class="tw-text-tertiary">Interactive default hover</small>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <div class="tw-bg-interactive-default-disabled tw-p-4 tw-rounded tw-mb-2">
                <code class="tw-text-sm">tw-bg-interactive-default-disabled</code>
              </div>
              <small class="tw-text-tertiary">Interactive default disabled</small>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <div class="tw-bg-interactive-brand tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                <code class="tw-text-sm">tw-bg-interactive-brand</code>
              </div>
              <small class="tw-text-tertiary">Interactive brand</small>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <div class="tw-bg-interactive-brand-hover tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                <code class="tw-text-sm">tw-bg-interactive-brand-hover</code>
              </div>
              <small class="tw-text-tertiary">Interactive brand hover</small>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <div class="tw-bg-interactive-brand-disabled tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                <code class="tw-text-sm">tw-bg-interactive-brand-disabled</code>
              </div>
              <small class="tw-text-tertiary">Interactive brand disabled</small>
            </div>
          </div>
        </section>

        <!-- Text Colors Section -->
        <section>
          <h2 class="tw-text-2xl tw-text-primary tw-font-semibold tw-mb-6">Text Colors</h2>
          <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
            
            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <p class="tw-text-primary tw-text-lg tw-mb-2">Primary Text</p>
              <code class="tw-text-sm tw-text-tertiary">tw-text-primary</code>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <p class="tw-text-secondary tw-text-lg tw-mb-2">Secondary Text</p>
              <code class="tw-text-sm tw-text-tertiary">tw-text-secondary</code>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <p class="tw-text-tertiary tw-text-lg tw-mb-2">Tertiary Text</p>
              <code class="tw-text-sm tw-text-tertiary">tw-text-tertiary</code>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <p class="tw-text-disabled tw-text-lg tw-mb-2">Disabled Text</p>
              <code class="tw-text-sm tw-text-tertiary">tw-text-disabled</code>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <p class="tw-text-brand tw-text-lg tw-mb-2">Brand Text</p>
              <code class="tw-text-sm tw-text-tertiary">tw-text-brand</code>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <p class="tw-text-brand-disabled tw-text-lg tw-mb-2">Brand Disabled Text</p>
              <code class="tw-text-sm tw-text-tertiary">tw-text-brand-disabled</code>
            </div>
          </div>
        </section>

        <!-- Semantic Colors Section -->
        <section>
          <h2 class="tw-text-2xl tw-text-primary tw-font-semibold tw-mb-6">Semantic Colors</h2>
          
          <!-- Brand Colors -->
          <div class="tw-mb-8">
            <h3 class="tw-text-xl tw-text-primary tw-font-medium tw-mb-4">Brand Colors</h3>
            <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
              
              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-brand-base tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-brand-base</code>
                </div>
                <p class="tw-text-brand-base tw-font-medium">tw-text-brand-base</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-brand-base-hover tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-brand-base-hover</code>
                </div>
                <p class="tw-text-brand-base-hover tw-font-medium">tw-text-brand-base-hover</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-brand-weak tw-p-4 tw-rounded tw-mb-2">
                  <code class="tw-text-sm">tw-bg-brand-weak</code>
                </div>
                <p class="tw-text-brand-weak tw-font-medium">tw-text-brand-weak</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-brand-weak-hover tw-p-4 tw-rounded tw-mb-2">
                  <code class="tw-text-sm">tw-bg-brand-weak-hover</code>
                </div>
                <p class="tw-text-brand-weak-hover tw-font-medium">tw-text-brand-weak-hover</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-brand-strong tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-brand-strong</code>
                </div>
                <p class="tw-text-brand-strong tw-font-medium">tw-text-brand-strong</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-brand-strong-hover tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-brand-strong-hover</code>
                </div>
                <p class="tw-text-brand-strong-hover tw-font-medium">tw-text-brand-strong-hover</p>
              </div>
            </div>
          </div>

          <!-- Success Colors -->
          <div class="tw-mb-8">
            <h3 class="tw-text-xl tw-text-primary tw-font-medium tw-mb-4">Success Colors</h3>
            <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
              
              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-success-base tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-success-base</code>
                </div>
                <p class="tw-text-success-base tw-font-medium">tw-text-success-base</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-success-base-hover tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-success-base-hover</code>
                </div>
                <p class="tw-text-success-base-hover tw-font-medium">tw-text-success-base-hover</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-success-weak tw-p-4 tw-rounded tw-mb-2">
                  <code class="tw-text-sm">tw-bg-success-weak</code>
                </div>
                <p class="tw-text-success-weak tw-font-medium">tw-text-success-weak</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-success-weak-hover tw-p-4 tw-rounded tw-mb-2">
                  <code class="tw-text-sm">tw-bg-success-weak-hover</code>
                </div>
                <p class="tw-text-success-weak-hover tw-font-medium">tw-text-success-weak-hover</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-success-strong tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-success-strong</code>
                </div>
                <p class="tw-text-success-strong tw-font-medium">tw-text-success-strong</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-success-strong-hover tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-success-strong-hover</code>
                </div>
                <p class="tw-text-success-strong-hover tw-font-medium">tw-text-success-strong-hover</p>
              </div>
            </div>
          </div>

          <!-- Warning Colors -->
          <div class="tw-mb-8">
            <h3 class="tw-text-xl tw-text-primary tw-font-medium tw-mb-4">Warning Colors</h3>
            <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
              
              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-warning-base tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-warning-base</code>
                </div>
                <p class="tw-text-warning-base tw-font-medium">tw-text-warning-base</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-warning-base-hover tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-warning-base-hover</code>
                </div>
                <p class="tw-text-warning-base-hover tw-font-medium">tw-text-warning-base-hover</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-warning-weak tw-p-4 tw-rounded tw-mb-2">
                  <code class="tw-text-sm">tw-bg-warning-weak</code>
                </div>
                <p class="tw-text-warning-weak tw-font-medium">tw-text-warning-weak</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-warning-weak-hover tw-p-4 tw-rounded tw-mb-2">
                  <code class="tw-text-sm">tw-bg-warning-weak-hover</code>
                </div>
                <p class="tw-text-warning-weak-hover tw-font-medium">tw-text-warning-weak-hover</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-warning-strong tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-warning-strong</code>
                </div>
                <p class="tw-text-warning-strong tw-font-medium">tw-text-warning-strong</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-warning-strong-hover tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-warning-strong-hover</code>
                </div>
                <p class="tw-text-warning-strong-hover tw-font-medium">tw-text-warning-strong-hover</p>
              </div>
            </div>
          </div>

          <!-- Destructive Colors -->
          <div class="tw-mb-8">
            <h3 class="tw-text-xl tw-text-primary tw-font-medium tw-mb-4">Destructive Colors</h3>
            <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
              
              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-destructive-base tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-destructive-base</code>
                </div>
                <p class="tw-text-destructive-base tw-font-medium">tw-text-destructive-base</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-destructive-base-hover tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-destructive-base-hover</code>
                </div>
                <p class="tw-text-destructive-base-hover tw-font-medium">tw-text-destructive-base-hover</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-destructive-weak tw-p-4 tw-rounded tw-mb-2">
                  <code class="tw-text-sm">tw-bg-destructive-weak</code>
                </div>
                <p class="tw-text-destructive-weak tw-font-medium">tw-text-destructive-weak</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-destructive-weak-hover tw-p-4 tw-rounded tw-mb-2">
                  <code class="tw-text-sm">tw-bg-destructive-weak-hover</code>
                </div>
                <p class="tw-text-destructive-weak-hover tw-font-medium">tw-text-destructive-weak-hover</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-destructive-strong tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-destructive-strong</code>
                </div>
                <p class="tw-text-destructive-strong tw-font-medium">tw-text-destructive-strong</p>
              </div>

              <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
                <div class="tw-bg-destructive-strong-hover tw-p-4 tw-rounded tw-mb-2 tw-text-white">
                  <code class="tw-text-sm">tw-bg-destructive-strong-hover</code>
                </div>
                <p class="tw-text-destructive-strong-hover tw-font-medium">tw-text-destructive-strong-hover</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Typography Section -->
        <section>
          <h2 class="tw-text-2xl tw-text-primary tw-font-semibold tw-mb-6">Typography</h2>
          <div class="tw-space-y-4">
            
            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <p class="tw-text-4xl tw-text-primary tw-mb-2">4XL Text Size</p>
              <code class="tw-text-sm tw-text-tertiary">tw-text-4xl</code>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <p class="tw-text-3xl tw-text-primary tw-mb-2">3XL Text Size</p>
              <code class="tw-text-sm tw-text-tertiary">tw-text-3xl</code>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <p class="tw-text-2xl tw-text-primary tw-mb-2">2XL Text Size</p>
              <code class="tw-text-sm tw-text-tertiary">tw-text-2xl</code>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <p class="tw-text-xl tw-text-primary tw-mb-2">XL Text Size</p>
              <code class="tw-text-sm tw-text-tertiary">tw-text-xl</code>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <p class="tw-text-lg tw-text-primary tw-mb-2">Large Text Size</p>
              <code class="tw-text-sm tw-text-tertiary">tw-text-lg</code>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <p class="tw-text-base tw-text-primary tw-mb-2">Base Text Size</p>
              <code class="tw-text-sm tw-text-tertiary">tw-text-base</code>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <p class="tw-text-sm tw-text-primary tw-mb-2">Small Text Size</p>
              <code class="tw-text-sm tw-text-tertiary">tw-text-sm</code>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <p class="tw-text-xs tw-text-primary tw-mb-2">Extra Small Text Size</p>
              <code class="tw-text-sm tw-text-tertiary">tw-text-xs</code>
            </div>

            <div class="tw-p-4 tw-rounded-lg tw-border tw-border-default">
              <p class="tw-text-2xs tw-text-primary tw-mb-2">2XS Text Size</p>
              <code class="tw-text-sm tw-text-tertiary">tw-text-2xs</code>
            </div>
          </div>
        </section>

        <!-- Shadows Section -->
        <section>
          <h2 class="tw-text-2xl tw-text-primary tw-font-semibold tw-mb-6">Box Shadows</h2>
          <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
            
            <div class="tw-p-6 tw-rounded-lg tw-bg-page tw-shadow-sm tw-border tw-border-default">
              <h3 class="tw-text-lg tw-text-primary tw-font-medium tw-mb-2">Small Shadow</h3>
              <code class="tw-text-sm tw-text-tertiary">tw-shadow-sm</code>
            </div>

            <div class="tw-p-6 tw-rounded-lg tw-bg-page tw-shadow-md tw-border tw-border-default">
              <h3 class="tw-text-lg tw-text-primary tw-font-medium tw-mb-2">Medium Shadow</h3>
              <code class="tw-text-sm tw-text-tertiary">tw-shadow-md</code>
            </div>

            <div class="tw-p-6 tw-rounded-lg tw-bg-page tw-shadow-lg tw-border tw-border-default">
              <h3 class="tw-text-lg tw-text-primary tw-font-medium tw-mb-2">Large Shadow</h3>
              <code class="tw-text-sm tw-text-tertiary">tw-shadow-lg</code>
            </div>
          </div>
        </section>

        <!-- Transitions Section -->
        <section>
          <h2 class="tw-text-2xl tw-text-primary tw-font-semibold tw-mb-6">Transition Durations</h2>
          <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
            
            <button class="tw-p-4 tw-rounded-lg tw-bg-interactive-brand tw-text-white tw-transition-all tw-duration-fast hover:tw-bg-interactive-brand-hover hover:tw-scale-98">
              <div class="tw-text-center">
                <p class="tw-font-medium tw-mb-1">Fast Transition</p>
                <code class="tw-text-sm">tw-duration-fast</code>
              </div>
            </button>

            <button class="tw-p-4 tw-rounded-lg tw-bg-interactive-brand tw-text-white tw-transition-all tw-duration-normal hover:tw-bg-interactive-brand-hover hover:tw-scale-98">
              <div class="tw-text-center">
                <p class="tw-font-medium tw-mb-1">Normal Transition</p>
                <code class="tw-text-sm">tw-duration-normal</code>
              </div>
            </button>

            <button class="tw-p-4 tw-rounded-lg tw-bg-interactive-brand tw-text-white tw-transition-all tw-duration-slow hover:tw-bg-interactive-brand-hover hover:tw-scale-98">
              <div class="tw-text-center">
                <p class="tw-font-medium tw-mb-1">Slow Transition</p>
                <code class="tw-text-sm">tw-duration-slow</code>
              </div>
            </button>
          </div>
        </section>

        <!-- Interactive Examples Section -->
        <section>
          <h2 class="tw-text-2xl tw-text-primary tw-font-semibold tw-mb-6">Interactive Examples</h2>
          <div class="tw-space-y-6">
            
            <!-- Button Examples -->
            <div class="tw-p-6 tw-rounded-lg tw-border tw-border-default">
              <h3 class="tw-text-lg tw-text-primary tw-font-medium tw-mb-4">Button Combinations</h3>
              <div class="tw-flex tw-flex-wrap tw-gap-4">
                <button class="tw-px-4 tw-py-2 tw-rounded tw-bg-interactive-brand tw-text-white tw-transition-all tw-duration-fast hover:tw-bg-interactive-brand-hover">
                  Brand Button
                </button>
                <button class="tw-px-4 tw-py-2 tw-rounded tw-bg-success-base tw-text-white tw-transition-all tw-duration-fast hover:tw-bg-success-base-hover">
                  Success Button
                </button>
                <button class="tw-px-4 tw-py-2 tw-rounded tw-bg-warning-base tw-text-white tw-transition-all tw-duration-fast hover:tw-bg-warning-base-hover">
                  Warning Button
                </button>
                <button class="tw-px-4 tw-py-2 tw-rounded tw-bg-destructive-base tw-text-white tw-transition-all tw-duration-fast hover:tw-bg-destructive-base-hover">
                  Destructive Button
                </button>
              </div>
            </div>

            <!-- Card Examples -->
            <div class="tw-p-6 tw-rounded-lg tw-border tw-border-default">
              <h3 class="tw-text-lg tw-text-primary tw-font-medium tw-mb-4">Card Examples</h3>
              <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                
                <div class="tw-p-4 tw-rounded-lg tw-bg-success-weak tw-border tw-border-success-base">
                  <h4 class="tw-text-success-strong tw-font-medium tw-mb-2">Success Card</h4>
                  <p class="tw-text-success-base">Using success semantic colors</p>
                </div>

                <div class="tw-p-4 tw-rounded-lg tw-bg-warning-weak tw-border tw-border-warning-base">
                  <h4 class="tw-text-warning-strong tw-font-medium tw-mb-2">Warning Card</h4>
                  <p class="tw-text-warning-base">Using warning semantic colors</p>
                </div>

                <div class="tw-p-4 tw-rounded-lg tw-bg-destructive-weak tw-border tw-border-destructive-base">
                  <h4 class="tw-text-destructive-strong tw-font-medium tw-mb-2">Error Card</h4>
                  <p class="tw-text-destructive-base">Using destructive semantic colors</p>
                </div>

                <div class="tw-p-4 tw-rounded-lg tw-bg-brand-weak tw-border tw-border-brand-base">
                  <h4 class="tw-text-brand-strong tw-font-medium tw-mb-2">Brand Card</h4>
                  <p class="tw-text-brand-base">Using brand semantic colors</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Code Reference Section -->
        <section>
          <h2 class="tw-text-2xl tw-text-primary tw-font-semibold tw-mb-6">Complete Class Reference</h2>
          <div class="tw-bg-interactive-default tw-p-6 tw-rounded-lg">
            <h3 class="tw-text-lg tw-text-primary tw-font-medium tw-mb-4">Available Classes</h3>
            <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4 tw-text-sm">
              
              <div>
                <h4 class="tw-text-primary tw-font-medium tw-mb-2">Background Colors</h4>
                <ul class="tw-space-y-1 tw-text-secondary">
                  <li><code>tw-bg-page</code></li>
                  <li><code>tw-bg-interactive-default</code></li>
                  <li><code>tw-bg-interactive-default-hover</code></li>
                  <li><code>tw-bg-interactive-default-disabled</code></li>
                  <li><code>tw-bg-interactive-brand</code></li>
                  <li><code>tw-bg-interactive-brand-hover</code></li>
                  <li><code>tw-bg-interactive-brand-disabled</code></li>
                </ul>
              </div>

              <div>
                <h4 class="tw-text-primary tw-font-medium tw-mb-2">Text Colors</h4>
                <ul class="tw-space-y-1 tw-text-secondary">
                  <li><code>tw-text-primary</code></li>
                  <li><code>tw-text-secondary</code></li>
                  <li><code>tw-text-tertiary</code></li>
                  <li><code>tw-text-disabled</code></li>
                  <li><code>tw-text-brand</code></li>
                  <li><code>tw-text-brand-disabled</code></li>
                </ul>
              </div>

              <div>
                <h4 class="tw-text-primary tw-font-medium tw-mb-2">Semantic Colors</h4>
                <ul class="tw-space-y-1 tw-text-secondary">
                  <li><code>tw-[bg|text|border]-brand-[base|weak|strong]</code></li>
                  <li><code>tw-[bg|text|border]-success-[base|weak|strong]</code></li>
                  <li><code>tw-[bg|text|border]-warning-[base|weak|strong]</code></li>
                  <li><code>tw-[bg|text|border]-destructive-[base|weak|strong]</code></li>
                </ul>
              </div>

              <div>
                <h4 class="tw-text-primary tw-font-medium tw-mb-2">Font Sizes</h4>
                <ul class="tw-space-y-1 tw-text-secondary">
                  <li><code>tw-text-2xs</code></li>
                  <li><code>tw-text-xs</code></li>
                  <li><code>tw-text-sm</code></li>
                  <li><code>tw-text-base</code></li>
                  <li><code>tw-text-lg</code></li>
                  <li><code>tw-text-xl</code></li>
                  <li><code>tw-text-2xl</code></li>
                  <li><code>tw-text-3xl</code></li>
                  <li><code>tw-text-4xl</code></li>
                </ul>
              </div>

              <div>
                <h4 class="tw-text-primary tw-font-medium tw-mb-2">Shadows</h4>
                <ul class="tw-space-y-1 tw-text-secondary">
                  <li><code>tw-shadow-sm</code></li>
                  <li><code>tw-shadow-md</code></li>
                  <li><code>tw-shadow-lg</code></li>
                </ul>
              </div>

              <div>
                <h4 class="tw-text-primary tw-font-medium tw-mb-2">Transitions</h4>
                <ul class="tw-space-y-1 tw-text-secondary">
                  <li><code>tw-duration-fast</code></li>
                  <li><code>tw-duration-normal</code></li>
                  <li><code>tw-duration-slow</code></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="tw-text-center tw-py-8 tw-border-t tw-border-default">
          <p class="tw-text-secondary">
            All classes are generated from CSS variables defined in globals.css
          </p>
        </footer>
      </div>
    </div>
  `,
  styles: []
})
export class TailwindShowcaseComponent {
}
