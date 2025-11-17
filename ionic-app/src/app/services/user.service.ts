import { Injectable, signal } from '@angular/core';

/**
 * User service for managing current user data globally
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // User avatar configuration
  private _avatarInitials = signal('LM');
  private _avatarType = signal<'initials' | 'photo' | 'icon'>('initials');
  private _avatarSrc = signal('');
  
  // Readonly computed values
  readonly avatarInitials = this._avatarInitials.asReadonly();
  readonly avatarType = this._avatarType.asReadonly();
  readonly avatarSrc = this._avatarSrc.asReadonly();
  
  /**
   * Update avatar configuration
   */
  setAvatarInitials(initials: string) {
    this._avatarInitials.set(initials);
  }
  
  setAvatarType(type: 'initials' | 'photo' | 'icon') {
    this._avatarType.set(type);
  }
  
  setAvatarSrc(src: string) {
    this._avatarSrc.set(src);
  }
}

