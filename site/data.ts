/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioItem } from './types';

const heroPortrait = '/images/editorial_hero_portrait_1783962954208.jpg';
const fashionBw = '/images/editorial_fashion_bw_1783963001498.jpg';
const goldenHour = '/images/editorial_golden_hour_1783963014460.jpg';

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Sunlit Portrait Study',
    category: 'portraits',
    imageUrl: heroPortrait,
    gear: 'Sony A7R V',
    location: 'White Rock Lake, Dallas',
    settings: {
      lens: 'FE 85mm f/1.4 GM',
      aperture: 'f/1.8',
      shutter: '1/800s',
      iso: '100',
    },
  },
  {
    id: 'p2',
    title: 'Minimalist Business Portrait',
    category: 'branding',
    imageUrl: fashionBw,
    gear: 'Leica M11',
    location: 'Bishop Arts District, Dallas',
    settings: {
      lens: 'Summilux 50mm f/1.4',
      aperture: 'f/2.0',
      shutter: '1/1000s',
      iso: '64',
    },
  },
  {
    id: 'p3',
    title: 'Lakefront Connection',
    category: 'family',
    imageUrl: goldenHour,
    gear: 'Hasselblad H6D-100c',
    location: 'Lake Highlands, Dallas',
    settings: {
      lens: 'HC 80mm f/2.8',
      aperture: 'f/2.8',
      shutter: '1/250s',
      iso: '100',
    },
  },
  {
    id: 'p4',
    title: 'Urban Silhouette',
    category: 'portraits',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    gear: 'Leica SL3',
    location: 'Deep Ellum, Dallas',
    settings: {
      lens: 'Summicron 35mm f/2.0',
      aperture: 'f/2.0',
      shutter: '1/500s',
      iso: '200',
    },
  },
  {
    id: 'p5',
    title: 'Warm Sunset Embrace',
    category: 'family',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    gear: 'Sony A7R V',
    location: 'White Rock Lake, Dallas',
    settings: {
      lens: 'FE 50mm f/1.2 GM',
      aperture: 'f/1.2',
      shutter: '1/400s',
      iso: '100',
    },
  },
  {
    id: 'p6',
    title: 'Executive Leadership Profile',
    category: 'branding',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    gear: 'Phase One XF IQ4',
    location: 'Downtown Dallas',
    settings: {
      lens: 'Schneider Kreuznach 80mm LS',
      aperture: 'f/5.6',
      shutter: '1/125s',
      iso: '50',
    },
  },
  {
    id: 'p7',
    title: 'Creative Studio Portrait',
    category: 'portraits',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    gear: 'Sony A7R V',
    location: 'Plano, Texas',
    settings: {
      lens: 'FE 85mm f/1.4 GM',
      aperture: 'f/1.4',
      shutter: '1/160s',
      iso: '200',
    },
  },
  {
    id: 'p8',
    title: 'Artisanal Product Story',
    category: 'product',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    gear: 'Sony A7R V',
    location: 'Addison, Texas',
    settings: {
      lens: 'FE 90mm f/2.8 Macro G',
      aperture: 'f/8.0',
      shutter: '1/200s',
      iso: '100',
    },
  },
  {
    id: 'p9',
    title: 'Modern Coffee Brand Story',
    category: 'product',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    gear: 'Hasselblad X2D 100C',
    location: 'Las Colinas, Irving',
    settings: {
      lens: 'XCD 55mm f/2.5',
      aperture: 'f/4.0',
      shutter: '1/180s',
      iso: '64',
    },
  },
  {
    id: 'p10',
    title: 'Brand Activation Launch',
    category: 'event',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
    gear: 'Sony A9 III',
    location: 'Downtown Dallas',
    settings: {
      lens: 'FE 24-70mm f/2.8 GM II',
      aperture: 'f/2.8',
      shutter: '1/250s',
      iso: '1600',
    },
  },
  {
    id: 'p11',
    title: 'Corporate Conference Panel',
    category: 'event',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
    gear: 'Sony A9 III',
    location: 'Richardson, Texas',
    settings: {
      lens: 'FE 70-200mm f/2.8 GM OSS II',
      aperture: 'f/2.8',
      shutter: '1/320s',
      iso: '2000',
    },
  },
  {
    id: 'p12',
    title: 'Graduation Milestone Study',
    category: 'portraits',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800',
    gear: 'Sony A7R V',
    location: 'Plano, Texas',
    settings: {
      lens: 'FE 135mm f/1.8 GM',
      aperture: 'f/1.8',
      shutter: '1/1200s',
      iso: '100',
    },
  }
];

export const pressMentions = [
  { company: 'Dallas Voyager', year: '2025' },
  { company: 'DFW Creative Digest', year: '2024' },
  { company: 'Modern Marketing Quarterly', year: '2025' },
  { company: 'Baku Arts Review', year: '2023' },
];
