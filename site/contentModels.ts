import { blogArticles, type BlogArticle } from './blogData';

export type Testimonial = {
  id: string;
  name: string;
  type: string;
  text: string;
  imageUrl?: string;
};

export type FaqItem = { id: string; question: string; answer: string };

export type ContactField = {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea';
  required: boolean;
  visible: boolean;
  options?: string[];
};

export const defaultTestimonials: Testimonial[] = [
  { id: 't1', name: 'Sarah M.', type: 'Portrait Session', text: 'Rashad made me feel incredibly comfortable from the start. He has a great eye for light and gave just the right amount of direction. The photos are more beautiful and natural than I could have imagined!' },
  { id: 't2', name: 'David L.', type: 'Personal Branding', text: 'As an entrepreneur, I needed images that feel credible yet accessible. Rashad understood my goals immediately and planned the shot list perfectly.' },
  { id: 't3', name: 'The G. Family', type: 'Family Session', text: 'Rashad was amazing with our kids and captured the most beautiful, candid family moments at White Rock Lake.' },
];

export const defaultFaqs: FaqItem[] = [
  { id: 'f1', question: 'What types of photography do you offer?', answer: 'I photograph individuals, couples, families, professionals, products, businesses, hospitality environments, and select events.' },
  { id: 'f2', question: 'Where do sessions take place?', answer: 'Sessions can take place outdoors, at your home, at your business, in a rented studio, or at another agreed location in Dallas-Fort Worth.' },
  { id: 'f3', question: 'What if I am uncomfortable in front of the camera?', answer: 'That is completely normal. I will guide you through positioning, movement, and expressions throughout the session.' },
  { id: 'f4', question: 'When will I receive my photos?', answer: 'Most portrait galleries are delivered within approximately two weeks. Commercial and event timelines are confirmed before booking.' },
  { id: 'f5', question: 'Do you travel?', answer: 'Yes. Travel may be available for projects outside Dallas-Fort Worth. Related expenses will be discussed before booking.' },
];

export const defaultContactFields: ContactField[] = [
  { key: 'name', label: 'Full Name', placeholder: 'e.g. Eleanor Vance', type: 'text', required: true, visible: true },
  { key: 'email', label: 'Email Address', placeholder: 'eleanor@example.com', type: 'email', required: true, visible: true },
  { key: 'phone', label: 'Phone Number', placeholder: '+1 (214) 000-0000', type: 'tel', required: false, visible: true },
  { key: 'company', label: 'Company or Brand', placeholder: 'e.g. Dallas Creative Co.', type: 'text', required: false, visible: true },
  { key: 'sessionType', label: 'Type of Photography', placeholder: '', type: 'select', required: true, visible: true, options: ['Portrait', 'Couples', 'Family', 'Graduation', 'Headshot', 'Personal branding', 'Product photography', 'Business or brand photography', 'Hospitality photography', 'Event photography', 'Social media content', 'Other'] },
  { key: 'preferredDate', label: 'Preferred Date', placeholder: '', type: 'date', required: true, visible: true },
  { key: 'altDate', label: 'Alternate Date', placeholder: '', type: 'date', required: false, visible: true },
  { key: 'location', label: 'Desired Location / Neighborhood', placeholder: 'e.g. White Rock Lake, Plano, etc.', type: 'text', required: false, visible: true },
  { key: 'count', label: 'Number of People / Products', placeholder: 'e.g. 5 team members / 10 products', type: 'text', required: false, visible: true },
  { key: 'budget', label: 'Estimated Budget', placeholder: '', type: 'select', required: false, visible: true, options: ['Under $300', '$300 - $600', '$600 - $1,200', '$1,200+'] },
  { key: 'intendedUse', label: 'Intended Use of Photographs', placeholder: 'Website, LinkedIn, Instagram, e-commerce, etc.', type: 'text', required: false, visible: true },
  { key: 'heardAbout', label: 'How Did You Hear About Us?', placeholder: 'Google, Instagram, referral, etc.', type: 'text', required: false, visible: true },
  { key: 'details', label: 'Project Details', placeholder: 'Tell me about your project, goals, style, and anything else I should know.', type: 'textarea', required: false, visible: true },
];

export const defaultBlogArticles: BlogArticle[] = blogArticles;

export function parseJsonSetting<T>(value: string | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}
