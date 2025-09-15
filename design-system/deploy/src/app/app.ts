import { Component, signal, ViewEncapsulation, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DsButtonComponent, DsInputComponent, DsIconComponent, DsFormFieldComponent, DsLabelComponent, DsBadgeComponent, DsShapeIndicatorComponent } from './components/ui';
import { TailwindShowcaseComponent } from './pages/tailwind-showcase';
import { LabelShowcaseComponent } from './pages/label-showcase';
import { AppShellShowcaseComponent } from './pages/app-shell-showcase.stories';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    DsButtonComponent, 
    DsInputComponent, 
    DsIconComponent, 
    DsFormFieldComponent, 
    DsLabelComponent,
    DsBadgeComponent,
    DsShapeIndicatorComponent,
    TailwindShowcaseComponent,
    LabelShowcaseComponent,
    AppShellShowcaseComponent
  ],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  protected readonly title = signal('Propbinder Design System');
  protected showTailwindClasses = false;
  protected showLabelShowcase = false;
  protected showAppShellShowcase = false;
  protected showAppShellFullPage = false;

  ngOnInit() {
    // Check if we're in preview mode and auto-enable full page view
    if (typeof window !== 'undefined' && (window as any).showAppShellPreview) {
      this.showAppShellFullPage = true;
    }
  }
}
