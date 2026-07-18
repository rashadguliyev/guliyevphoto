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

export type PricingPackage = {
  id: string;
  name: string;
  price: string;
  currency: string;
  description: string;
  features: string[];
  badge: string;
  buttonLabel: string;
  highlighted: boolean;
  visible: boolean;
};

export type PricingFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type PricingContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  packages: PricingPackage[];
  commercial: {
    visible: boolean;
    eyebrow: string;
    heading: string;
    body: string;
    secondaryBody: string;
    buttonLabel: string;
    factorsHeading: string;
    factors: string[];
  };
  faq: {
    visible: boolean;
    heading: string;
    items: PricingFaqItem[];
  };
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

export const defaultPricingContent: PricingContent = {
  eyebrow: 'Photography Rates & Packages',
  heading: 'Photography Packages and Pricing',
  intro: 'Every session begins with the same goal: creating photographs that feel worth keeping and sharing. The packages below are designed for personal portrait, couple, and family sessions. Business, product, branding, team, event, and commercial photography are quoted separately based on project requirements.',
  packages: [
    {
      id: 'pricing-mini',
      name: 'Mini Portrait Session',
      price: '$200',
      currency: 'USD',
      description: 'A focused session for updated portraits, a short milestone, a dating profile, graduation photos, or a small number of polished images.',
      features: ['30-minute photography session', 'One location in Dallas-Fort Worth', '20 professionally edited images', 'Private online gallery', 'High-resolution digital downloads', 'Personal printing rights'],
      badge: '',
      buttonLabel: 'Book the Mini',
      highlighted: false,
      visible: true,
    },
    {
      id: 'pricing-signature',
      name: 'Signature Session',
      price: '$350',
      currency: 'USD',
      description: 'A versatile session with enough time for variety, movement, natural moments, and a fuller collection of images.',
      features: ['One-hour photography session', 'One location in Dallas-Fort Worth', 'Up to two outfits when time permits', '35 professionally edited images', 'Private online gallery', 'High-resolution digital downloads', 'Personal printing rights'],
      badge: 'Most Popular',
      buttonLabel: 'Book the Signature',
      highlighted: true,
      visible: true,
    },
    {
      id: 'pricing-storytelling',
      name: 'Storytelling Session',
      price: '$650',
      currency: 'USD',
      description: 'An extended session for clients who want multiple settings, greater creative variety, or a complete visual story.',
      features: ['Two-hour photography session', 'Up to two nearby locations', 'Multiple outfits when time permits', '50 professionally edited images', 'Private online gallery', 'High-resolution digital downloads', 'Personal printing rights', 'Photo album (subject to specifications)'],
      badge: '',
      buttonLabel: 'Book the Storytelling',
      highlighted: false,
      visible: true,
    },
  ],
  commercial: {
    visible: true,
    eyebrow: 'Business & Corporate Shoots',
    heading: 'Business and Commercial Photography',
    body: 'Headshots, team photography, personal branding, product photography, business imagery, hospitality photography, events, and marketing campaigns require a customized estimate.',
    secondaryBody: 'Commercial projects involve custom agreements tailored to your industry standards, content deliverables, and specific marketing applications.',
    buttonLabel: 'Request a Custom Quote',
    factorsHeading: 'Pricing Variables Include:',
    factors: ['Planning and creative development support', 'Number of products, setups, or employees', 'Session duration (half-day or full-day bookings)', 'Locations, studio hire, or equipment rentals', 'Assistants, prop styling, or lighting setups required', 'Editing, advanced skin-retouching, or background removals', 'Specific delivery turnaround schedules', 'Image usage licensing (web, print, paid media, duration)', 'Approved travel beyond the standard DFW area'],
  },
  faq: {
    visible: true,
    heading: 'Pricing FAQ',
    items: [
      { id: 'pricing-faq-1', question: 'Is a deposit required?', answer: 'A non-refundable retainer is required to reserve a date. The remaining balance is due according to the schedule in the photography agreement.' },
      { id: 'pricing-faq-2', question: 'Are unedited photographs included?', answer: 'No. The final gallery includes photographs selected and professionally edited by the photographer. RAW or unedited files are not normally delivered.' },
      { id: 'pricing-faq-3', question: 'Can I purchase additional images?', answer: 'If additional image purchasing is offered for the selected package, the available options and cost will be explained before booking.' },
      { id: 'pricing-faq-4', question: 'Are travel fees included?', answer: 'Sessions within the standard Dallas service area may not require additional travel charges. Projects outside the area may include mileage, transportation, lodging, parking, or other approved expenses.' },
      { id: 'pricing-faq-5', question: 'How quickly are photos delivered?', answer: 'Most standard portrait galleries are delivered within approximately two weeks. Larger commercial or event projects may require a different delivery timeline.' },
      { id: 'pricing-faq-6', question: 'Can I use portrait photos for my business?', answer: 'Personal sessions include personal usage. Business marketing, advertising, product promotion, and other commercial applications may require a commercial agreement or license.' },
    ],
  },
};

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
