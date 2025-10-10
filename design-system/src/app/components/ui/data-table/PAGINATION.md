# Data Table Pagination Guide

## Overview

The `ds-data-table` component supports two pagination modes:

1. **Client-Side Pagination** (default) - Best for small to medium datasets
2. **Server-Side Pagination** - Best for large datasets

## Client-Side Pagination

### When to Use
- Dataset < 1,000 rows
- Data doesn't change frequently
- Want instant search, sort, and filter
- Simpler implementation

### Example

```typescript
@Component({
  template: `
    <ds-data-table 
      [data]="allUsers" 
      [columns]="columns"
      [paginated]="true"
      [pageSize]="25"
      [pageSizeOptions]="[10, 25, 50, 100]"
    />
  `
})
export class UserListComponent {
  allUsers = signal<User[]>([/* all 500 users */]);
  columns: ColumnDef<User>[] = [/* ... */];
}
```

### Features
✅ Instant pagination, no API calls  
✅ Instant search and filtering  
✅ Instant sorting  
✅ All data loaded once  
✅ Works out of the box

## Server-Side Pagination

### When to Use
- Dataset > 1,000 rows
- Data changes frequently on the server
- Want to reduce initial load time
- Want to minimize memory usage
- Backend has pagination support

### Required Inputs

| Input | Type | Description |
|-------|------|-------------|
| `serverSide` | `boolean` | Enable server-side mode |
| `totalItems` | `number` | Total count of all items on server |
| `currentPage` | `number` | Current page index (0-based) |
| `data` | `T[]` | Current page data only |

### Output Events

| Output | Type | Description |
|--------|------|-------------|
| `pageChanged` | `{ pageIndex: number; pageSize: number }` | Emitted when page or page size changes |
| `searchChanged` | `string` | Emitted when search query changes |
| `sortingChanged` | `SortingState` | Emitted when sorting changes |

### Basic Example

```typescript
import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  template: `
    <ds-data-table 
      [data]="users()" 
      [columns]="columns"
      [serverSide]="true"
      [totalItems]="totalUsers()"
      [currentPage]="page()"
      [pageSize]="pageSize()"
      (pageChanged)="onPageChange($event)"
      (searchChanged)="onSearch($event)"
      (sortingChanged)="onSort($event)"
    />
  `
})
export class UserListComponent {
  // State
  users = signal<User[]>([]);
  totalUsers = signal<number>(0);
  page = signal<number>(0);
  pageSize = signal<number>(25);
  searchQuery = signal<string>('');
  
  columns: ColumnDef<User>[] = [/* ... */];

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  onPageChange(event: { pageIndex: number; pageSize: number }) {
    this.page.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadUsers();
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
    this.page.set(0); // Reset to first page
    this.loadUsers();
  }

  onSort(sorting: SortingState) {
    this.page.set(0); // Reset to first page
    this.loadUsers();
  }

  loadUsers() {
    const params = {
      page: this.page(),
      pageSize: this.pageSize(),
      search: this.searchQuery()
    };

    this.http.get<ApiResponse>('/api/users', { params })
      .subscribe(response => {
        this.users.set(response.data);
        this.totalUsers.set(response.total);
      });
  }
}
```

### Features
✅ Handles millions of rows  
✅ Reduced memory usage  
✅ Faster initial load  
✅ Parent controls data fetching  
✅ Backend handles heavy lifting

## Advanced Patterns

### With Loading State

```typescript
@Component({
  template: `
    <div class="table-wrapper">
      @if (isLoading()) {
        <div class="loading-overlay">
          <ds-spinner />
        </div>
      }
      
      <ds-data-table 
        [data]="users()" 
        [columns]="columns"
        [serverSide]="true"
        [totalItems]="totalUsers()"
        [currentPage]="page()"
        (pageChanged)="onPageChange($event)"
      />
    </div>
  `
})
export class UserListComponent {
  isLoading = signal<boolean>(false);
  
  async loadUsers() {
    this.isLoading.set(true);
    
    try {
      const response = await this.fetchUsers();
      this.users.set(response.data);
      this.totalUsers.set(response.total);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
```

### With Debounced Search

```typescript
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

export class UserListComponent {
  private searchSubject = new Subject<string>();

  constructor(private http: HttpClient) {
    // Debounce search to reduce API calls
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchQuery.set(query);
      this.page.set(0);
      this.loadUsers();
    });

    this.loadUsers();
  }

  onSearch(query: string) {
    // Don't fetch immediately, let debounce handle it
    this.searchSubject.next(query);
  }
}
```

### With Error Handling

```typescript
export class UserListComponent {
  error = signal<string | null>(null);
  
  async loadUsers() {
    this.error.set(null);
    
    try {
      const response = await this.http.get<ApiResponse>('/api/users', {
        params: this.buildParams()
      }).toPromise();
      
      this.users.set(response.data);
      this.totalUsers.set(response.total);
    } catch (err) {
      this.error.set('Failed to load users. Please try again.');
      console.error('Error:', err);
    }
  }
}
```

### With Caching

```typescript
export class UserListComponent {
  private cache = new Map<string, { data: User[]; total: number }>();

  loadUsers() {
    const cacheKey = this.buildCacheKey();
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      this.users.set(cached.data);
      this.totalUsers.set(cached.total);
      return;
    }

    // Fetch from server
    this.http.get<ApiResponse>('/api/users', { params: this.buildParams() })
      .subscribe(response => {
        this.users.set(response.data);
        this.totalUsers.set(response.total);
        
        // Cache the result
        this.cache.set(cacheKey, {
          data: response.data,
          total: response.total
        });
      });
  }

  private buildCacheKey(): string {
    return `${this.page()}-${this.pageSize()}-${this.searchQuery()}`;
  }
}
```

## Backend Implementation Example

### Node.js / Express

```javascript
app.get('/api/users', async (req, res) => {
  const { page = 0, pageSize = 10, search = '', sortBy = 'id', sortOrder = 'asc' } = req.query;
  
  const offset = page * pageSize;
  
  // Build query
  let query = db('users');
  
  // Search
  if (search) {
    query = query.where('name', 'like', `%${search}%`)
      .orWhere('email', 'like', `%${search}%`);
  }
  
  // Count total
  const [{ count }] = await query.clone().count('* as count');
  
  // Sort and paginate
  const data = await query
    .orderBy(sortBy, sortOrder)
    .limit(pageSize)
    .offset(offset);
  
  res.json({
    data,
    total: count,
    page: parseInt(page),
    pageSize: parseInt(pageSize)
  });
});
```

### Django / Python

```python
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.paginator import Paginator
from django.db.models import Q

@api_view(['GET'])
def get_users(request):
    page = int(request.GET.get('page', 0))
    page_size = int(request.GET.get('pageSize', 10))
    search = request.GET.get('search', '')
    
    # Filter
    queryset = User.objects.all()
    if search:
        queryset = queryset.filter(
            Q(name__icontains=search) | Q(email__icontains=search)
        )
    
    # Paginate
    paginator = Paginator(queryset, page_size)
    page_obj = paginator.get_page(page + 1)  # Django pages are 1-indexed
    
    return Response({
        'data': UserSerializer(page_obj.object_list, many=True).data,
        'total': paginator.count,
        'page': page,
        'pageSize': page_size
    })
```

## Performance Tips

### Client-Side
1. Use `trackBy` functions for better rendering performance
2. Memoize expensive cell formatters
3. Consider virtual scrolling for 500+ rows

### Server-Side
1. Add database indexes on sortable/searchable columns
2. Use debouncing for search (300ms recommended)
3. Implement caching for frequently accessed pages
4. Use cursor-based pagination for very large datasets
5. Consider response compression (gzip)

## Migration Guide

### From Client-Side to Server-Side

**Before:**
```typescript
<ds-data-table 
  [data]="allUsers" 
  [columns]="columns"
/>
```

**After:**
```typescript
<ds-data-table 
  [data]="currentPageUsers()" 
  [columns]="columns"
  [serverSide]="true"
  [totalItems]="totalCount()"
  [currentPage]="page()"
  (pageChanged)="onPageChange($event)"
  (searchChanged)="onSearch($event)"
/>
```

**Steps:**
1. Add `serverSide` input
2. Add `totalItems` input with total count from API
3. Add `currentPage` input to track current page
4. Change `data` to only contain current page items
5. Add event handlers for `pageChanged` and `searchChanged`
6. Implement data fetching logic

## Troubleshooting

### Issue: Table shows "No data available" with server-side pagination
**Solution:** Ensure `totalItems` is set correctly and data array is not empty.

### Issue: Page count is incorrect
**Solution:** Verify `totalItems` matches the actual total count from your API.

### Issue: Search doesn't reset to page 0
**Solution:** In your `searchChanged` handler, call `this.page.set(0)` before fetching.

### Issue: Pagination buttons don't update after page change
**Solution:** Ensure you're updating the `currentPage` signal after the API call completes.

## API Reference

See the main component documentation for complete API details.

