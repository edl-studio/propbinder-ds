import { Component } from '@angular/core';
import { DsMobilePageDetailsComponent } from '../components/page-details';
import { 
  DsMobilePostCardComponent,
  PostContentComponent,
  PostTextComponent,
  PostMediaComponent,
  PostActionsComponent,
  ActionLikeComponent,
  ActionCommentComponent
} from '../components/post-card';
import { DsMobileCommentComponent } from '../components/comment';
import { DsMobileLightboxService, LightboxAuthor } from '../components/lightbox';
import { DsMobileBottomSheetService } from '../components/bottom-sheet/ds-mobile-bottom-sheet.service';
import { DsMobileCommentActionsBottomSheetComponent, CommentActionResult } from '../components/bottom-sheet';

@Component({
  selector: 'app-mobile-post-detail-page',
  standalone: true,
  imports: [
    DsMobilePageDetailsComponent,
    DsMobilePostCardComponent,
    PostContentComponent,
    PostTextComponent,
    PostMediaComponent,
    PostActionsComponent,
    ActionLikeComponent,
    ActionCommentComponent,
    DsMobileCommentComponent
  ],
  styles: [`
    .post-detail-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 640px;
    }
    
    .post-section {
      border-bottom: 1px solid var(--border-color-default);
      padding-bottom: 16px;
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
    
    .comments-section {
      display: flex;
      flex-direction: column;
      /* Negative margin to pull comments out by 8px on each side */
      /* Page has 20px padding, this makes comments effectively 12px from edge */
      margin-left: -8px;
      margin-right: -8px;
    }
    
    .comments-header {
      font-family: 'Brockmann', sans-serif;
      font-size: 18px;
      font-weight: 600;
      line-height: 24px;
      color: var(--color-text-primary, #1a1a1a);
      margin-bottom: 16px;
      /* Add padding to keep header at 20px from edge (8px to offset negative margin) */
      padding-left: 8px;
      padding-right: 8px;
    }
    
    .comments-list {
      display: flex;
      flex-direction: column;
    }
  `],
  template: `
    <ds-mobile-page-details title="Post">
      <div class="post-detail-container">
        <!-- Post Section -->
        <div class="post-section">
          <ds-mobile-post-card
            [authorName]="'Sarah Miller'"
            [authorRole]="'Tenant'"
            [timestamp]="'4h ago'"
            [avatarInitials]="'SM'"
            [variant]="'detail'">
            
            <post-content class="no-indent">
              <post-text>Look at this beautiful view from my balcony! Morning coffee never tasted this good ☕️</post-text>
              <post-media>
                <img 
                  src="/Assets/Dummy-photos/balcony-view.jpg" 
                  alt="Balcony view" 
                  class="clickable-image"
                  (click)="openImageLightbox('/Assets/Dummy-photos/balcony-view.jpg', 'Balcony View', 'Morning coffee never tasted this good ☕️')"
                />
              </post-media>
            </post-content>
            
            <post-actions class="no-indent">
              <action-like [active]="true" [count]="156" />
              <action-comment [count]="34" />
            </post-actions>
          </ds-mobile-post-card>
        </div>
        
        <!-- Comments Section -->
        <div class="comments-section">
          <h2 class="comments-header">{{ repliesCount }} replies</h2>
          
          <div class="comments-list">
            <ds-mobile-comment
              [authorName]="'John Doe'"
              [authorRole]="'Tenant'"
              [timestamp]="'3h ago'"
              [avatarInitials]="'JD'"
              [content]="'Wow, that view is amazing! Which floor are you on?'"
              [likeCount]="12"
              [clickable]="true"
              [isOwnComment]="false"
              (longPress)="handleCommentLongPress('John Doe', 'Wow, that view is amazing! Which floor are you on?', false)" />
            
            <ds-mobile-comment
              [authorName]="'Mike Johnson'"
              [authorRole]="'Tenant'"
              [timestamp]="'3h ago'"
              [avatarInitials]="'MJ'"
              [content]="'Beautiful! I can see the skyline from my place too 🌆'"
              [isLiked]="true"
              [likeCount]="8"
              [clickable]="true"
              [isOwnComment]="true"
              (longPress)="handleCommentLongPress('Mike Johnson', 'Beautiful! I can see the skyline from my place too 🌆', true)" />
            
            <ds-mobile-comment
              [authorName]="'Emma Brown'"
              [authorRole]="'Tenant'"
              [timestamp]="'2h ago'"
              [avatarInitials]="'EB'"
              [content]="'This is exactly why I love living here. Great shot!'"
              [likeCount]="15"
              [clickable]="true"
              [isOwnComment]="false"
              (longPress)="handleCommentLongPress('Emma Brown', 'This is exactly why I love living here. Great shot!', false)" />
            
            <ds-mobile-comment
              [authorName]="'Alex Lee'"
              [authorRole]="'Tenant'"
              [timestamp]="'2h ago'"
              [avatarInitials]="'AL'"
              [content]="'The sunsets from that angle must be incredible'"
              [likeCount]="6"
              [clickable]="true"
              [isOwnComment]="false"
              (longPress)="handleCommentLongPress('Alex Lee', 'The sunsets from that angle must be incredible', false)" />
            
            <ds-mobile-comment
              [authorName]="'Lisa Wang'"
              [authorRole]="'Tenant'"
              [timestamp]="'1h ago'"
              [avatarInitials]="'LW'"
              [content]="'Makes me want to have my morning coffee on the balcony too! ☕'"
              [likeCount]="9"
              [clickable]="true"
              [isOwnComment]="false"
              (longPress)="handleCommentLongPress('Lisa Wang', 'Makes me want to have my morning coffee on the balcony too! ☕', false)" />
            
            <ds-mobile-comment
              [authorName]="'Tom Chen'"
              [authorRole]="'Tenant'"
              [timestamp]="'1h ago'"
              [avatarInitials]="'TC'"
              [content]="'Lucky! My balcony faces the other direction but still nice'"
              [likeCount]="4"
              [clickable]="true"
              [isOwnComment]="false"
              (longPress)="handleCommentLongPress('Tom Chen', 'Lucky! My balcony faces the other direction but still nice', false)" />
            
            <ds-mobile-comment
              [authorName]="'Rachel Peterson'"
              [authorRole]="'Tenant'"
              [timestamp]="'45m ago'"
              [avatarInitials]="'RP'"
              [content]="'This building has the best views in the city hands down'"
              [likeCount]="11"
              [clickable]="true"
              [isOwnComment]="false"
              (longPress)="handleCommentLongPress('Rachel Peterson', 'This building has the best views in the city hands down', false)" />
            
            <ds-mobile-comment
              [authorName]="'Nina Patel'"
              [authorRole]="'Tenant'"
              [timestamp]="'30m ago'"
              [avatarInitials]="'NP'"
              [content]="'I need to check out your balcony sometime! 😍'"
              [clickable]="true"
              [isOwnComment]="false"
              (longPress)="handleCommentLongPress('Nina Patel', 'I need to check out your balcony sometime! 😍', false)" />
          </div>
        </div>
      </div>
    </ds-mobile-page-details>
  `
})
export class MobilePostDetailPageComponent {
  repliesCount = 6;
  
  constructor(
    private lightbox: DsMobileLightboxService,
    private bottomSheet: DsMobileBottomSheetService
  ) {}
  
  /**
   * Open an image in the lightbox viewer
   */
  openImageLightbox(imageSrc: string, title: string, description: string): void {
    const authorMeta: LightboxAuthor = {
      name: 'Sarah Miller',
      role: 'Tenant',
      avatarInitials: 'SM',
      timestamp: '4h ago'
    };
    
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
  
  /**
   * Handle long press on a comment to show action sheet
   */
  async handleCommentLongPress(authorName: string, content: string, isOwnComment: boolean): Promise<void> {
    const sheet = await this.bottomSheet.create({
      component: DsMobileCommentActionsBottomSheetComponent,
      componentProps: {
        isOwnComment: isOwnComment,
        commentAuthor: authorName,
        commentPreview: content
      },
      breakpoints: [0, 0.25, 0.5],
      initialBreakpoint: isOwnComment ? 0.35 : 0.25,
      handle: true,
      backdropDismiss: true
    });
    
    const result = await sheet.onWillDismiss();
    
    if (result.role === 'select' && result.data) {
      const action = (result.data as CommentActionResult).action;
      
      switch (action) {
        case 'like':
          console.log('Like comment by', authorName);
          // Implement like logic
          break;
        case 'reply':
          console.log('Reply to comment by', authorName);
          // Implement reply logic
          break;
        case 'edit':
          console.log('Edit comment by', authorName);
          // Implement edit logic
          break;
        case 'delete':
          console.log('Delete comment by', authorName);
          // Implement delete logic (with confirmation)
          break;
      }
    }
  }
}

