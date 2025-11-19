import { Component, signal, computed } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DsIconComponent } from '@propbinder/design-system';
import { DsMobilePageMainComponent } from '../components/page-main';
import { DsMobileContentComponent } from '../components/content';
import { 
  DsMobileInteractiveListItemPostComponent,
  PostContentComponent,
  PostTextComponent,
  PostMediaComponent,
  PostAttachmentsComponent,
  PostActionsComponent,
  ActionLikeComponent,
  ActionCommentComponent,
  PostPdfAttachmentComponent
} from '../components/interactive-list-item-post';
import { DsMobilePostComposerComponent } from '../components/post-composer';
import { DsMobileBottomSheetService } from '../components/bottom-sheet/ds-mobile-bottom-sheet.service';
import { DsMobilePostCreateBottomSheetComponent } from '../components/bottom-sheet/ds-mobile-post-create-bottom-sheet';
import { DsMobilePostActionsBottomSheetComponent, PostActionResult } from '../components/bottom-sheet/ds-mobile-post-actions-bottom-sheet';
import { DsMobileLightboxService, LightboxAuthor } from '../components/lightbox';
import { DsMobilePostDetailModalService } from '../components/post-detail-modal';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-mobile-community-page',
  standalone: true,
  imports: [
    DsMobilePageMainComponent,
    DsMobileContentComponent,
    DsMobileInteractiveListItemPostComponent,
    DsMobilePostComposerComponent,
    PostContentComponent,
    PostTextComponent,
    PostMediaComponent,
    PostAttachmentsComponent,
    PostActionsComponent,
    ActionLikeComponent,
    ActionCommentComponent,
    PostPdfAttachmentComponent,
    DsIconComponent
  ],
  styles: [`
    .post-feed {
      display: flex;
      flex-direction: column;
      max-width: 640px;
    }
    
    .pinned-posts-section {
      margin: -12px -12px 12px -12px;
      padding: 0 12px 4px 12px;
      box-shadow: var(--box-shadow-sm);
      border-radius: 16px;
      border: 1px solid var(--border-color-default);
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
    
    /* Empty State */
    .community-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
    }
    
    .empty-state-image {
      width: 96px;
      height: 96px;
      margin-bottom: 24px;
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
          <!-- Pinned Posts Section -->
          <div class="pinned-posts-section">
            <h2 class="section-headline">
              <ds-icon name="remixPushpinFill" size="16px" color="primary" />
              Pinned posts
            </h2>
            
            <!-- Pinned: Maintenance Announcement -->
            <ds-mobile-interactive-list-item-post
              [authorName]="'Jennifer Torres'"
              [authorRole]="'Property Manager'"
              [timestamp]="'2d ago'"
              [avatarInitials]="'JT'"
              [showBadge]="true"
              [clickable]="true"
              (postClick)="openPost('4')"
              (commentClick)="openPost('4', true)"
              (longPress)="handlePostLongPress('4', false)">
              
              <post-content>
                <post-text>📢 Reminder: Building maintenance scheduled for this Saturday from 9 AM to 2 PM. Water will be temporarily shut off. Please plan accordingly!</post-text>
                
                <post-attachments>
                  <post-pdf-attachment
                    [fileName]="'House Rules.pdf'"
                    [fileSize]="'245 KB'"
                    (pdfClick)="openHouseRulesPdf()">
                  </post-pdf-attachment>
                </post-attachments>
              </post-content>
              
              <post-actions>
                <action-like [count]="89" />
                <action-comment [count]="67" (commentClick)="openPost('4', true)" />
              </post-actions>
            </ds-mobile-interactive-list-item-post>
          </div>
          
          <!-- All Posts Section -->
          <h2 class="section-headline">All posts</h2>
          
          @if (hasAnyPosts()) {
            <!-- User Created Posts -->
            @for (post of userPosts(); track $index) {
              <ds-mobile-interactive-list-item-post
                [authorName]="post.authorName"
                [authorRole]="post.authorRole"
                [timestamp]="post.timestamp"
                [avatarType]="post.avatarType"
                [avatarSrc]="post.avatarSrc"
                [avatarInitials]="post.avatarInitials"
                [clickable]="true"
                (postClick)="openUserPost($index)"
                (commentClick)="openUserPost($index, true)"
                (longPress)="handlePostLongPress($index, post.authorRole === 'You')">
                
                <post-content>
                  @if (post.content) {
                    <post-text>{{ post.content }}</post-text>
                  }
                  @if (post.imageSrc) {
                    <post-media>
                      <img 
                        [src]="post.imageSrc" 
                        [alt]="post.imageAlt || 'Posted image'" 
                        class="clickable-image"
                        (click)="openImageLightbox(post.imageSrc, post.imageAlt || 'Posted image', post.content, $event)"
                      />
                    </post-media>
                  }
                </post-content>
                
                <post-actions>
                  <action-like [count]="post.likeCount" [active]="post.isLiked" />
                  <action-comment [count]="post.commentCount" (commentClick)="openUserPost($index, true)" />
                </post-actions>
              </ds-mobile-interactive-list-item-post>
            }
            
            <!-- Post 1: Text only -->
            <ds-mobile-interactive-list-item-post
              [authorName]="'John Doe'"
              [authorRole]="'Tenant'"
              [timestamp]="'2h ago'"
              [avatarType]="'photo'"
              [avatarSrc]="'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'"
              [clickable]="true"
              (postClick)="openPost('1')"
              (commentClick)="openPost('1', true)"
              (longPress)="handlePostLongPress('1', false)">
              
              <post-content>
                <post-text>Just moved into my new apartment! The landlord was super helpful during the whole process. Really excited to be part of this community! 🏠</post-text>
              </post-content>
              
              <post-actions>
                <action-like [count]="42" />
                <action-comment [count]="12" (commentClick)="openPost('1', true)" />
              </post-actions>
            </ds-mobile-interactive-list-item-post>

            <!-- Post 2: With image -->
            <ds-mobile-interactive-list-item-post
              [authorName]="'Sarah Miller'"
              [authorRole]="'Tenant'"
              [timestamp]="'4h ago'"
              [avatarInitials]="'SM'"
              [clickable]="true"
              (postClick)="openPost('2')"
              (commentClick)="openPost('2', true)"
              (longPress)="handlePostLongPress('2', false)">
              
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
                <action-comment [count]="34" (commentClick)="openPost('2', true)" />
              </post-actions>
            </ds-mobile-interactive-list-item-post>

            <!-- Post 3: Question -->
            <ds-mobile-interactive-list-item-post
              [authorName]="'Mike Johnson'"
              [authorRole]="'Tenant'"
              [timestamp]="'1d ago'"
              [avatarType]="'photo'"
              [avatarSrc]="'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'"
              [clickable]="true"
              (postClick)="openPost('3')"
              (commentClick)="openPost('3', true)"
              (longPress)="handlePostLongPress('3', false)">
              
              <post-content>
                <post-text>Does anyone know if there's a community gym nearby? Looking for recommendations for good fitness centers in the area. 🏋️</post-text>
              </post-content>
              
              <post-actions>
                <action-like [count]="23" />
                <action-comment [count]="45" (commentClick)="openPost('3', true)" />
              </post-actions>
            </ds-mobile-interactive-list-item-post>

            <!-- Post 5: Event -->
            <ds-mobile-interactive-list-item-post
              [authorName]="'Emma Brown'"
              [authorRole]="'Tenant'"
              [timestamp]="'3d ago'"
              [avatarType]="'photo'"
              [avatarSrc]="'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'"
              [clickable]="true"
              (postClick)="openPost('5')"
              (commentClick)="openPost('5', true)"
              (longPress)="handlePostLongPress('5', false)">
              
              <post-content>
                <post-text>Organizing a community BBQ next weekend! Everyone's invited. Bring your favorite dish to share. Let's get to know each other better! 🍔🌭</post-text>
              </post-content>
              
              <post-actions>
                <action-like [active]="true" [count]="124" />
                <action-comment [count]="89" (commentClick)="openPost('5', true)" />
              </post-actions>
            </ds-mobile-interactive-list-item-post>
          } @else {
            <!-- Empty State -->
            <div class="community-empty-state">
              <img 
                src="/Assets/Empty state-chat.png" 
                alt="No posts yet" 
                class="empty-state-image"
              />
              <h3 class="empty-state-title">No posts yet</h3>
              <p class="empty-state-description">Be the first to share something with your community</p>
            </div>
          }
        </div>
      </ds-mobile-content>
    </ds-mobile-page-main>
  `
})
export class MobileCommunityPageComponent {
  // Store user-created posts
  userPosts = signal<any[]>([
    {
      id: 'user-post-1',
      authorName: 'Lars Mikkelsen',
      authorRole: 'You',
      timestamp: '5m ago',
      avatarType: 'initials' as 'photo' | 'initials' | 'icon',
      avatarInitials: 'LM',
      content: 'This is my first post! Looking forward to connecting with everyone in the building. 🏠',
      isLiked: false,
      likeCount: 3,
      commentCount: 1
    }
  ]);
  
  // Flag to control whether static demo posts are shown
  // Set to false to see the empty state
  showStaticPosts = signal(true);
  
  // Computed to check if there are any posts to display
  hasAnyPosts = computed(() => {
    return this.userPosts().length > 0 || this.showStaticPosts();
  });
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bottomSheet: DsMobileBottomSheetService,
    private lightbox: DsMobileLightboxService,
    private postModal: DsMobilePostDetailModalService,
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
   * Open post detail modal
   * This provides a better UX than route navigation:
   * - Maintains scroll position
   * - Native iOS-style modal feel
   * - Proper close button that works
   */
  async openPost(postId: string, focusComment: boolean = false): Promise<void> {
    console.log('[Community] Opening post modal:', postId, 'Focus comment:', focusComment);
    
    // Map post ID to post data (in real app, fetch from service)
    const postDataMap: Record<string, any> = {
      '1': {
        postId: '1',
        authorName: 'John Doe',
        authorRole: 'Tenant',
        timestamp: '2h ago',
        avatarType: 'photo' as const,
        avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        content: 'Just moved into my new apartment! The landlord was super helpful during the whole process. Really excited to be part of this community! 🏠',
        isLiked: false,
        likeCount: 42,
        commentCount: 12,
        comments: [
          {
            authorName: 'Jane Smith',
            authorRole: 'Tenant',
            timestamp: '1h ago',
            avatarInitials: 'JS',
            content: 'Welcome to the community!',
            likeCount: 5,
            isOwnComment: false
          },
          {
            authorName: 'Lars Mikkelsen',
            authorRole: 'You',
            timestamp: 'Just now',
            avatarInitials: 'LM',
            content: 'Vxhknbh',
            likeCount: 0,
            isOwnComment: true
          }
        ]
      },
      '2': {
        postId: '2',
        authorName: 'Sarah Miller',
        authorRole: 'Tenant',
        timestamp: '4h ago',
        avatarInitials: 'SM',
        content: 'Look at this beautiful view from my balcony! Morning coffee never tasted this good ☕️',
        imageSrc: '/Assets/Dummy-photos/balcony-view.jpg',
        imageAlt: 'Balcony view',
        isLiked: true,
        likeCount: 156,
        commentCount: 34,
        comments: [
          {
            authorName: 'John Doe',
            authorRole: 'Tenant',
            timestamp: '3h ago',
            avatarInitials: 'JD',
            content: 'Wow, that view is amazing! Which floor are you on?',
            likeCount: 12,
            isOwnComment: false
          },
          {
            authorName: 'Mike Johnson',
            authorRole: 'Tenant',
            timestamp: '3h ago',
            avatarInitials: 'MJ',
            content: 'Beautiful! I can see the skyline from my place too 🌆',
            isLiked: true,
            likeCount: 8,
            isOwnComment: false
          },
          {
            authorName: 'Lars Mikkelsen',
            authorRole: 'You',
            timestamp: 'Just now',
            avatarInitials: 'LM',
            content: 'Vxhknbh',
            likeCount: 0,
            isOwnComment: true
          }
        ]
      },
      '3': {
        postId: '3',
        authorName: 'Mike Johnson',
        authorRole: 'Tenant',
        timestamp: '1d ago',
        avatarType: 'photo' as const,
        avatarSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        content: 'Does anyone know if there\'s a community gym nearby? Looking for recommendations for good fitness centers in the area. 🏋️',
        isLiked: false,
        likeCount: 23,
        commentCount: 45,
        comments: []
      },
      '4': {
        postId: '4',
        authorName: 'Jennifer Torres',
        authorRole: 'Property Manager',
        timestamp: '2d ago',
        avatarInitials: 'JT',
        content: '📢 Reminder: Building maintenance scheduled for this Saturday from 9 AM to 2 PM. Water will be temporarily shut off. Please plan accordingly!',
        isLiked: false,
        likeCount: 89,
        commentCount: 67,
        comments: []
      },
      '5': {
        postId: '5',
        authorName: 'Emma Brown',
        authorRole: 'Tenant',
        timestamp: '3d ago',
        avatarType: 'photo' as const,
        avatarSrc: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        content: 'Organizing a community BBQ next weekend! Everyone\'s invited. Bring your favorite dish to share. Let\'s get to know each other better! 🍔🌭',
        isLiked: true,
        likeCount: 124,
        commentCount: 89,
        comments: []
      }
    };

    const postData = postDataMap[postId];
    
    if (postData) {
      // Add focusComment flag to postData
      await this.postModal.open({ ...postData, focusComment });
    }
  }
  
  /**
   * Open user-created post detail modal
   */
  async openUserPost(index: number, focusComment: boolean = false): Promise<void> {
    const posts = this.userPosts();
    const post = posts[index];
    
    if (post) {
      console.log('[Community] Opening user post modal:', index, 'Focus comment:', focusComment);
      
      // Convert user post to modal format with empty comments array
      const postData = {
        ...post,
        postId: `user-${index}`,
        comments: [] // User posts don't have comments yet
      };
      
      await this.postModal.open({ ...postData, focusComment });
    }
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
      handle: true
    });
    
    // Handle the result when the sheet is dismissed
    const result = await sheet.onWillDismiss();
    if (result.role === 'post' && result.data) {
      console.log('New post created:', result.data);
      
      // Create a new post object
      const newPost = {
        id: `user-post-${Date.now()}`, // Generate unique ID
        authorName: 'Lars Mikkelsen', // Current user name
        authorRole: 'You',
        timestamp: 'Just now',
        avatarType: this.userService.avatarType() as 'photo' | 'initials' | 'icon',
        avatarSrc: this.userService.avatarSrc(),
        avatarInitials: this.userService.avatarInitials(),
        content: result.data.content,
        imageSrc: result.data.images && result.data.images.length > 0 ? result.data.images[0] : undefined,
        imageAlt: result.data.images && result.data.images.length > 0 ? 'Posted image' : undefined,
        isLiked: false,
        likeCount: 0,
        commentCount: 0
      };
      
      // Add to the beginning of the posts array
      this.userPosts.update(posts => [newPost, ...posts]);
    }
  }
  
  /**
   * Open an image in the lightbox viewer
   * Prevents the post click event from firing
   */
  async openImageLightbox(imageSrc: string, title: string, description: string, event: Event): Promise<void> {
    console.log('[Community] Opening lightbox for image:', imageSrc);
    
    // Prevent the post card click event from firing
    event.stopPropagation();
    
    const authorMeta: LightboxAuthor = {
      name: 'Sarah Miller',
      role: 'Tenant',
      avatarInitials: 'SM',
      timestamp: '4h ago'
    };
    
    // Open the lightbox with the image and get the modal instance
    const modal = await this.lightbox.open({
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
    
    // Listen for dismiss event
    const { data } = await modal.onDidDismiss();
    
    // If user clicked comment button, open post detail
    if (data?.action === 'comment') {
      console.log('[Community] Opening post detail for commenting');
      await this.openPost('2', true); // Post 2 is the one with the image, focus comment
    }
  }

  async openHouseRulesPdf(): Promise<void> {
    console.log('[Community] Opening House Rules PDF');
    
    // Author metadata
    const authorMeta: LightboxAuthor = {
      name: 'Jennifer Torres',
      role: 'Property Manager',
      avatarInitials: 'JT',
      timestamp: '2d ago'
    };
    
    // Open the PDF lightbox and get the modal instance
    // Use absolute path for production deployment (Vercel, etc.)
    const modal = await this.lightbox.openPdf({
      pdf: {
        type: 'pdf',
        src: '/Assets/House_Rules.pdf', // Capital A to match public/Assets folder structure
        title: 'House Rules',
        description: 'Building regulations and community guidelines',
        fileSize: 250880, // 245 KB in bytes
        pageCount: 8
      },
      author: authorMeta
    });
    
    // Listen for dismiss event
    const { data } = await modal.onDidDismiss();
    
    // If user clicked comment button, open post detail
    if (data?.action === 'comment') {
      console.log('[Community] Opening post detail for commenting');
      await this.openPost('4', true); // Post 4 is the one with the PDF, focus comment
    }
  }
  
  /**
   * Handle long press on a post to show action sheet
   */
  async handlePostLongPress(postIdOrIndex: string | number, isOwnPost: boolean): Promise<void> {
    console.log('[Community] Post long pressed:', postIdOrIndex, 'isOwn:', isOwnPost);
    
    const sheet = await this.bottomSheet.create({
      component: DsMobilePostActionsBottomSheetComponent,
      componentProps: {
        isOwnPost: isOwnPost
      },
      breakpoints: [0, 0.25, 0.5],
      initialBreakpoint: isOwnPost ? 0.3 : 0.25,
      handle: true,
      backdropDismiss: true
    });
    
    const result = await sheet.onWillDismiss();
    
    if (result.role === 'select' && result.data) {
      const action = (result.data as PostActionResult).action;
      
      switch (action) {
        case 'edit':
          console.log('Edit post:', postIdOrIndex);
          // Open the post create bottom sheet in edit mode
          let postContent = '';
          let postId = '';
          
          // Get post content based on postIdOrIndex
          if (typeof postIdOrIndex === 'number') {
            const post = this.userPosts()[postIdOrIndex];
            if (post) {
              postContent = post.content || '';
              postId = post.id || postIdOrIndex.toString();
            }
          } else {
            // For static posts, we'll need to determine content
            // For now, use a placeholder
            postId = postIdOrIndex.toString();
            postContent = 'Edit this post...';
          }
          
          // Open the bottom sheet in edit mode
          const editSheet = await this.bottomSheet.create({
            component: DsMobilePostCreateBottomSheetComponent,
            componentProps: {
              autoFocus: true,
              isEditMode: true,
              postId: postId,
              initialContent: postContent
            },
            breakpoints: [0, 0.95, 1],
            initialBreakpoint: 0.95,
            handle: true,
            backdropBlur: true,
            backdropOpacity: 0.6
          });
          
          // Handle the result when the sheet is dismissed
          const editResult = await editSheet.onWillDismiss();
          if (editResult.role === 'post' && editResult.data) {
            console.log('Post updated:', editResult.data);
            
            // Update the post in the array
            if (typeof postIdOrIndex === 'number') {
              const currentPosts = this.userPosts();
              const updatedPosts = currentPosts.map((post, index) => 
                index === postIdOrIndex 
                  ? { ...post, content: editResult.data.content, timestamp: 'Just now' }
                  : post
              );
              this.userPosts.set(updatedPosts);
            }
          }
          break;
        case 'delete':
          console.log('Delete post:', postIdOrIndex);
          if (confirm('Are you sure you want to delete this post?')) {
            // If it's a user post (number index), remove it from the array
            if (typeof postIdOrIndex === 'number') {
              const currentPosts = this.userPosts();
              const updatedPosts = currentPosts.filter((_, index) => index !== postIdOrIndex);
              this.userPosts.set(updatedPosts);
            }
            // Otherwise it's a static post, just show confirmation
            else {
              alert('Post deleted!');
            }
          }
          break;
        case 'like':
          console.log('Like post:', postIdOrIndex);
          // Toggle like - in a real app, this would call an API
          alert('Post liked!');
          break;
        case 'reply':
          console.log('Reply to post:', postIdOrIndex);
          // Open the post detail modal with comment input focused
          if (typeof postIdOrIndex === 'number') {
            await this.openUserPost(postIdOrIndex, true);
          } else {
            await this.openPost(postIdOrIndex, true);
          }
          break;
      }
    }
  }
}

