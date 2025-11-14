# Commit on Blur/Enter Feature

## Overview

This feature adds a new `(cellCommitted)` event that fires only when the user finishes editing a cell (on blur or Enter key press), as opposed to the existing `(cellEdited)` event which fires on every keystroke. This is perfect for optimizing API calls!

## Implementation

### What Was Added

1. **Base Editable Cell Component**
   - Added `valueCommitted` output alongside existing `valueChanged` output
   - `valueChanged`: Fires on every keystroke (existing behavior)
   - `valueCommitted`: Fires only on blur or Enter key

2. **Cell Components**
   - **EditableTextCellComponent**: Emits `valueCommitted` on blur and Enter key
   - **EditableNumberCellComponent**: Emits `valueCommitted` on blur and Enter key
   - **EditableSelectCellComponent**: Emits both events together (since select changes are always discrete)

3. **Main Table Component**
   - Added `cellCommitted` output event
   - Added `onCellCommit()` handler method
   - Updated template to bind to `(valueCommitted)` from cells

## Usage

### Basic Example (What ninjaDax Requested)

```typescript
<ds-editable-table
  [(data)]="data"
  [columns]="columns"
  (cellCommitted)="updateAPI($event)"  // 👈 Only fires on blur/Enter!
/>
```

### Complete Example

```typescript
export class MyComponent {
  data = signal([
    { id: 1, name: 'John', price: 100 },
    { id: 2, name: 'Jane', price: 200 },
  ]);

  // This fires on every keystroke - updates local state
  onCellEdited(event: any) {
    console.log('Cell edited:', event);
    // Local state is already updated by the table
  }

  // This fires only when editing is complete - perfect for API calls
  onCellCommitted(event: any) {
    console.log('Committing to API:', event);
    // Make your API call here!
    this.apiService.updateCell(event.row, event.column, event.value).subscribe();
  }
}
```

### Event Structure

Both `cellEdited` and `cellCommitted` emit the same event structure:

```typescript
{
  row: T;           // The complete row data
  rowIndex: number; // The row index
  column: string;   // The column accessor key
  value: any;       // The new value
}
```

## When to Use Each Event

### Use `(cellEdited)` when:
- You need to react to every change immediately
- You're doing client-side validation
- You're updating other UI elements in real-time

### Use `(cellCommitted)` when:
- Making API calls to save data
- Running expensive operations
- You only care about the final value, not intermediate states

### Use Both Together:
```typescript
<ds-editable-table
  [(data)]="data"
  [columns]="columns"
  (cellEdited)="validateInput($event)"    // Validate on every keystroke
  (cellCommitted)="saveToAPI($event)"     // Save only when done
/>
```

## How It Works

### Text & Number Inputs
- Listens to the `blurred` event from `ds-input`
- Listens to `keydown.enter` event
- Emits the current cell value when either event fires

### Select Inputs
- Emits both `valueChanged` and `valueCommitted` simultaneously
- This makes sense because selecting an option is always a complete action

## Storybook Demo

Check out the **"Commit on Blur Demo"** story in Storybook to see this feature in action! The demo includes:
- A live counter showing how many "API calls" would be made
- Console logging to see the difference between `cellEdited` and `cellCommitted`
- Try typing in a cell and watch - the counter only increments when you blur or press Enter!

## Benefits

✅ **Performance**: Reduce API calls from dozens per field to just one  
✅ **Better UX**: Users can type freely without triggering API calls on every keystroke  
✅ **Flexibility**: Use `cellEdited` for validation, `cellCommitted` for persistence  
✅ **Backward Compatible**: Existing code using `cellEdited` continues to work  

## Migration Guide

If you want to switch from `cellEdited` to `cellCommitted`:

**Before:**
```typescript
<ds-editable-table
  (cellEdited)="saveToAPI($event)"
/>
```

**After:**
```typescript
<ds-editable-table
  (cellCommitted)="saveToAPI($event)"  // Only fires on blur/Enter now!
/>
```

That's it! No other changes needed.

## Files Modified

- `base-editable-cell.component.ts` - Added `valueCommitted` output
- `editable-text-cell.component.ts` - Added blur/Enter handlers
- `editable-number-cell.component.ts` - Added blur/Enter handlers
- `editable-select-cell.component.ts` - Emits commit on value change
- `ds-editable-table.ts` - Added `cellCommitted` output and handler
- `ds-editable-table.stories.ts` - Added "Commit on Blur Demo" story

## Example from Storybook

The demo shows a materials table where you can edit names and prices. Above the table is a counter showing how many API calls would have been made. Try editing a field and you'll see the counter only increments when you:
1. Press Enter, or
2. Click outside the input (blur)

This perfectly matches ninjaDax's request! 🎉

