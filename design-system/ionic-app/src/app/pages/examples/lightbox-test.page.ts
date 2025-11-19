import { Component } from '@angular/core';
import {
  DsButtonComponent
} from '@propbinder/design-system';
import { DsMobileLightboxService, LightboxAuthor } from '../../components/lightbox';
import { DsMobilePageMainComponent } from '../../components/page-main';
import { DsMobileContentComponent } from '../../components/content';

@Component({
  selector: 'app-lightbox-test',
  standalone: true,
  imports: [
    DsMobilePageMainComponent,
    DsMobileContentComponent,
    DsButtonComponent
  ],
  styles: [`
    .test-container {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .test-image {
      width: 100%;
      max-width: 400px;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .test-image:active {
      transform: scale(0.98);
    }
  `],
  template: `
    <ds-mobile-page-main title="Lightbox Test">
      <ds-mobile-content>
        <div class="test-container">
          <h2>Click the image or button to test the lightbox:</h2>
          
          <img 
            src="Assets/Dummy-photos/balcony-view.jpg" 
            alt="Test image"
            class="test-image"
            (click)="openLightbox()">
          
          <ds-button
            label="Open Lightbox"
            variant="primary"
            (buttonClick)="openLightbox()"
          />
          
          <p>If the lightbox doesn't open, check the browser console for errors.</p>
        </div>
      </ds-mobile-content>
    </ds-mobile-page-main>
  `
})
export class LightboxTestPage {
  constructor(private lightbox: DsMobileLightboxService) {}
  
  openLightbox(): void {
    console.log('[Test] Opening lightbox...');
    
    const authorMeta: LightboxAuthor = {
      name: 'Test User',
      role: 'Tester',
      avatarInitials: 'TU',
      timestamp: 'now'
    };
    
    this.lightbox.open({
      images: [
        {
          type: 'image',
          src: 'Assets/Dummy-photos/balcony-view.jpg',
          alt: 'Test Image',
          title: 'Test Image',
          description: 'This is a test image for the lightbox',
          isLiked: false,
          likeCount: 42,
          commentCount: 15
        }
      ],
      author: authorMeta,
      enableZoom: true,
      showControls: false,
      showInfo: true
    });
  }
}

