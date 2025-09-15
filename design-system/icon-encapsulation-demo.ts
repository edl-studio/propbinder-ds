/**
 * Real-world example: Your DsIconComponent with different encapsulation strategies
 * 
 * This demonstrates exactly how your icon component behaves differently
 * with ViewEncapsulation.Emulated vs ViewEncapsulation.ShadowDom
 */

import { Component, input, computed, ViewEncapsulation } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

// ====================================
// Your Current Implementation (Shadow DOM)
// ====================================

@Component({
  selector: 'ds-icon-shadow',
  standalone: true,
  imports: [NgIcon],
  encapsulation: ViewEncapsulation.ShadowDom, // Your current choice
  styleUrls: ['./ds-icon.component.css'],
  template: `
    <ng-icon 
      [name]="name()" 
      [size]="computedSize()"
      [color]="computedColor()"
      [class]="iconClasses()"
    ></ng-icon>
  `,
})
export class DsIconShadowComponent {
  name = input.required<string>();
  size = input<string>('md');
  color = input<string>();
  interactive = input<boolean>(false);

  iconClasses = computed(() => {
    const classes = ['icon'];
    if (this.size() === 'lg') classes.push('icon--lg');
    if (this.interactive()) classes.push('icon--interactive');
    return classes.join(' ');
  });

  computedSize = computed(() => {
    const sizeMap: Record<string, string> = {
      xs: '12px', sm: '16px', md: '20px', lg: '24px', xl: '32px'
    };
    return sizeMap[this.size()] || this.size();
  });

  computedColor = computed(() => {
    const colorMap: Record<string, string> = {
      primary: 'var(--text-color-default-primary)',
      secondary: 'var(--text-color-default-secondary)',
      brand: 'var(--text-color-brand)',
    };
    return colorMap[this.color() || ''] || this.color();
  });
}

// ====================================
// Alternative Implementation (Emulated)
// ====================================

@Component({
  selector: 'ds-icon-emulated',
  standalone: true,
  imports: [NgIcon],
  encapsulation: ViewEncapsulation.Emulated, // Different encapsulation
  styleUrls: ['./ds-icon.component.css'],
  template: `
    <ng-icon 
      [name]="name()" 
      [size]="computedSize()"
      [color]="computedColor()"
      [class]="iconClasses()"
    ></ng-icon>
  `,
})
export class DsIconEmulatedComponent {
  // Identical implementation to shadow version
  name = input.required<string>();
  size = input<string>('md');
  color = input<string>();
  interactive = input<boolean>(false);

  iconClasses = computed(() => {
    const classes = ['icon'];
    if (this.size() === 'lg') classes.push('icon--lg');
    if (this.interactive()) classes.push('icon--interactive');
    return classes.join(' ');
  });

  computedSize = computed(() => {
    const sizeMap: Record<string, string> = {
      xs: '12px', sm: '16px', md: '20px', lg: '24px', xl: '32px'
    };
    return sizeMap[this.size()] || this.size();
  });

  computedColor = computed(() => {
    const colorMap: Record<string, string> = {
      primary: 'var(--text-color-default-primary)',
      secondary: 'var(--text-color-default-secondary)',
      brand: 'var(--text-color-brand)',
    };
    return colorMap[this.color() || ''] || this.color();
  });
}

// ====================================
// Demo Component to Show Differences
// ====================================

@Component({
  selector: 'encapsulation-demo',
  standalone: true,
  imports: [DsIconShadowComponent, DsIconEmulatedComponent],
  template: `
    <div class="demo-container">
      <h2>Icon Encapsulation Comparison</h2>
      
      <!-- Global styles attempt to override icons -->
      <style>
        .icon {
          color: red !important;
          font-size: 50px !important;
          background: yellow !important;
          border: 3px solid purple !important;
          padding: 10px !important;
        }
        
        .icon--interactive {
          transform: rotate(45deg) !important;
        }
      </style>
      
      <div class="comparison-grid">
        <div class="test-section">
          <h3>Shadow DOM (Your Current Approach)</h3>
          <div class="icon-tests">
            
            <!-- Test 1: Basic icon -->
            <div class="test-case">
              <h4>Basic Icon</h4>
              <ds-icon-shadow name="remixHomeLine" size="lg"></ds-icon-shadow>
              <p>✅ Immune to global style overrides</p>
            </div>
            
            <!-- Test 2: Interactive icon -->
            <div class="test-case">
              <h4>Interactive Icon</h4>
              <ds-icon-shadow name="remixSettingsLine" size="lg" interactive="true"></ds-icon-shadow>
              <p>✅ Component styles work as intended</p>
            </div>
            
            <!-- Test 3: Custom color -->
            <div class="test-case">
              <h4>Brand Color Icon</h4>
              <ds-icon-shadow name="remixStarLine" size="lg" color="brand"></ds-icon-shadow>
              <p>✅ Design tokens work perfectly</p>
            </div>
            
            <!-- Test 4: Parent styling attempt -->
            <div class="test-case parent-styling">
              <h4>Parent Styled Container</h4>
              <ds-icon-shadow name="remixHeartLine" size="lg"></ds-icon-shadow>
              <p>✅ Ignores parent color/size inheritance</p>
            </div>
            
          </div>
        </div>
        
        <div class="test-section">
          <h3>Emulated Encapsulation (Alternative)</h3>
          <div class="icon-tests">
            
            <!-- Test 1: Basic icon -->
            <div class="test-case">
              <h4>Basic Icon</h4>
              <ds-icon-emulated name="remixHomeLine" size="lg"></ds-icon-emulated>
              <p>⚠️ May be affected by strong global styles</p>
            </div>
            
            <!-- Test 2: Interactive icon -->
            <div class="test-case">
              <h4>Interactive Icon</h4>
              <ds-icon-emulated name="remixSettingsLine" size="lg" interactive="true"></ds-icon-emulated>
              <p>⚠️ Global !important rules can override</p>
            </div>
            
            <!-- Test 3: Custom color -->
            <div class="test-case">
              <h4>Brand Color Icon</h4>
              <ds-icon-emulated name="remixStarLine" size="lg" color="brand"></ds-icon-emulated>
              <p>✅ Design tokens still work</p>
            </div>
            
            <!-- Test 4: Parent styling -->
            <div class="test-case parent-styling">
              <h4>Parent Styled Container</h4>
              <ds-icon-emulated name="remixHeartLine" size="lg"></ds-icon-emulated>
              <p>📝 Inherits parent styles (color, font-size)</p>
            </div>
            
          </div>
        </div>
      </div>
      
      <!-- Third-party integration test -->
      <div class="integration-test">
        <h3>Third-party Library Integration Test</h3>
        <p>Simulating an icon library that uses global CSS:</p>
        
        <div class="comparison-grid">
          <div class="test-section">
            <h4>Shadow DOM</h4>
            <ds-icon-shadow name="remixExternalLinkLine" size="lg"></ds-icon-shadow>
            <div class="third-party-widget">
              <!-- Third-party styles are blocked -->
              <span class="external-icon">🔗</span>
              <span class="external-tooltip">External library tooltip</span>
            </div>
            <p>❌ Third-party styles blocked</p>
          </div>
          
          <div class="test-section">
            <h4>Emulated</h4>
            <ds-icon-emulated name="remixExternalLinkLine" size="lg"></ds-icon-emulated>
            <div class="third-party-widget">
              <!-- Third-party styles work normally -->
              <span class="external-icon">🔗</span>
              <span class="external-tooltip">External library tooltip</span>
            </div>
            <p>✅ Third-party styles work</p>
          </div>
        </div>
      </div>
      
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .comparison-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin: 20px 0;
    }
    
    .test-section {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #fafafa;
    }
    
    .test-case {
      margin: 15px 0;
      padding: 15px;
      border: 1px solid #eee;
      border-radius: 6px;
      background: white;
    }
    
    .test-case h4 {
      margin: 0 0 10px 0;
      color: #333;
    }
    
    .test-case p {
      margin: 10px 0 0 0;
      font-size: 14px;
    }
    
    /* Styling that will attempt to affect child components */
    .parent-styling {
      color: red;
      font-size: 32px;
      font-weight: bold;
    }
    
    /* Third-party library styles */
    .third-party-widget {
      position: relative;
      display: inline-block;
      margin: 10px 0;
    }
    
    .external-icon {
      font-size: 24px;
      cursor: pointer;
    }
    
    .external-tooltip {
      position: absolute;
      top: -30px;
      left: 0;
      background: #333;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    .external-icon:hover + .external-tooltip {
      opacity: 1;
    }
    
    .integration-test {
      margin: 40px 0;
      padding: 20px;
      border: 2px solid #007bff;
      border-radius: 8px;
      background: #f8f9fa;
    }
  `]
})
export class EncapsulationDemoComponent {}

// ====================================
// Practical Development Scenarios
// ====================================

/**
 * SCENARIO 1: Global CSS Reset Conflicts
 * 
 * Imagine this CSS exists globally:
 * 
 * * {
 *   box-sizing: border-box !important;
 *   margin: 0 !important;
 *   padding: 0 !important;
 * }
 * 
 * .icon {
 *   display: block !important;
 *   width: 100px !important;
 *   height: 100px !important;
 * }
 * 
 * RESULT:
 * - Shadow DOM: Your icons remain unaffected ✅
 * - Emulated: Icons might become huge blocks ❌
 */

/**
 * SCENARIO 2: CSS Framework Integration
 * 
 * Using Font Awesome alongside your icons:
 * 
 * <link rel="stylesheet" href="fontawesome.css">
 * 
 * FontAwesome CSS:
 * .fa, .fas, .far {
 *   font-family: "Font Awesome 5 Free";
 *   font-weight: 900;
 * }
 * 
 * If your component uses class="icon fa", you get:
 * - Shadow DOM: Only your icon styles apply ✅
 * - Emulated: Both your styles AND FontAwesome styles apply ⚠️
 */

/**
 * SCENARIO 3: CSS-in-JS Library Conflicts
 * 
 * Some CSS-in-JS libraries inject global styles:
 * 
 * .css-123abc {
 *   color: blue !important;
 *   font-size: 16px !important;
 * }
 * 
 * If these classes somehow match your component structure:
 * - Shadow DOM: Completely immune ✅
 * - Emulated: Could be affected depending on specificity ⚠️
 */

/**
 * SCENARIO 4: Browser Extension Style Injection
 * 
 * Browser extensions often inject CSS that affects all pages:
 * 
 * [data-extension="true"] * {
 *   filter: sepia(100%) !important;
 * }
 * 
 * RESULT:
 * - Shadow DOM: Your design system remains consistent ✅
 * - Emulated: Icons might get unwanted filters applied ❌
 */

/**
 * SCENARIO 5: Dynamic Theme Changes
 * 
 * Your CSS custom properties approach works great with both:
 * 
 * document.documentElement.style.setProperty('--text-color-brand', '#ff0000');
 * 
 * RESULT:
 * - Shadow DOM: Theme updates work perfectly ✅
 * - Emulated: Theme updates work perfectly ✅
 * 
 * This is why your design token strategy is brilliant!
 */

/**
 * REAL-WORLD TESTING CHECKLIST:
 * 
 * To test your components, try adding this CSS to your global styles:
 * 
 * ```css
 * * { 
 *   border: 2px solid red !important; 
 *   background: yellow !important;
 * }
 * 
 * .icon {
 *   font-size: 100px !important;
 *   color: purple !important;
 *   transform: rotate(180deg) !important;
 * }
 * 
 * ng-icon {
 *   display: block !important;
 *   width: 200px !important;
 *   height: 200px !important;
 *   border: 5px solid green !important;
 * }
 * ```
 * 
 * Your Shadow DOM components should be completely unaffected,
 * while emulated components would be dramatically changed.
 */
