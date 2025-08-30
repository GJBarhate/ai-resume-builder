// Template exports
export { default as AzurillTemplate } from './AzurillTemplate';
export { default as DittoTemplate } from './DittoTemplate';
export { default as OnixTemplate } from './OnixTemplate';
export { default as PikachuTemplate } from './PikachuTemplate';
export { default as DefaultTemplate } from './DefaultTemplate';
export { default as ClassicTemplate } from './ClassicTemplate';
export { default as ModernTemplate } from './ModernTemplate';
export { default as ExecutiveTemplate } from './ExecutiveTemplate';
export { default as MinimalTemplate } from './MinimalTemplate';
export { default as CorporateTemplate } from './CorporateTemplate';
export { default as TechnicalTemplate } from './TechnicalTemplate';
export { default as EngineerTemplate } from './EngineerTemplate';

// Import all templates
import AzurillTemplate from './AzurillTemplate';
import DittoTemplate from './DittoTemplate';
import OnixTemplate from './OnixTemplate';
import PikachuTemplate from './PikachuTemplate';
import DefaultTemplate from './DefaultTemplate';
import ClassicTemplate from './ClassicTemplate';
import ModernTemplate from './ModernTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import MinimalTemplate from './MinimalTemplate';
import CorporateTemplate from './CorporateTemplate';
import TechnicalTemplate from './TechnicalTemplate';
import EngineerTemplate from './EngineerTemplate';

// Template list
export const templatesList = [
  'default',
  'onix',
  'azurill',
  'ditto', 
  'pikachu',
  'classic',
  'modern',
  'executive',
  'minimal',
  'corporate',
  'technical',
  'engineer'
];

// Template getter utility
export const getTemplate = (templateName) => {
  switch (templateName.toLowerCase()) {
    case 'azurill':
      return AzurillTemplate;
    case 'ditto':
      return DittoTemplate;
    case 'onix':
      return OnixTemplate;
    case 'pikachu':
      return PikachuTemplate;
    case 'default':
      return DefaultTemplate;
    case 'classic':
      return ClassicTemplate;
    case 'modern':
      return ModernTemplate;
    case 'executive':
      return ExecutiveTemplate;
    case 'minimal':
      return MinimalTemplate;
    case 'corporate':
      return CorporateTemplate;
    case 'technical':
      return TechnicalTemplate;
    case 'engineer':
      return EngineerTemplate;
    default:
      return DefaultTemplate; // Default fallback
  }
};

// Template info for UI selection
export const templateInfo = {
  default: {
    name: 'Default',
    description: 'Simple and classic resume layout',
    style: 'Classic', 
    layout: 'Traditional',
    preview: '/images/default-preview.png'
  },
  onix: {
    name: 'Onix',
    description: 'Clean and minimalist single-column design',
    style: 'Minimalist', 
    layout: 'Single Column',
    preview: '/images/onix-preview.png'
  },
  azurill: {
    name: 'Azurill',
    description: 'Professional sidebar layout with clean styling',
    style: 'Professional',
    layout: 'Sidebar',
    preview: '/images/azurill-preview.png'
  },
  ditto: {
    name: 'Ditto', 
    description: 'Modern card-based design with gradient header',
    style: 'Modern',
    layout: 'Grid',
    preview: '/images/ditto-preview.png'
  },
  pikachu: {
    name: 'Pikachu',
    description: 'Colorful template with skill ratings and vibrant design',
    style: 'Creative',
    layout: 'Colorful',
    preview: '/images/pikachu-preview.png'
  },
  classic: {
    name: 'Classic',
    description: 'Professional resume with clean lines and clear sections',
    style: 'Professional',
    layout: 'Traditional',
    preview: '/images/classic-preview.png'
  },
  modern: {
    name: 'Modern',
    description: 'Contemporary sidebar layout with organized sections',
    style: 'Contemporary',
    layout: 'Sidebar',
    preview: '/images/modern-preview.png'
  },
  executive: {
    name: 'Executive',
    description: 'Premium professional template for senior positions',
    style: 'Executive',
    layout: 'Premium',
    preview: '/images/executive-preview.png'
  },
  minimal: {
    name: 'Minimal',
    description: 'Ultra-clean design with maximum content density',
    style: 'Minimal',
    layout: 'Compact',
    preview: '/images/minimal-preview.png'
  },
  corporate: {
    name: 'Corporate',
    description: 'Professional corporate template with traditional sections',
    style: 'Corporate',
    layout: 'Traditional',
    preview: '/images/corporate-preview.png'
  },
  technical: {
    name: 'Technical',
    description: 'Developer-focused template with technical skill emphasis',
    style: 'Technical',
    layout: 'Developer',
    preview: '/images/technical-preview.png'
  },
  engineer: {
    name: 'Engineer',
    description: 'Engineering professional template with systematic layout',
    style: 'Engineering',
    layout: 'Systematic',
    preview: '/images/engineer-preview.png'
  }
};