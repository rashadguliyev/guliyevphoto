export type CmsField = {
  key: string;
  label: string;
  category: string;
  type: "text" | "textarea" | "image" | "url" | "email" | "checkbox" | "range";
  defaultValue: string;
};

const field = (key: string, label: string, category: string, defaultValue: string, type: CmsField['type'] = 'text'): CmsField => ({ key, label, category, defaultValue, type });

export const CMS_FIELDS: CmsField[] = [
  field('brand.logo', 'Logo', 'Brand & navigation', 'https://github.com/rashadguliyev/guliyevphoto/blob/main/logogold.png?raw=true', 'image'),
  field('nav.cta', 'Header button label', 'Brand & navigation', 'Book Session'),

  field('hero.background', 'Background image', 'Homepage — Hero', 'https://github.com/rashadguliyev/guliyevphoto/blob/cce67be5dafdf0c7307bf81458748e5a74212bff/539853-3274.jpg?raw=true', 'image'),
  field('hero.eyebrow', 'Eyebrow', 'Homepage — Hero', 'Editorial & Art Photography'),
  field('hero.location', 'Location', 'Homepage — Hero', 'Based in Dallas, TX'),
  field('hero.title.line1', 'Title line 1', 'Homepage — Hero', 'Stories Told'),
  field('hero.title.highlight', 'Highlighted word', 'Homepage — Hero', 'Light'),
  field('hero.title.line3', 'Title final line', 'Homepage — Hero', 'Shadow'),
  field('hero.subtitle', 'Description', 'Homepage — Hero', 'Cinematic, editorial photography for people and brands who want images that feel as considered as they look. Focused on the beauty of human realism.', 'textarea'),
  field('hero.portfolioButton', 'Portfolio button', 'Homepage — Hero', 'View Selected Archives'),
  field('hero.contactButton', 'Contact button', 'Homepage — Hero', 'Reserve Consultation'),
  field('hero.overlayOpacity', 'Gradient overlay opacity', 'Homepage — Hero', '50', 'range'),

  field('home.intro.eyebrow', 'Eyebrow', 'Homepage — Introduction', 'Your Story Deserves More Than a Snapshot'),
  field('home.intro.heading', 'Heading', 'Homepage — Introduction', 'Dallas Photographer for People & Brands'),
  field('home.intro.body', 'Body', 'Homepage — Introduction', 'A great photograph should do more than document how something looked. It should preserve a feeling, express a personality, or help a brand communicate what makes it different.\n\nI’m Rashad Guliyev, a Dallas-based photographer, visual storyteller, and marketing professional. I create natural, polished photography throughout Dallas-Fort Worth.\n\nWhether we are capturing an important chapter or creating imagery for your next campaign, my goal is to make the process comfortable, collaborative, and enjoyable.', 'textarea'),
  field('home.intro.button', 'Button label', 'Homepage — Introduction', 'Meet Rashad'),

  field('home.services.eyebrow', 'Eyebrow', 'Homepage — Services', 'Services Index'),
  field('home.services.heading', 'Heading', 'Homepage — Services', 'Dallas Photography Services'),
  field('home.services.intro', 'Introduction', 'Homepage — Services', 'Choose the type of session that fits your story, personality, professional goals, or business needs.', 'textarea'),
  field('home.services.1.title', 'Portrait service title', 'Homepage — Services', 'Portrait Photography'),
  field('home.services.1.copy', 'Portrait service description', 'Homepage — Services', 'Personal portraits that feel expressive, confident, and true to you.', 'textarea'),
  field('home.services.1.button', 'Portrait service button', 'Homepage — Services', 'Explore Portrait Photography'),
  field('home.services.2.title', 'Family service title', 'Homepage — Services', 'Couples & Family Photography'),
  field('home.services.2.copy', 'Family service description', 'Homepage — Services', 'Relaxed photography focused on connection, movement, and real interaction.', 'textarea'),
  field('home.services.2.button', 'Family service button', 'Homepage — Services', 'Explore Couples & Family Sessions'),
  field('home.services.3.title', 'Branding service title', 'Homepage — Services', 'Headshots & Personal Branding'),
  field('home.services.3.copy', 'Branding service description', 'Homepage — Services', 'Professional images for LinkedIn, company websites, speaking profiles, portfolios, social media, and personal brands.', 'textarea'),
  field('home.services.3.button', 'Branding service button', 'Homepage — Services', 'Explore Branding Photography'),
  field('home.services.4.title', 'Product service title', 'Homepage — Services', 'Product & Brand Photography'),
  field('home.services.4.copy', 'Product service description', 'Homepage — Services', 'Commercial imagery created with marketing in mind for websites, e-commerce, advertising, and social media.', 'textarea'),
  field('home.services.4.button', 'Product service button', 'Homepage — Services', 'Explore Commercial Photography'),
  field('home.services.5.title', 'Event service title', 'Homepage — Services', 'Event Photography'),
  field('home.services.5.copy', 'Event service description', 'Homepage — Services', 'Natural, polished coverage for celebrations, community events, brand activations, corporate gatherings, and private occasions.', 'textarea'),
  field('home.services.5.button', 'Event service button', 'Homepage — Services', 'Explore Event Photography'),

  field('home.marketing.eyebrow', 'Eyebrow', 'Homepage — Marketing', 'Photography With a Marketing Perspective'),
  field('home.marketing.heading', 'Heading', 'Homepage — Marketing', 'Beautiful Images That Also Have a Job to Do'),
  field('home.marketing.body', 'Body', 'Homepage — Marketing', 'Commercial photography is most effective when it is created for the way it will actually be used.\n\nWith a professional background in marketing, brand strategy, social media, websites, advertising, and events, I approach business photography differently.\n\nThe result is a coordinated image library that looks polished and gives your business highly versatile content.', 'textarea'),
  field('home.marketing.button', 'Button label', 'Homepage — Marketing', 'Plan a Brand Shoot'),

  field('home.process.eyebrow', 'Eyebrow', 'Homepage — Process', 'The Journey'),
  field('home.process.heading', 'Heading', 'Homepage — Process', 'What It’s Like to Work Together'),
  field('home.process.intro', 'Introduction', 'Homepage — Process', 'From the initial creative brief to the professional selection and delivery of your edited files.', 'textarea'),
  field('home.process.button', 'Button label', 'Homepage — Process', 'Start Planning Your Session'),
  field('home.process.1.title', 'Step 1 title', 'Homepage — Process', 'Tell Me What You’re Planning'),
  field('home.process.1.body', 'Step 1 text', 'Homepage — Process', 'Share the type of session, preferred date, location ideas, and how you plan to use the photographs.', 'textarea'),
  field('home.process.2.title', 'Step 2 title', 'Homepage — Process', 'We Plan the Details'),
  field('home.process.2.body', 'Step 2 text', 'Homepage — Process', 'We will discuss location, timing, wardrobe, visual references, and required images.', 'textarea'),
  field('home.process.3.title', 'Step 3 title', 'Homepage — Process', 'Enjoy the Session'),
  field('home.process.3.body', 'Step 3 text', 'Homepage — Process', 'I provide direction while leaving space for natural expressions and spontaneous moments.', 'textarea'),
  field('home.process.4.title', 'Step 4 title', 'Homepage — Process', 'Receive Your Edited Gallery'),
  field('home.process.4.body', 'Step 4 text', 'Homepage — Process', 'Your final photographs are professionally selected, color-corrected, and delivered through a private online gallery.', 'textarea'),

  field('home.portrait', 'Portrait image', 'Homepage — About preview', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600', 'image'),
  field('home.about.eyebrow', 'Eyebrow', 'Homepage — About preview', 'Meet Your Photographer'),
  field('home.about.heading', 'Heading', 'Homepage — About preview', 'Rashad Guliyev'),
  field('home.about.body', 'Body', 'Homepage — About preview', 'My interest in visual art began long before Guliyev Photo.\n\nI grew up in Baku, Azerbaijan, inspired by the paintings and sketches my grandmother left behind. Photography became my way of preserving stories.\n\nToday, I bring that artistic foundation together with years of marketing and content experience.', 'textarea'),
  field('home.about.button', 'Button label', 'Homepage — About preview', 'Read My Story'),

  field('home.location.eyebrow', 'Eyebrow', 'Homepage — Location', 'Geographic Focus'),
  field('home.location.heading', 'Heading', 'Homepage — Location', 'Photography Across Dallas-Fort Worth'),
  field('home.location.body', 'Body', 'Homepage — Location', 'Guliyev Photo is based in Dallas and available for sessions throughout the Dallas-Fort Worth area. Sessions can take place outdoors, at your home, at your business, in a rented studio, or at another carefully selected location.\n\nPopular settings include White Rock Lake, Bishop Arts, Deep Ellum, Plano, Las Colinas, and creative studios across DFW.', 'textarea'),
  field('home.location.button', 'Button label', 'Homepage — Location', 'Ask About a Location'),

  field('home.testimonials.eyebrow', 'Eyebrow', 'Homepage — Testimonials', 'Testimonials'),
  field('home.testimonials.heading', 'Heading', 'Homepage — Testimonials', 'Client Experiences'),
  field('home.faq.eyebrow', 'Eyebrow', 'Homepage — FAQ', 'Questions'),
  field('home.faq.heading', 'Heading', 'Homepage — FAQ', 'Frequently Asked Questions'),
  field('home.cta.eyebrow', 'Eyebrow', 'Homepage — Final CTA', "Let's Collaborate"),
  field('home.cta.heading', 'Heading', 'Homepage — Final CTA', 'Let’s Create Something Worth Remembering'),
  field('home.cta.body', 'Description', 'Homepage — Final CTA', 'Tell me about the person, moment, product, business, campaign, or event you would like to photograph.', 'textarea'),
  field('home.cta.primary', 'Primary button', 'Homepage — Final CTA', 'Book a Session'),
  field('home.cta.secondary', 'Secondary button', 'Homepage — Final CTA', 'Ask a Question'),

  field('about.portrait', 'Portrait image', 'About page', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600', 'image'),
  field('about.eyebrow', 'Eyebrow', 'About page', 'Behind the Lens'),
  field('about.heading', 'Heading', 'About page', 'Hi, I’m Rashad'),
  field('about.intro', 'Introduction', 'About page', 'I’m a photographer, marketer, and visual storyteller based in Dallas, Texas. Photography is a way to preserve personality, relationships, places, and moments.', 'textarea'),
  field('about.chapter1.title', 'Chapter 1 title', 'About page', 'Where My Interest in Art Began'),
  field('about.chapter1.body', 'Chapter 1 text', 'About page', 'I grew up in Baku, Azerbaijan, surrounded by the influence of art.\n\nMy grandmother was a painter. The artwork she left behind showed me how visual art can preserve part of a person.\n\nWhen I received my first serious camera, photography gave me a new language.', 'textarea'),
  field('about.chapter2.title', 'Chapter 2 title', 'About page', 'From Baku to Dallas'),
  field('about.chapter2.body', 'Chapter 2 text', 'About page', 'After living and working internationally, I moved to the United States in 2022 and made Dallas my home.\n\nDallas has given me access to an incredible mix of people, neighborhoods, businesses, cultures, landscapes, and stories.', 'textarea'),
  field('about.chapter3.title', 'Chapter 3 title', 'About page', 'Photography Meets Marketing'),
  field('about.chapter3.body', 'Chapter 3 text', 'About page', 'Alongside photography, I built a career in marketing and earned a master’s degree in marketing.\n\nThat experience shapes the way I photograph and helps me consider the audience, platform, crop, format, and purpose behind every image.', 'textarea'),
  field('about.chapter4.title', 'Chapter 4 title', 'About page', 'Creating Content That Connects'),
  field('about.chapter4.body', 'Chapter 4 text', 'About page', 'My work as a content creator has taught me how quickly an image or video must communicate.\n\nI have created social content that has reached millions of viewers and learned how visual hooks, storytelling, and authenticity make people stop.', 'textarea'),
  field('about.chapter5.title', 'Chapter 5 title', 'About page', 'The Collaborative Approach'),
  field('about.chapter5.body', 'Chapter 5 text', 'About page', 'The best photography experience is collaborative. I help plan the visual direction and guide you during the session.\n\nAt the same time, I leave space for natural movement, laughter, and interaction.', 'textarea'),
  field('about.cta.heading', 'CTA heading', 'About page', 'Let’s Work Together'),
  field('about.cta.body', 'CTA description', 'About page', 'Whether you are celebrating a person you love, building your professional image, or creating a visual identity for a business, I would be honored to help tell the story.', 'textarea'),
  field('about.cta.button', 'CTA button', 'About page', "Let's Work Together"),

  field('portfolio.eyebrow', 'Eyebrow', 'Portfolio page', 'Selected Work'),
  field('portfolio.heading', 'Heading', 'Portfolio page', 'Portfolio'),
  field('portfolio.intro', 'Introduction', 'Portfolio page', 'A curated collection of portraits, families, brands, products, and events photographed throughout Dallas-Fort Worth.', 'textarea'),

  field('blog.eyebrow', 'Eyebrow', 'Blog page', 'Resources & Insights'),
  field('blog.heading', 'Heading', 'Blog page', 'Photography Tips, Stories and Dallas Guides'),
  field('blog.intro', 'Introduction', 'Blog page', 'Explore practical advice for planning a photography session, choosing a Dallas location, and making better use of your final images.', 'textarea'),

  field('contact.eyebrow', 'Eyebrow', 'Contact page', 'Reserve Your Slot'),
  field('contact.heading', 'Heading', 'Contact page', 'Let’s Plan Your Photography'),
  field('contact.intro', 'Introduction', 'Contact page', 'Tell me what you would like to photograph, when you need it, and how the final images will be used.', 'textarea'),
  field('contact.submitButton', 'Submit button label', 'Contact page', 'Send Inquiry'),
  field('contact.consentLabel', 'Consent checkbox label', 'Contact page', 'I agree to be contacted about this inquiry.'),
  field('contact.email', 'Contact email', 'Contact page', 'rashad.inbox@gmail.com', 'email'),

  field('footer.description', 'Footer description', 'Footer & social', 'Cinematic, editorial photography for people and brands who want images that feel as considered as they look.', 'textarea'),
  field('social.instagram', 'Instagram URL', 'Footer & social', 'https://instagram.com', 'url'),
  field('social.instagram.visible', 'Show Instagram', 'Footer & social', 'true', 'checkbox'),
  field('social.facebook', 'Facebook URL', 'Footer & social', 'https://facebook.com', 'url'),
  field('social.facebook.visible', 'Show Facebook', 'Footer & social', 'true', 'checkbox'),
  field('social.tiktok', 'TikTok URL', 'Footer & social', 'https://tiktok.com', 'url'),
  field('social.tiktok.visible', 'Show TikTok', 'Footer & social', 'true', 'checkbox'),
  field('social.youtube', 'YouTube URL', 'Footer & social', 'https://youtube.com', 'url'),
  field('social.youtube.visible', 'Show YouTube', 'Footer & social', 'true', 'checkbox'),
  field('social.twitter', 'X / Twitter URL', 'Footer & social', 'https://twitter.com', 'url'),
  field('social.twitter.visible', 'Show X / Twitter', 'Footer & social', 'true', 'checkbox'),
];

export const defaultCmsValues = Object.fromEntries(CMS_FIELDS.map((item) => [item.key, item.defaultValue]));
