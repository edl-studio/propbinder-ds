import { Component } from '@angular/core';
import { DsMobileModalService } from '../../components/modal/ds-mobile-modal.service';
import { MobilePostDetailPageComponent } from '../post-detail.page';

/**
 * Example: Opening Post Detail as Modal
 * 
 * This example shows different ways to open a post detail page as a modal.
 * You can use this pattern in any component where you want to open posts modally.
 */
@Component({
  selector: 'app-example-modal-usage',
  template: `
    <div class="examples">
      <h2>Modal Examples</h2>
      
      <!-- Example 1: Fullscreen Modal -->
      <button (click)="openPostFullscreen()">
        Open Post (Fullscreen)
      </button>
      
      <!-- Example 2: Card Modal (Recommended) -->
      <button (click)="openPostCard()">
        Open Post (Card)
      </button>
      
      <!-- Example 3: Sheet Modal -->
      <button (click)="openPostSheet()">
        Open Post (Sheet)
      </button>
      
      <!-- Example 4: Custom Configuration -->
      <button (click)="openPostCustom()">
        Open Post (Custom)
      </button>
    </div>
  `
})
export class ExampleModalUsageComponent {
  constructor(private modal: DsMobileModalService) {}

  /**
   * Example 1: Open post as fullscreen modal
   * Best for: Immersive full-screen experience
   */
  async openPostFullscreen() {
    await this.modal.openFullscreen(MobilePostDetailPageComponent, {
      // Pass any props your post detail page needs
      postId: '123',
      // You can pass other data too
    });
  }

  /**
   * Example 2: Open post as card modal (Recommended)
   * Best for: Standard mobile modal experience
   * This maintains context and feels natural on iOS
   */
  async openPostCard() {
    await this.modal.openCard(MobilePostDetailPageComponent, {
      postId: '123'
    });
  }

  /**
   * Example 3: Open post as bottom sheet
   * Best for: Quick preview or contextual content
   */
  async openPostSheet() {
    await this.modal.openSheet(
      MobilePostDetailPageComponent,
      { postId: '123' },
      {
        initialBreakpoint: 0.75,
        breakpoints: [0, 0.5, 0.75, 1],
        swipeToClose: true
      }
    );
  }

  /**
   * Example 4: Open with custom configuration
   * Full control over modal behavior
   */
  async openPostCustom() {
    const modal = await this.modal.open({
      component: MobilePostDetailPageComponent,
      componentProps: {
        postId: '123'
      },
      presentationStyle: 'card',
      backdropDismiss: true,
      cssClass: 'custom-post-modal',
      mode: 'ios'
    });

    // Listen for when the modal is dismissed
    const { data, role } = await modal.onDidDismiss();
    
    if (role === 'action') {
      console.log('Post action taken:', data);
    }
  }

  /**
   * Example 5: Open from post card click
   * Practical example for feed integration
   */
  async handlePostCardClick(postId: string) {
    await this.modal.openCard(MobilePostDetailPageComponent, {
      postId: postId
    });
  }
}

