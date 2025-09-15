/**
 * Practical Examples: ViewEncapsulation.Emulated vs ViewEncapsulation.ShadowDom
 * 
 * This file demonstrates real-world scenarios where encapsulation choice matters
 */

import { Component, ViewEncapsulation } from '@angular/core';

// ====================================
// Example 1: Style Isolation
// ====================================

// EMULATED ENCAPSULATION VERSION
@Component({
  selector: 'button-emulated',
  encapsulation: ViewEncapsulation.Emulated, // Default Angular behavior
  template: `
    <button class="btn btn-primary">
      Emulated Button
    </button>
  `,
  styles: [`
    .btn {
      background: #007bff;
      color: white;
      padding: 8px 16px;
      border: 1px solid #007bff;
      border-radius: 4px;
      font-size: 14px;
    }
    
    .btn-primary {
      background: #007bff;
    }
    
    .btn:hover {
      background: #0056b3;
    }
  `]
})
export class ButtonEmulatedComponent {}

// SHADOW DOM ENCAPSULATION VERSION  
@Component({
  selector: 'button-shadow',
  encapsulation: ViewEncapsulation.ShadowDom, // Your current approach
  template: `
    <button class="btn btn-primary">
      Shadow DOM Button
    </button>
  `,
  styles: [`
    .btn {
      background: #007bff;
      color: white;
      padding: 8px 16px;
      border: 1px solid #007bff;
      border-radius: 4px;
      font-size: 14px;
    }
    
    .btn-primary {
      background: #007bff;
    }
    
    .btn:hover {
      background: #0056b3;
    }
  `]
})
export class ButtonShadowComponent {}

/**
 * REAL-WORLD SCENARIO: Global CSS Override
 * 
 * Imagine this CSS exists in your global styles:
 * 
 * .btn {
 *   background: red !important;
 *   font-size: 24px !important;
 *   border-radius: 50% !important;
 * }
 * 
 * RESULT:
 * - Emulated: Might be affected if global CSS has higher specificity
 * - Shadow DOM: Completely immune to global overrides
 */

// ====================================
// Example 2: CSS Inheritance
// ====================================

@Component({
  selector: 'text-emulated',
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div class="text-content">
      This text may inherit parent styles
    </div>
  `,
  styles: [`
    .text-content {
      padding: 10px;
      border: 1px solid #ddd;
      /* Notice: no color or font-weight defined */
    }
  `]
})
export class TextEmulatedComponent {}

@Component({
  selector: 'text-shadow',
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <div class="text-content">
      This text is isolated from parent styles
    </div>
  `,
  styles: [`
    .text-content {
      padding: 10px;
      border: 1px solid #ddd;
      /* Notice: no color or font-weight defined */
    }
  `]
})
export class TextShadowComponent {}

/**
 * REAL-WORLD SCENARIO: Parent Container Styling
 * 
 * <div style="color: red; font-weight: bold; font-size: 20px;">
 *   <text-emulated></text-emulated>
 *   <text-shadow></text-shadow>
 * </div>
 * 
 * RESULT:
 * - Emulated: Inherits color, font-weight, font-size from parent
 * - Shadow DOM: Uses browser defaults, ignores parent styles
 */

// ====================================
// Example 3: Third-party Library Integration
// ====================================

@Component({
  selector: 'datepicker-emulated',
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div class="datepicker-container">
      <input class="form-control" placeholder="Select date">
      <!-- Imagine this is a third-party datepicker widget -->
      <div class="flatpickr-calendar">
        <div class="flatpickr-day">15</div>
        <div class="flatpickr-day selected">16</div>
        <div class="flatpickr-day">17</div>
      </div>
    </div>
  `,
  styles: [`
    .datepicker-container {
      position: relative;
    }
    
    .form-control {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    /* We DON'T style .flatpickr-* classes here because
       we expect them to be styled by the library's global CSS */
  `]
})
export class DatepickerEmulatedComponent {}

@Component({
  selector: 'datepicker-shadow',
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <div class="datepicker-container">
      <input class="form-control" placeholder="Select date">
      <!-- Third-party widget styles are BLOCKED by Shadow DOM -->
      <div class="flatpickr-calendar">
        <div class="flatpickr-day">15</div>
        <div class="flatpickr-day selected">16</div>
        <div class="flatpickr-day">17</div>
      </div>
    </div>
  `,
  styles: [`
    .datepicker-container {
      position: relative;
    }
    
    .form-control {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    /* We MUST include all third-party styles here because
       Shadow DOM blocks external CSS */
    .flatpickr-calendar {
      position: absolute;
      top: 100%;
      left: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .flatpickr-day {
      padding: 8px;
      cursor: pointer;
      text-align: center;
    }
    
    .flatpickr-day:hover {
      background: #f0f0f0;
    }
    
    .flatpickr-day.selected {
      background: #007bff;
      color: white;
    }
  `]
})
export class DatepickerShadowComponent {}

/**
 * REAL-WORLD SCENARIO: Using Flatpickr Library
 * 
 * RESULT:
 * - Emulated: Library's global CSS works normally
 * - Shadow DOM: Must manually include all library styles or use CSS imports
 */

// ====================================
// Example 4: Global Utility Classes
// ====================================

@Component({
  selector: 'card-emulated',
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div class="card">
      <div class="text-primary mb-3">Primary Text</div>
      <div class="text-muted small">Muted small text</div>
      <button class="btn btn-outline-primary mt-2">Action</button>
    </div>
  `,
  styles: [`
    .card {
      padding: 16px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: white;
    }
    
    /* We rely on global utility classes for:
       - text-primary, text-muted
       - mb-3, mt-2
       - btn, btn-outline-primary
       - small
    */
  `]
})
export class CardEmulatedComponent {}

@Component({
  selector: 'card-shadow',
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <div class="card">
      <div class="text-primary mb-3">Primary Text</div>
      <div class="text-muted small">Muted small text</div>
      <button class="btn btn-outline-primary mt-2">Action</button>
    </div>
  `,
  styles: [`
    .card {
      padding: 16px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: white;
    }
    
    /* Must define ALL utility classes used in template */
    .text-primary { color: #007bff; }
    .text-muted { color: #6c757d; }
    .small { font-size: 0.875em; }
    .mb-3 { margin-bottom: 1rem; }
    .mt-2 { margin-top: 0.5rem; }
    
    .btn {
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      border: 1px solid transparent;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
    }
    
    .btn-outline-primary {
      color: #007bff;
      border-color: #007bff;
      background: transparent;
    }
    
    .btn-outline-primary:hover {
      background: #007bff;
      color: white;
    }
  `]
})
export class CardShadowComponent {}

/**
 * REAL-WORLD SCENARIO: Bootstrap/Tailwind Usage
 * 
 * RESULT:
 * - Emulated: Can use global utility classes freely
 * - Shadow DOM: Must redefine all utilities or import them explicitly
 */

// ====================================
// Example 5: CSS Custom Properties (Design Tokens)
// ====================================

@Component({
  selector: 'themed-emulated',
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div class="themed-component">
      <h3>Themed Component</h3>
      <p>This uses CSS custom properties for theming</p>
      <button class="action-btn">Action</button>
    </div>
  `,
  styles: [`
    .themed-component {
      background: var(--background-color-page);
      color: var(--text-color-default-primary);
      padding: var(--spacing-md);
      border-radius: var(--border-radius-md);
      border: 1px solid var(--border-color-default);
    }
    
    .action-btn {
      background: var(--background-color-interactive-brand);
      color: white;
      border: none;
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius-sm);
      cursor: pointer;
    }
    
    .action-btn:hover {
      background: var(--background-color-interactive-brand-hover);
    }
  `]
})
export class ThemedEmulatedComponent {}

@Component({
  selector: 'themed-shadow',
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <div class="themed-component">
      <h3>Themed Component</h3>
      <p>This uses CSS custom properties for theming</p>
      <button class="action-btn">Action</button>
    </div>
  `,
  styles: [`
    .themed-component {
      background: var(--background-color-page);
      color: var(--text-color-default-primary);
      padding: var(--spacing-md);
      border-radius: var(--border-radius-md);
      border: 1px solid var(--border-color-default);
    }
    
    .action-btn {
      background: var(--background-color-interactive-brand);
      color: white;
      border: none;
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius-sm);
      cursor: pointer;
    }
    
    .action-btn:hover {
      background: var(--background-color-interactive-brand-hover);
    }
  `]
})
export class ThemedShadowComponent {}

/**
 * REAL-WORLD SCENARIO: Design Token System (Like yours!)
 * 
 * RESULT:
 * - Emulated: CSS custom properties work normally ✅
 * - Shadow DOM: CSS custom properties ALSO work! ✅
 * 
 * This is why your design token approach works well with Shadow DOM!
 * Custom properties inherit through the Shadow DOM boundary.
 */

// ====================================
// Example 6: DevTools & Debugging
// ====================================

/**
 * DEBUGGING DIFFERENCES:
 * 
 * EMULATED ENCAPSULATION:
 * - Inspect element shows: <button _ngcontent-abc-123 class="btn">
 * - Styles show: .btn[_ngcontent-abc-123] { ... }
 * - Easy to inspect and modify styles
 * - CSS selectors work as expected in console
 * 
 * SHADOW DOM ENCAPSULATION:
 * - Inspect element shows: <my-component>
 *                            #shadow-root
 *                              <button class="btn">
 * - Must expand #shadow-root to see internal structure
 * - Styles are isolated in shadow DOM context
 * - Console selectors need special syntax: $0.shadowRoot.querySelector('.btn')
 */

// ====================================
// Summary of Practical Differences
// ====================================

/**
 * USE EMULATED WHEN:
 * ✅ Integrating with third-party libraries that rely on global CSS
 * ✅ Using CSS frameworks like Bootstrap extensively
 * ✅ Need simpler debugging experience
 * ✅ Want inheritance of typography/theme styles from parent
 * ✅ Working with legacy codebases
 * 
 * USE SHADOW DOM WHEN:
 * ✅ Need absolute style isolation (like your design system)
 * ✅ Building reusable components for multiple applications
 * ✅ Want to prevent style conflicts entirely
 * ✅ Using CSS custom properties for theming (works great!)
 * ✅ Building a component library that must be bulletproof
 * 
 * HYBRID APPROACH:
 * - Use Shadow DOM for design system components (buttons, inputs, etc.)
 * - Use Emulated for application-specific components that need integration
 */
