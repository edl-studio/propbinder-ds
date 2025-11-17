import { Component, signal, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DsAvatarComponent,
  DsIconComponent,
  DsButtonComponent,
  DsMobilePageDetailsComponent
} from '@propbinder/design-system';
import { UserService } from '../services/user.service';

/**
 * PostCreatePageComponent
 * 
 * Full-screen detail page for creating new posts in the community feed.
 * Features Threads-inspired interface with rich text editing capabilities.
 */
@Component({
  selector: 'app-post-create-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DsAvatarComponent,
    DsIconComponent,
    DsButtonComponent,
    DsMobilePageDetailsComponent
  ],
  styles: [`
    .post-create-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      max-width: 640px;
    }
    
    /* ============================================
       CONTENT AREA
       ============================================ */
    
    .content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }
    
    .post-composer {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
      align-items: flex-start;
    }
    
    .post-composer__avatar {
      flex-shrink: 0;
      padding-top: 2px;
    }
    
    .post-composer__main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .post-composer__header {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 32px;
    }
    
    .post-composer__username {
      font-family: 'Brockmann', sans-serif;
      font-size: 15px;
      font-weight: 600;
      line-height: 20px;
      letter-spacing: -0.3px;
      color: var(--color-text-primary, #1a1a1a);
    }
    
    .post-composer__textarea {
      width: 100%;
      min-height: 120px;
      border: none;
      outline: none;
      resize: none;
      font-family: 'Brockmann', sans-serif;
      font-size: 15px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: -0.3px;
      color: var(--color-text-primary, #1a1a1a);
      background: transparent;
      padding: 0;
    }
    
    .post-composer__textarea::placeholder {
      color: var(--color-text-tertiary, #999999);
    }
    
    .post-composer__actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    
    .post-composer__action-btns {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .post-composer__action-btn {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-secondary, #737373);
      transition: color 0.2s ease;
    }
    
    .post-composer__action-btn:hover {
      color: var(--color-text-primary, #1a1a1a);
    }
    
    /* Thread connector line */
    .thread-line {
      position: absolute;
      left: 35px;
      top: 60px;
      bottom: 0;
      width: 2px;
      background: var(--border-color-default);
    }
    
    /* ============================================
       MOBILE OPTIMIZATIONS
       ============================================ */
    
    @media (max-width: 768px) {
      .content {
        padding: 12px 16px;
      }
    }
  `],
  template: `
    <ds-mobile-page-details
      [title]="pageTitle()"
      [backRoute]="'/mobile-tabs-example/announcements'"
      (back)="handleCancel()">
      
      <div class="post-create-container">
        <div class="post-composer">
          <div class="post-composer__avatar">
            <ds-avatar 
              [initials]="userService.avatarInitials()"
              [type]="userService.avatarType()"
              [src]="userService.avatarSrc()"
              size="md" />
          </div>
          
          <div class="post-composer__main">
            <div class="post-composer__header">
              <span class="post-composer__username">{{ username() }}</span>
            </div>
            
            <textarea
              #textareaInput
              class="post-composer__textarea"
              [(ngModel)]="postContent"
              [placeholder]="placeholder()"
              (input)="handleInput()">
            </textarea>
            
            <div class="post-composer__actions">
              <div class="post-composer__action-btns">
                <button class="post-composer__action-btn" (click)="handleAddImage()">
                  <ds-icon name="remixImageLine" size="22px" />
                </button>
                <button class="post-composer__action-btn" (click)="handleAddEmoji()">
                  <ds-icon name="remixEmotionLine" size="22px" />
                </button>
              </div>
              
              <ds-button
                variant="primary"
                size="md"
                [disabled]="!canPost()"
                (clicked)="handlePost()">
                {{ submitButtonLabel() }}
              </ds-button>
            </div>
          </div>
        </div>
      </div>
    </ds-mobile-page-details>
  `
})
export class PostCreatePageComponent implements AfterViewInit, OnInit {
  @ViewChild('textareaInput') textareaInput?: ElementRef<HTMLTextAreaElement>;
  
  postContent = '';
  username = signal('Lars Mikkelsen');
  placeholder = signal("What's new?");
  
  // Edit mode state
  isEditMode = signal(false);
  postId = signal<string | null>(null);
  pageTitle = signal('New post');
  submitButtonLabel = signal('Post');
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserService
  ) {}
  
  ngOnInit(): void {
    // Check for edit mode via query parameters
    this.route.queryParams.subscribe(params => {
      const editMode = params['edit'] === 'true';
      const postId = params['id'];
      const content = params['content'];
      
      if (editMode && postId) {
        this.isEditMode.set(true);
        this.postId.set(postId);
        this.pageTitle.set('Edit post');
        this.submitButtonLabel.set('Save');
        
        // Prefill content if provided
        if (content) {
          this.postContent = decodeURIComponent(content);
        }
      } else {
        // Reset to create mode
        this.isEditMode.set(false);
        this.postId.set(null);
        this.pageTitle.set('New post');
        this.submitButtonLabel.set('Post');
        this.postContent = '';
      }
    });
  }
  
  ngAfterViewInit(): void {
    // Focus the textarea after view initialization to trigger keyboard on mobile
    setTimeout(() => {
      this.textareaInput?.nativeElement.focus();
    }, 300);
  }
  
  handleInput(): void {
    // Handle text input changes
  }
  
  canPost(): boolean {
    return this.postContent.trim().length > 0;
  }
  
  handleCancel(): void {
    if (this.postContent.trim().length > 0) {
      // Show confirmation dialog
      const confirmed = confirm('Discard this post?');
      if (confirmed) {
        this.router.navigate(['/mobile-tabs-example/community']);
      }
    } else {
      this.router.navigate(['/mobile-tabs-example/community']);
    }
  }
  
  handlePost(): void {
    if (!this.canPost()) return;
    
    if (this.isEditMode()) {
      console.log('Updating post:', this.postId(), this.postContent);
      // TODO: Implement post update logic
      // this.postService.updatePost(this.postId(), this.postContent).subscribe(() => {
      //   this.router.navigate(['/mobile-tabs-example/community']);
      // });
    } else {
      console.log('Creating post:', this.postContent);
      // TODO: Implement post creation logic
      // this.postService.createPost(this.postContent).subscribe(() => {
      //   this.router.navigate(['/mobile-tabs-example/community']);
      // });
    }
    
    // For now, just navigate back
    this.router.navigate(['/mobile-tabs-example/community']);
  }
  
  handleAddImage(): void {
    console.log('Add image');
    // TODO: Open image picker
  }
  
  handleAddEmoji(): void {
    console.log('Add emoji');
    // TODO: Open emoji picker
  }
}

