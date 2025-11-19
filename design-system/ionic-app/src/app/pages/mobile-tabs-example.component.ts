import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DsMobileTabsComponent, TabConfig } from '../components/ds-mobile-tabs';

@Component({
  selector: 'app-mobile-tabs-example',
  standalone: true,
  imports: [DsMobileTabsComponent],
  styles: [`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
      position: relative;
    }
  `],
  template: `
      <ds-mobile-tabs
        [tabs]="tabs"
        [avatarInitials]="userService.avatarInitials()"
        (avatarClick)="handleAvatarClick()"
      />
  `
})
export class MobileTabsExampleComponent implements OnInit {
  constructor(public userService: UserService) {
    console.log('MobileTabsExampleComponent constructor');
  }
  
  ngOnInit() {
    console.log('MobileTabsExampleComponent ngOnInit');
    // Configure user avatar globally - this is now the single source of truth
    this.userService.setAvatarInitials('LM');
    this.userService.setAvatarType('initials');
  }
  
  tabs: TabConfig[] = [
    {
      id: 'home',
      label: 'Home',
      route: 'home',
      icon: 'remixHomeSmile2Line',
      iconActive: 'remixHomeSmile2Fill'
    },
    {
      id: 'inquiries',
      label: 'Inquiries',
      route: 'inquiries',
      icon: 'remixFileList3Line',
      iconActive: 'remixFileList3Fill'
    },
    {
      id: 'announcements',
      label: 'Community',
      route: 'announcements',
      icon: 'remixCommunityLine',
      iconActive: 'remixCommunityFill'
    },
    {
      id: 'handbook',
      label: 'Handbook',
      route: 'handbook',
      icon: 'remixBook2Line',
      iconActive: 'remixBook2Fill'
    }
  ];
  
  handleAvatarClick(): void {
    console.log('Avatar clicked - could navigate to profile/settings');
  }
}
