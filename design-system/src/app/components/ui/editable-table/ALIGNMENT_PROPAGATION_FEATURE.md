# Cell-Level Alignment Propagation

## Overview

This feature enables automatic propagation of column-level text alignment (`meta.align`) to editable input fields within table cells. When a developer sets `meta.align: 'right'` on a column, both the header, read-only cell content, and the input field will all align to the right automatically.

## Implementation Details

### What Changed

1. **Cell Data Interfaces**
   - Added `align?: 'left' | 'right' | 'center'` property to:
     - `EditableTextCellData`
     - `EditableNumberCellData`
     - `EditableSelectCellData`

2. **Input Component**
   - Extended `NumberFormatConfig.align` to support `'center'` in addition to `'left'` and `'right'`
   - Added CSS class `.ds-input__field--align-center` for center alignment
   - Updated `inputClasses` computed property to apply center alignment class

3. **Editable Table Template**
   - Created `mergeCellDataWithAlignment()` helper method to merge cell data with column alignment
   - Updated template to automatically pass column alignment to editable cells:
     - `editable-text-cell`
     - `editable-number-cell`
     - `editable-select-cell`
   - Note: `editable-datepicker-cell` not updated (datepicker inputs typically don't support alignment)

4. **Cell Components**
   - **EditableTextCellComponent**: Added `getFormatForAlignment()` method to create format config from alignment
   - **EditableNumberCellComponent**: Updated `getEffectiveFormat()` to merge cell format with alignment
   - **EditableSelectCellComponent**: Added align property (for future use if select supports alignment)

### Files Modified

- `/design-system/src/app/components/ui/input/ds-input.ts`
  - Extended `NumberFormatConfig.align` type
  - Updated `inputClasses` computed property

- `/design-system/src/app/components/ui/input/ds-input.css`
  - Added `.ds-input__field--align-center` class

- `/design-system/src/app/components/ui/editable-table/ds-editable-table.ts`
  - Added `mergeCellDataWithAlignment()` method
  - Updated template to pass alignment to cells

- `/design-system/src/app/components/ui/editable-table/cells/editable-text-cell.component.ts`
  - Added `align` property to interface
  - Added `getFormatForAlignment()` method
  - Updated template to use format for alignment

- `/design-system/src/app/components/ui/editable-table/cells/editable-number-cell.component.ts`
  - Added `align` property to interface
  - Updated `getEffectiveFormat()` to merge alignment

- `/design-system/src/app/components/ui/editable-table/cells/editable-select-cell.component.ts`
  - Added `align` property to interface

- `/design-system/src/app/components/ui/editable-table/ds-editable-table.stories.ts`
  - Added `align: 'right'` to price columns in `MultipleActions` story
  - Updated story description to highlight alignment feature

## Usage

Simply set the `align` property in the column's `meta` configuration:

```typescript
const columns: ColumnDef<MyData>[] = [
  {
    accessorKey: 'price',
    header: 'Price',
    cell: (info) => editableNumberCell({
      row: info.row.original,
      rowIndex: info.row.index,
      value: info.getValue(),
    }),
    meta: {
      align: 'right', // 👈 This will automatically align header, cell, AND input
    } as DsEditableTableColumnMeta,
  },
];
```

## Benefits

1. **Consistency**: Header, read-only cells, and editable inputs all align consistently
2. **Developer Experience**: Single configuration point for alignment
3. **Natural API**: Follows the existing pattern of using `meta` for column-level properties
4. **No Breaking Changes**: Alignment is optional; existing code continues to work

## Example

See the `MultipleActions` story in `ds-editable-table.stories.ts` for a live example. The "Cost price" and "Sales price" columns demonstrate right alignment - click on any price cell to see the input align to the right automatically.

