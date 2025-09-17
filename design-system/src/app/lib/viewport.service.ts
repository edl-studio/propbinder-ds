import { Injectable, OnDestroy } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewportService implements OnDestroy {
  private mobileQuery: MediaQueryList | undefined;
  isMobile = signal(false); // Default to false for SSR
  
  private listener = (e: MediaQueryListEvent) => {
    this.isMobile.set(e.matches);
  };

  constructor() {
    // Check if we're in browser environment
    if (typeof window !== 'undefined') {
      this.mobileQuery = window.matchMedia('(max-width: 991px)');
      this.isMobile.set(this.mobileQuery.matches);
      this.mobileQuery.addEventListener('change', this.listener);
    }
  }

  ngOnDestroy() {
    if (this.mobileQuery) {
      this.mobileQuery.removeEventListener('change', this.listener);
    }
  }
}
