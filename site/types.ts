/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PortfolioCategory = 'all' | 'portraits' | 'family' | 'branding' | 'product' | 'event';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  imageUrl: string;
  description?: string;
  gear: string;
  location: string;
  settings: {
    lens: string;
    aperture: string;
    shutter: string;
    iso: string;
    film?: string;
  };
}

export interface BookingForm {
  name: string;
  email: string;
  phone: string;
  sessionType: string;
  preferredDate: string;
  notes: string;
}

