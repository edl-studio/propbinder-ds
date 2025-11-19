import { Component, input, output, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular/standalone';
import { IonHeader, IonToolbar, IonContent } from '@ionic/angular/standalone';
import { DsIconComponent } from '@propbinder/design-system/icon/ds-icon';
import { MobilePageBase } from '../shared/mobile-page-base';

/**
 * DsMobilePageDetailsComponent
 * 
 * A mobile page layout for detail/drill-down pages with:
 * - Back button header (mobile + desktop variants)
 * - White background content area
 * - Responsive padding
 * 
 * @example
 * ```html
 * <!-- Simple detail page -->
 * <ds-mobile-page-details
 *   title="Property Details"
 *   (back)="goBack()">
 *   <div class="page-content">
 *     <!-- Your content -->
 *   </div>
 * </ds-mobile-page-details>
 * 
 * <!-- With default back route -->
 * <ds-mobile-page-details
 *   title="Invoice Details"
 *   backRoute="/invoices">
 *   <div class="page-content">
 *     <!-- Your content -->
 *   </div>
 * </ds-mobile-page-details>
 * ```
 */
@Component({
  selector: 'ds-mobile-page-details',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonContent,
    DsIconComponent
  ],
  styleUrls: ['./ds-mobile-page-details.css'],
  template: `
    <!-- Mobile header - hidden on desktop -->
    <ion-header>
      <ion-toolbar>
        <div class="header-back">
          <button class="back-button" (click)="handleBack()" [attr.aria-label]="'Go back'">
            <ds-icon name="remixArrowLeftLine" size="24px" />
          </button>
          <h1 class="header-title">{{ title() }}</h1>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Desktop header above content -->
      <div class="desktop-header">
        <button class="back-button" (click)="handleBack()" [attr.aria-label]="'Go back'">
          <ds-icon name="remixArrowLeftLine" size="24px" />
        </button>
        <h1>{{ title() }}</h1>
      </div>

      <!-- Content area -->
      <div class="detail-content">
        <ng-content></ng-content>
      </div>
    </ion-content>
  `
})
export class DsMobilePageDetailsComponent extends MobilePageBase {
  // Inputs
  title = input.required<string>();
  backRoute = input<string>(''); // Optional default back route
  
  // Outputs
  back = output<void>();
  
  constructor(
    private navCtrl: NavController,
    private elementRef: ElementRef
  ) {
    super();
  }
  
  /**
   * Handle back navigation
   * 
   * By default, navigates using the provided backRoute or browser back.
   * Parent components can listen to the (back) event to override this behavior.
   * 
   * @example
   * ```html
   * <!-- Default behavior: uses backRoute or browser back -->
   * <ds-mobile-page-details 
   *   title="Details" 
   *   backRoute="/home">
   * </ds-mobile-page-details>
   * 
   * <!-- Custom behavior: parent handles navigation -->
   * <ds-mobile-page-details 
   *   title="Details"
   *   (back)="customBackHandler()">
   * </ds-mobile-page-details>
   * ```
   */
  handleBack(): void {
    // Add class to trigger reverse animation
    this.elementRef.nativeElement.classList.add('navigating-back');
    
    // Emit event for parent to optionally handle
    this.back.emit();
    
    // Default behavior: navigate using backRoute or browser back
    if (this.backRoute()) {
      this.navCtrl.navigateBack(this.backRoute());
    } else {
      this.navCtrl.back();
    }
  }
}

