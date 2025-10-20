import type { CellComponentData, IconTextCellData, BadgeCellData, DateCellData } from './cells';
import type { BadgeVariant } from '../badge/ds-badge';

/**
 * Component cell result structure
 */
export interface ComponentCell {
  component: string;
  data: CellComponentData;
}

/**
 * Helper function to create an icon + text cell
 * 
 * @example
 * ```typescript
 * {
 *   accessorKey: 'name',
 *   header: 'Name',
 *   cell: (info) => iconTextCell({
 *     row: info.row.original,
 *     value: info.getValue(),
 *     iconName: info.row.original.iconName,
 *     text: info.getValue() as string,
 *     gap: '4px'
 *   })
 * }
 * ```
 */
export function iconTextCell(data: Omit<IconTextCellData, 'value' | 'row'> & { row: any; value: any }): ComponentCell {
  return {
    component: 'icon-text',
    data: data as IconTextCellData
  };
}

/**
 * Helper function to create a badge cell
 * 
 * @example
 * ```typescript
 * {
 *   accessorKey: 'status',
 *   header: 'Status',
 *   cell: (info) => badgeCell({
 *     row: info.row.original,
 *     value: info.getValue(),
 *     content: info.getValue() as string,
 *     variant: 'success'
 *   })
 * }
 * ```
 */
export function badgeCell(data: Omit<BadgeCellData, 'value' | 'row'> & { row: any; value: any }): ComponentCell {
  return {
    component: 'badge',
    data: data as BadgeCellData
  };
}

/**
 * Helper function to create a date cell
 * 
 * @example
 * ```typescript
 * {
 *   accessorKey: 'date',
 *   header: 'Date',
 *   cell: (info) => dateCell({
 *     row: info.row.original,
 *     value: info.getValue(),
 *     date: info.getValue() as string,
 *     showIcon: true
 *   })
 * }
 * ```
 */
export function dateCell(data: Omit<DateCellData, 'value' | 'row'> & { row: any; value: any }): ComponentCell {
  return {
    component: 'date',
    data: data as DateCellData
  };
}

/**
 * Type guard to check if content is a component cell
 */
export function isComponentCell(content: any): content is ComponentCell {
  return content && typeof content === 'object' && 'component' in content && 'data' in content;
}

