import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DsMobilePageMainComponent } from '../../components/page-main';
import { DsMobileContentComponent } from '../../components/content';
import { 
  DsMobilePostCardComponent,
  PostContentComponent,
  PostTextComponent,
  PostMediaComponent,
  PostActionsComponent,
  ActionLikeComponent,
  ActionCommentComponent
} from '../../components/post-card';
import { DsMobilePostComposerComponent } from '../../components/post-composer';
import { DsMobileBottomSheetService } from '../../components/bottom-sheet/ds-mobile-bottom-sheet.service';
import { DsMobilePostCreateBottomSheetComponent } from '../../components/bottom-sheet/ds-mobile-post-create-bottom-sheet';
import { DsMobileLightboxService, LightboxAuthor } from '../../components/lightbox';
import { DsMobileModalService } from '../../components/modal/ds-mobile-modal.service';
import { MobilePostDetailPageComponent } from '../post-detail.page';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-mobile-community-page',
  standalone: true,
  imports: [
    DsMobilePageMainComponent,
    DsMobileContentComponent,
    DsMobilePostCardComponent,
    DsMobilePostComposerComponent,
    PostContentComponent,
    PostTextComponent,
    PostMediaComponent,
    PostActionsComponent,
    ActionLikeComponent,
    ActionCommentComponent
  ],
  styles: [`
    .post-feed {
      display: flex;
      flex-direction: column;
      max-width: 640px;
    }
    
    .clickable-image {
      cursor: pointer;
      transition: transform 0.2s ease, opacity 0.2s ease;
      border-radius: 8px;
      display: block;
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
    }
    
    .clickable-image:active {
      transform: scale(0.98);
      opacity: 0.9;
    }
  `],
  template: `
    <ds-mobile-page-main
      title="Community"
      [avatarInitials]="userService.avatarInitials()"
      [avatarType]="userService.avatarType()"
      (refresh)="handleRefresh($event)">
      
      <!-- Post Composer in header-expandable -->
      <ds-mobile-post-composer
        header-content
        [avatarInitials]="userService.avatarInitials()"
        [avatarType]="userService.avatarType()"
        [avatarSrc]="userService.avatarSrc()"
        (composerClick)="openPostCreator()"
      />
      
      <ds-mobile-content>
        <div class="post-feed">
          <!-- Post 1: Text only -->
          <ds-mobile-post-card
            [authorName]="'John Doe'"
            [authorRole]="'Tenant'"
            [timestamp]="'2h ago'"
            [avatarType]="'photo'"
            [avatarSrc]="'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'"
            [clickable]="true"
            (postClick)="openPostModal('1')"
            (commentClick)="openPostModal('1')">
            
            <post-content>
              <post-text>Just moved into my new apartment! The landlord was super helpful during the whole process. Really excited to be part of this community! 🏠</post-text>
            </post-content>
            
            <post-actions>
              <action-like [count]="42" />
              <action-comment [count]="12" (commentClick)="openPostModal('1')" />
            </post-actions>
          </ds-mobile-post-card>

          <!-- Post 2: With image -->
          <ds-mobile-post-card
            [authorName]="'Sarah Miller'"
            [authorRole]="'Tenant'"
            [timestamp]="'4h ago'"
            [avatarInitials]="'SM'"
            [clickable]="true"
            (postClick)="openPostModal('2')"
            (commentClick)="openPostModal('2')">
            
            <post-content>
              <post-text>Look at this beautiful view from my balcony! Morning coffee never tasted this good ☕️</post-text>
              <post-media>
                <img 
                  src="/Assets/Dummy-photos/balcony-view.jpg" 
                  alt="Balcony view" 
                  class="clickable-image"
                  (click)="openImageLightbox('/Assets/Dummy-photos/balcony-view.jpg', 'Balcony view', 'Morning coffee never tasted this good', $event)"
                />
              </post-media>
            </post-content>
            
            <post-actions>
              <action-like [active]="true" [count]="156" />
              <action-comment [count]="34" (commentClick)="openPostModal('2')" />
            </post-actions>
          </ds-mobile-post-card>

          <!-- Post 3: Question -->
          <ds-mobile-post-card
            [authorName]="'Mike Johnson'"
            [authorRole]="'Tenant'"
            [timestamp]="'1d ago'"
            [avatarType]="'photo'"
            [avatarSrc]="'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'"
            [clickable]="true"
            (postClick)="openPostModal('3')"
            (commentClick)="openPostModal('3')">
            
            <post-content>
              <post-text>Does anyone know if there's a community gym nearby? Looking for recommendations for good fitness centers in the area. 🏋️</post-text>
            </post-content>
            
            <post-actions>
              <action-like [count]="23" />
              <action-comment [count]="45" (commentClick)="openPostModal('3')" />
            </post-actions>
          </ds-mobile-post-card>

          <!-- Post 4: Announcement style -->
          <ds-mobile-post-card
            [authorName]="'Jennifer Torres'"
            [authorRole]="'Property Manager'"
            [timestamp]="'2d ago'"
            [avatarInitials]="'JT'"
            [showBadge]="true"
            [clickable]="true"
            (postClick)="openPostModal('4')"
            (commentClick)="openPostModal('4')">
            
            <post-content>
              <post-text>📢 Reminder: Building maintenance scheduled for this Saturday from 9 AM to 2 PM. Water will be temporarily shut off. Please plan accordingly!</post-text>
            </post-content>
            
            <post-actions>
              <action-like [count]="89" />
              <action-comment [count]="67" (commentClick)="openPostModal('4')" />
            </post-actions>
          </ds-mobile-post-card>

          <!-- Post 5: Event -->
          <ds-mobile-post-card
            [authorName]="'Emma Brown'"
            [authorRole]="'Tenant'"
            [timestamp]="'3d ago'"
            [avatarType]="'photo'"
            [avatarSrc]="'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'"
            [clickable]="true"
            (postClick)="openPostModal('5')"
            (commentClick)="openPostModal('5')">
            
            <post-content>
              <post-text>Organizing a community BBQ next weekend! Everyone's invited. Bring your favorite dish to share. Let's get to know each other better! 🍔🌭</post-text>
            </post-content>
            
            <post-actions>
              <action-like [active]="true" [count]="124" />
              <action-comment [count]="89" (commentClick)="openPostModal('5')" />
            </post-actions>
          </ds-mobile-post-card>
        </div>
      </ds-mobile-content>
    </ds-mobile-page-main>
  `
})
export class MobileCommunityPageComponent {
  constructor(
    private router: Router,
    private bottomSheet: DsMobileBottomSheetService,
    private lightbox: DsMobileLightboxService,
    private modal: DsMobileModalService,
    public userService: UserService
  ) {}
  
  handleRefresh(event: any): void {
    console.log('Pull-to-refresh triggered');
    setTimeout(() => {
      console.log('Refresh complete');
      event.target.complete();
    }, 1000);
  }
  
  /**
   * OPTION 1: Open post via router navigation (old way)
   * Navigates to a new page, losing scroll position
   */
  openPost(postId: string): void {
    this.router.navigate(['/mobile-tabs-example/announcements/post', postId]);
  }
  
  /**
   * OPTION 2: Open post as modal (new way - RECOMMENDED)
   * Opens post in a modal, maintaining context and scroll position
   * Feels more natural on mobile, especially iOS
   */
  async openPostModal(postId: string): Promise<void> {
    console.log('[Community] Opening post as modal:', postId);
    
    // Open the post detail page as a card modal
    const modal = await this.modal.openCard(MobilePostDetailPageComponent, {
      postId: postId,
      // You can pass any other props your post detail page might need
    });
    
    // Optionally handle when the modal is dismissed
    const { data, role } = await modal.onDidDismiss();
    
    if (role === 'action' && data) {
      console.log('[Community] Post action:', data);
      // Handle any actions from the post (like, comment, etc.)
    }
  }
  
  /**
   * OPTION 3: Open post as fullscreen modal
   * Alternative if you want a full-screen experience
   */
  async openPostFullscreen(postId: string): Promise<void> {
    await this.modal.openFullscreen(MobilePostDetailPageComponent, {
      postId: postId
    });
  }
  
  /**
   * OPTION 4: Open post as bottom sheet
   * Good for quick previews
   */
  async openPostSheet(postId: string): Promise<void> {
    await this.modal.openSheet(
      MobilePostDetailPageComponent,
      { postId },
      {
        initialBreakpoint: 0.75,
        breakpoints: [0, 0.5, 0.75, 1],
        swipeToClose: true
      }
    );
  }
  
  async openPostCreator(): Promise<void> {
    // Open the post creator as a bottom sheet modal
    // Using 95% initial height to maximize keyboard auto-open chances
    const sheet = await this.bottomSheet.create({
      component: DsMobilePostCreateBottomSheetComponent,
      componentProps: {
        // This helps the component know it should auto-focus
        autoFocus: true
      },
      breakpoints: [0, 0.95, 1],
      initialBreakpoint: 0.95,
      handle: true,
      backdropBlur: true,
      backdropOpacity: 0.6
    });
    
    // Handle the result when the sheet is dismissed
    const result = await sheet.onWillDismiss();
    if (result.role === 'post' && result.data) {
      console.log('New post created:', result.data);
      // TODO: Add the post to the feed
      // this.postService.createPost(result.data.content).subscribe(...);
    }
  }
  
  /**
   * Open an image in the lightbox viewer
   * Prevents the post click event from firing
   */
  openImageLightbox(imageSrc: string, title: string, description: string, event: Event): void {
    console.log('[Community] Opening lightbox for image:', imageSrc);
    
    // Prevent the post card click event from firing
    event.stopPropagation();
    
    const authorMeta: LightboxAuthor = {
      name: 'Sarah Miller',
      role: 'Tenant',
      avatarInitials: 'SM',
      timestamp: '4h ago'
    };
    
    // Open the lightbox with the image
    this.lightbox.open({
      images: [
        {
          type: 'image',
          src: imageSrc,
          alt: title,
          title: title,
          description: description,
          isLiked: true,
          likeCount: 156,
          commentCount: 34
        }
      ],
      author: authorMeta,
      enableZoom: true,
      showControls: false, // Single image, no need for controls
      showInfo: true
    });
  }
}

