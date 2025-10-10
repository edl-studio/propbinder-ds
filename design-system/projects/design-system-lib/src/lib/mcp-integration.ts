/**
 * Figma MCP Integration Utilities
 * 
 * This module provides utilities for integrating with Figma via MCP (Model Context Protocol)
 * to synchronize design tokens and component definitions between Figma and the Angular design system.
 */

export interface FigmaVariable {
  id: string;
  name: string;
  description?: string;
  resolvedType: 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR';
  valuesByMode: Record<string, any>;
  variableCollectionId: string;
  scopes: string[];
}

export interface FigmaComponent {
  id: string;
  name: string;
  description?: string;
  type: 'COMPONENT' | 'COMPONENT_SET';
  children?: FigmaNode[];
  componentPropertyDefinitions?: Record<string, ComponentProperty>;
}

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  styles?: Record<string, any>;
}

export interface ComponentProperty {
  type: 'BOOLEAN' | 'TEXT' | 'INSTANCE_SWAP' | 'VARIANT';
  defaultValue: any;
  variantOptions?: string[];
}

export interface ComponentMapping {
  figmaComponentId: string;
  angularComponentName: string;
  props: Record<string, string>;
  variants?: Record<string, string>;
}

/**
 * Process Figma variables and convert them to CSS custom properties
 */
export function processFigmaVariables(variables: FigmaVariable[]): Record<string, string> {
  const cssVariables: Record<string, string> = {};
  
  variables.forEach(variable => {
    const cssVarName = convertToCSSVariable(variable.name);
    const value = extractVariableValue(variable);
    
    if (value !== null) {
      cssVariables[cssVarName] = value;
    }
  });
  
  return cssVariables;
}

/**
 * Convert Figma variable name to CSS custom property format
 */
export function convertToCSSVariable(figmaName: string): string {
  return `--${figmaName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')}`;
}

/**
 * Extract value from Figma variable based on its type
 */
export function extractVariableValue(variable: FigmaVariable): string | null {
  const modeId = Object.keys(variable.valuesByMode)[0];
  const value = variable.valuesByMode[modeId];
  
  switch (variable.resolvedType) {
    case 'COLOR':
      return formatColorValue(value);
    case 'FLOAT':
      return `${value}px`;
    case 'STRING':
      return value;
    case 'BOOLEAN':
      return value.toString();
    default:
      return null;
  }
}

/**
 * Format color values from Figma to CSS
 */
export function formatColorValue(color: any): string {
  if (typeof color === 'string') {
    return color;
  }
  
  if (color.r !== undefined && color.g !== undefined && color.b !== undefined) {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    
    if (color.a !== undefined && color.a < 1) {
      return `rgba(${r}, ${g}, ${b}, ${color.a})`;
    }
    
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  return '#000000'; // fallback
}

/**
 * Map Figma component to Angular component structure
 */
export function mapFigmaComponentToAngular(
  figmaComponent: FigmaComponent,
  mapping: ComponentMapping
): string {
  const { angularComponentName, props, variants } = mapping;
  
  // Generate component properties based on Figma component properties
  const componentProps = generateComponentProperties(figmaComponent, props);
  const variantLogic = generateVariantLogic(figmaComponent, variants);
  
  return generateAngularComponentCode({
    name: angularComponentName,
    properties: componentProps,
    variants: variantLogic,
    figmaId: figmaComponent.id,
  });
}

/**
 * Generate Angular component properties from Figma component properties
 */
export function generateComponentProperties(
  figmaComponent: FigmaComponent,
  propMapping: Record<string, string>
): string[] {
  const properties: string[] = [];
  
  if (figmaComponent.componentPropertyDefinitions) {
    Object.entries(figmaComponent.componentPropertyDefinitions).forEach(([name, prop]) => {
      const angularPropName = propMapping[name] || name.toLowerCase();
      
      switch (prop.type) {
        case 'BOOLEAN':
          properties.push(`@Input() ${angularPropName}: boolean = ${prop.defaultValue};`);
          break;
        case 'TEXT':
          properties.push(`@Input() ${angularPropName}: string = '${prop.defaultValue}';`);
          break;
        case 'VARIANT':
          const options = prop.variantOptions?.map(opt => `'${opt}'`).join(' | ') || 'string';
          properties.push(`@Input() ${angularPropName}: ${options} = '${prop.defaultValue}';`);
          break;
      }
    });
  }
  
  return properties;
}

/**
 * Generate variant logic for Angular component
 */
export function generateVariantLogic(
  figmaComponent: FigmaComponent,
  variantMapping?: Record<string, string>
): string {
  if (!variantMapping) {
    return '';
  }
  
  const variantEntries = Object.entries(variantMapping)
    .map(([variant, classes]) => `    ${variant}: '${classes}'`)
    .join(',\n');
  
  return `
  @HostBinding('class') get classes(): string {
    const variants: Record<string, string> = {
${variantEntries}
    };
    
    return variants[this.variant] || variants.default || '';
  }`;
}

/**
 * Generate complete Angular component code
 */
export function generateAngularComponentCode(config: {
  name: string;
  properties: string[];
  variants: string;
  figmaId: string;
}): string {
  const { name, properties, variants, figmaId } = config;
  
  return `import { Component, Input, HostBinding } from '@angular/core';

/**
 * ${name} Component
 * Generated from Figma component: ${figmaId}
 */
@Component({
  selector: '${kebabCase(name)}',
  standalone: true,
  template: \`<ng-content></ng-content>\`
})
export class ${name}Component {
${properties.map(prop => `  ${prop}`).join('\n')}
${variants}
}`;
}

/**
 * Convert PascalCase to kebab-case
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Sync design tokens from Figma to the CSS theme
 */
export async function syncDesignTokensFromFigma(
  figmaVariables: FigmaVariable[]
): Promise<string> {
  const cssVariables = processFigmaVariables(figmaVariables);
  
  const themeContent = `@theme {
${Object.entries(cssVariables)
  .map(([name, value]) => `  ${name}: ${value};`)
  .join('\n')}
}`;
  
  return themeContent;
}

/**
 * Generate Storybook stories from Figma component
 */
export function generateStorybookStories(
  componentName: string,
  figmaComponent: FigmaComponent
): string {
  const stories = generateStoriesFromVariants(componentName, figmaComponent);
  
  return `import type { Meta, StoryObj } from '@storybook/angular';
import { ${componentName}Component } from './${kebabCase(componentName)}.component';

const meta: Meta<${componentName}Component> = {
  title: 'Components/${componentName}',
  component: ${componentName}Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<${componentName}Component>;

${stories}`;
}

/**
 * Generate story definitions from Figma component variants
 */
export function generateStoriesFromVariants(
  componentName: string,
  figmaComponent: FigmaComponent
): string {
  const stories: string[] = [];
  
  if (figmaComponent.componentPropertyDefinitions) {
    // Generate a default story
    stories.push(`export const Default: Story = {
  args: {},
};`);
    
    // Generate stories for each variant if they exist
    Object.entries(figmaComponent.componentPropertyDefinitions).forEach(([propName, prop]) => {
      if (prop.type === 'VARIANT' && prop.variantOptions) {
        prop.variantOptions.forEach(variant => {
          const storyName = `${propName}${variant}`;
          stories.push(`export const ${storyName}: Story = {
  args: {
    ${propName.toLowerCase()}: '${variant}',
  },
};`);
        });
      }
    });
  }
  
  return stories.join('\n\n');
}