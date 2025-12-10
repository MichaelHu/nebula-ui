import React from 'react';

export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface NavItem {
  id: string;
  label: string;
  category: 'getting-started' | 'components' | 'feedback';
}

export interface ComponentDoc {
  id: string;
  title: string;
  description: string;
  usage: string;
  api: {
    prop: string;
    type: string;
    default: string;
    description: string;
  }[];
}