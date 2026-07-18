"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  ArrowRight, 
  Camera, 
  Sliders, 
  Maximize2, 
  Award, 
  Clock, 
  Sparkles,
  Mail,
  User,
  CheckCircle,
  Ticket,
  Send,
  Check,
  Compass,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaXTwitter } from 'react-icons/fa6';

// Modals
import PortfolioModal from './components/PortfolioModal';
import BookingModal from './components/BookingModal';
import RightColumnPanel from './components/RightColumnPanel';

// Pages
import HomePageContent from './components/HomePageContent';
import PortfolioPage from './components/PortfolioPage';
import PortraitPage from './components/PortraitPage';
import FamilyPage from './components/FamilyPage';
import BrandingPage from './components/BrandingPage';
import ProductPage from './components/ProductPage';
import EventPage from './components/EventPage';
import PricingPage from './components/PricingPage';
import AboutPage from './components/AboutPage';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import { TermsPage, PrivacyPage } from './components/LegalPages';

import { useSiteData } from './SiteDataContext';
import { supabase } from './supabase';

export default function App() {
  const { get } = useSiteData();
  const socialLinks = [
    { key: 'facebook', label: 'Facebook', Icon: FaFacebookF },
    { key: 'instagram', label: 'Instagram', Icon: FaInstagram },
    { key: 'tiktok', label: 'TikTok', Icon: FaTiktok },
    { key: 'youtube', label: 'YouTube', Icon: FaYoutube },
    { key: 'twitter', label: 'X / Twitter', Icon: FaXTwitter },
  ].filter((social) => get(`social.${social.key}.visible`, 'true') !== 'false' && Boolean(get(`social.${social.key}`)));
  const [activeView, setActiveView] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Dynamic counter stats with mounting animation trigger
  const [activeYears, setActiveYears] = useState(0);
  const [completions, setCompletions] = useState(0);
  const [awardsCount, setAwardsCount] = useState(0);

  // State variables for newsletter signup
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    // Scroll listener for sticky header transition
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Milestones dynamic counter trigger
    const timer = setTimeout(() => {
      let yr = 0, comp = 0, aw = 0;
      const interval = setInterval(() => {
        if (yr < 8) yr++;
        if (comp < 150) comp += 5;
        if (aw < 12) aw++;
        
        setActiveYears(yr);
        setCompletions(Math.min(comp, 150));
        setAwardsCount(aw);

        if (yr === 8 && comp >= 150 && aw === 12) {
          clearInterval(interval);
        }
      }, 35);
      return () => clearInterval(interval);
    }, 400);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    const { error } = await supabase.from('newsletter_subscribers').insert({
      email: newsletterEmail.trim().toLowerCase(),
    });
    if (error && error.code !== '23505') {
      alert('Unable to subscribe right now. Please try again.');
      return;
    }
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  const handleNavigate = (view: string) => {
    setActiveView(view);
    setServicesMenuOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const serviceSublinks = [
    { label: 'Portrait Photography', view: 'portrait' },
    { label: 'Family & Couples', view: 'family' },
    { label: 'Headshots & Personal Branding', view: 'branding' },
    { label: 'Product & Brand', view: 'product' },
    { label: 'Event Photography', view: 'event' }
  ];

  return (
    <div className="relative min-h-screen bg-[#090B0B] text-[#F8F4F2] font-body selection:bg-[#A27B5D] selection:text-[#090B0B]">
      
      {/* Background Subtle Ambiance Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#2C3638]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#A27B5D]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <header className="hero relative z-40">
        
        {/* Top-to-bottom background image with bottom faded in ovalish shape */}
        {activeView === 'home' && (
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
            <img 
              src={get('hero.background')}
              alt="Atmospheric photography background"
              className="w-full h-full object-cover filter grayscale brightness-[65%] contrast-[110%]"
              referrerPolicy="no-referrer"
            />
            {/* Adjustable dark gradient. At 0% the photograph is fully visible;
                at 100% the hero is fully dark. */}
            <div 
              className="absolute inset-0" 
              style={{
                background: `linear-gradient(to bottom, rgba(9,11,11,${Math.max(0, Math.min(100, Number(get('hero.overlayOpacity', '50')) || 0)) / 100}) 0%, rgba(9,11,11,${Math.max(0, Math.min(100, Number(get('hero.overlayOpacity', '50')) || 0)) / 100}) 62%, #090B0B 100%)`,
              }}
            />
          </div>
        )}
        
        {/* ================= HEADER / NAV ================= */}
        <nav 
          className={`nav flex items-center justify-between max-w-[1400px] mx-auto py-5 px-5 transition-all duration-300 z-40 ${
            isScrolled 
              ? 'fixed top-0 left-0 right-0 bg-[#2C3638]/95 backdrop-blur border-b border-[#F8F4F2]/5 px-12 py-3.5 max-w-none shadow-xl' 
              : 'relative'
          }`}
          id="siteNav"
        >
          {/* Logo Brand Frame */}
          <div className="logo flex items-center cursor-pointer" onClick={() => handleNavigate('home')}>
            <img 
              src={get('brand.logo')} 
              alt="Guliyev Photo" 
              className="h-10 md:h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="nav-links flex items-center gap-6 hidden md:flex">
            <button
              onClick={() => handleNavigate('home')}
              className={`text-xs uppercase font-semibold tracking-wider relative pb-1 cursor-pointer transition-colors ${
                activeView === 'home' ? 'text-[#A27B5D]' : 'text-[#F8F4F2] hover:text-[#A27B5D]'
              }`}
            >
              Home
            </button>

            {/* Services Dropdown Trigger */}
            <div className="relative">
              <button
                onMouseEnter={() => setServicesMenuOpen(true)}
                onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                className={`text-xs uppercase font-semibold tracking-wider relative pb-1 flex items-center gap-1 cursor-pointer transition-colors ${
                  ['portrait', 'family', 'branding', 'product', 'event'].includes(activeView)
                    ? 'text-[#A27B5D]'
                    : 'text-[#F8F4F2] hover:text-[#A27B5D]'
                }`}
              >
                <span>Services</span>
                <ChevronDown size={11} />
              </button>
              
              <AnimatePresence>
                {servicesMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    onMouseLeave={() => setServicesMenuOpen(false)}
                    className="absolute left-0 mt-2 w-56 bg-[#283133] border border-[#F8F4F2]/10 rounded shadow-xl py-2 z-50 font-body text-xs"
                  >
                    {serviceSublinks.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavigate(sub.view)}
                        className="w-full text-left px-4 py-2.5 hover:bg-[#A27B5D]/10 hover:text-[#A27B5D] text-[#F8F4F2]/80 transition-colors cursor-pointer"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => handleNavigate('portfolio')}
              className={`text-xs uppercase font-semibold tracking-wider relative pb-1 cursor-pointer transition-colors ${
                activeView === 'portfolio' ? 'text-[#A27B5D]' : 'text-[#F8F4F2] hover:text-[#A27B5D]'
              }`}
            >
              Portfolio
            </button>

            <button
              onClick={() => handleNavigate('pricing')}
              className={`text-xs uppercase font-semibold tracking-wider relative pb-1 cursor-pointer transition-colors ${
                activeView === 'pricing' ? 'text-[#A27B5D]' : 'text-[#F8F4F2] hover:text-[#A27B5D]'
              }`}
            >
              Pricing
            </button>

            <button
              onClick={() => handleNavigate('about')}
              className={`text-xs uppercase font-semibold tracking-wider relative pb-1 cursor-pointer transition-colors ${
                activeView === 'about' ? 'text-[#A27B5D]' : 'text-[#F8F4F2] hover:text-[#A27B5D]'
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleNavigate('blog')}
              className={`text-xs uppercase font-semibold tracking-wider relative pb-1 cursor-pointer transition-colors ${
                activeView === 'blog' ? 'text-[#A27B5D]' : 'text-[#F8F4F2] hover:text-[#A27B5D]'
              }`}
            >
              Blog
            </button>

            <button
              onClick={() => handleNavigate('contact')}
              className={`text-xs uppercase font-semibold tracking-wider relative pb-1 cursor-pointer transition-colors ${
                activeView === 'contact' ? 'text-[#A27B5D]' : 'text-[#F8F4F2] hover:text-[#A27B5D]'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Nav Call To Action & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavigate('contact')}
              className="nav-cta inline-flex items-center gap-2 bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] border border-[#A27B5D] hover:border-[#AA876C] px-5 py-2 rounded text-xs font-semibold tracking-wider cursor-pointer transition-all duration-200 shadow-md"
              id="nav-cta-btn"
            >
              {get('nav.cta', 'Book Session')}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#F8F4F2] hover:text-[#A27B5D] cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#283133] border-b border-[#F8F4F2]/10 py-4 px-5 space-y-3 flex flex-col font-body text-sm"
            >
              <button onClick={() => handleNavigate('home')} className="text-left py-1 text-[#F8F4F2]/80 hover:text-[#A27B5D]">Home</button>
              
              {/* Mobile Services list */}
              <div className="pl-3 py-1 space-y-2 border-l border-[#A27B5D]/30">
                <span className="text-[10px] uppercase tracking-wider text-[#A27B5D] font-bold block">Services</span>
                {serviceSublinks.map((sub, idx) => (
                  <button key={idx} onClick={() => handleNavigate(sub.view)} className="block text-left text-xs text-[#F8F4F2]/75 hover:text-[#A27B5D]">{sub.label}</button>
                ))}
              </div>

              <button onClick={() => handleNavigate('portfolio')} className="text-left py-1 text-[#F8F4F2]/80 hover:text-[#A27B5D]">Portfolio</button>
              <button onClick={() => handleNavigate('pricing')} className="text-left py-1 text-[#F8F4F2]/80 hover:text-[#A27B5D]">Pricing</button>
              <button onClick={() => handleNavigate('about')} className="text-left py-1 text-[#F8F4F2]/80 hover:text-[#A27B5D]">About</button>
              <button onClick={() => handleNavigate('blog')} className="text-left py-1 text-[#F8F4F2]/80 hover:text-[#A27B5D]">Blog</button>
              <button onClick={() => handleNavigate('contact')} className="text-left py-1 text-[#F8F4F2]/80 hover:text-[#A27B5D]">Contact</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= MAIN HERO GRID (Only Visible on Home Page) ================= */}
        {activeView === 'home' && (
          <main className="hero-main max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-8 items-start relative px-5 mt-4 md:mt-8 pb-[100px]">
            
            {/* ---- LEFT COLUMN: Typography & Milestones ---- */}
            <div className="hero-left flex flex-col pt-2.5">

              <div className="flex flex-col gap-1 mb-6">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="eyebrow inline-flex items-center gap-2.5 text-xs tracking-[0.12em] uppercase text-[#A27B5D] font-semibold"
                >
                  <span className="line w-[28px] h-[1px] bg-[#A27B5D] inline-block" />
                  {get('hero.eyebrow')}
                </motion.div>
                <div className="text-[10px] text-[#F8F4F2]/50 tracking-[0.15em] uppercase font-mono mt-1.5 ml-[38px]">
                  {get('hero.location')}
                </div>
              </div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="headline font-display font-semibold text-[40px] md:text-[56px] lg:text-[62px] leading-[1.08] tracking-tight text-[#F8F4F2]"
              >
                {get('hero.title.line1')}<br />
                In <span className="highlight text-[#A27B5D] italic">{get('hero.title.highlight')}</span> And<br />
                {get('hero.title.line3')}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="sub-copy mt-5.5 text-sm md:text-base leading-relaxed text-[#F8F4F2]/70 max-w-[380px]"
              >
                {get('hero.subtitle')}
              </motion.p>

              {/* Call To Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="cta-row flex flex-wrap gap-3.5 mt-8"
              >
                <button 
                  onClick={() => handleNavigate('portfolio')}
                  className="btn btn-outline border border-[#F8F4F2] hover:bg-[#F8F4F2] hover:text-[#2C3638] text-[#F8F4F2] py-3 px-6 rounded text-xs tracking-wider font-semibold cursor-pointer transition-all duration-200"
                  id="view-portfolio-btn"
                >
                  {get('hero.portfolioButton', 'View Selected Archives')}
                </button>
                
                <button 
                  onClick={() => handleNavigate('contact')}
                  className="btn btn-filled bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] border border-[#A27B5D] hover:border-[#AA876C] py-3 px-6 rounded text-xs tracking-wider font-semibold cursor-pointer transition-all duration-200 shadow-lg"
                  id="book-session-btn"
                >
                  {get('hero.contactButton', 'Reserve Consultation')}
                </button>
              </motion.div>
            </div>

            {/* ---- RIGHT COLUMN: Intentionally left empty to reveal background image ---- */}
            <div className="hidden lg:block h-10" />

            {/* Vertical Social Rail, positioned on right of photograph in desktop */}
            <div className="social-rail absolute right-5 top-[180px] flex-col items-center gap-3.5 z-20 hidden lg:flex">
              {socialLinks.map(({ key, label, Icon }) => <a key={key} href={get(`social.${key}`)} target="_blank" rel="noreferrer" aria-label={label} className="w-8.5 h-8.5 rounded-full border border-[#F8F4F2]/14 bg-[#090B0B]/55 flex items-center justify-center text-xs text-[#F8F4F2] hover:text-[#A27B5D] hover:border-[#A27B5D]/40 transition-all backdrop-blur-[4px]"><Icon size={13} /></a>)}
            </div>

          </main>
        )}
      </header>

      {/* ================= CONDITIONAL MAIN VIEW RENDERING ================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
        >
          {activeView === 'home' && (
            <HomePageContent 
              setActiveView={handleNavigate} 
              onBookSession={() => handleNavigate('contact')} 
            />
          )}

          {activeView === 'portfolio' && (
            <PortfolioPage 
              onBookSession={() => handleNavigate('contact')} 
            />
          )}

          {activeView === 'portrait' && (
            <PortraitPage 
              onBookSession={() => handleNavigate('contact')} 
            />
          )}

          {activeView === 'family' && (
            <FamilyPage 
              onBookSession={() => handleNavigate('contact')} 
            />
          )}

          {activeView === 'branding' && (
            <BrandingPage 
              onBookSession={() => handleNavigate('contact')} 
            />
          )}

          {activeView === 'product' && (
            <ProductPage 
              onBookSession={() => handleNavigate('contact')} 
            />
          )}

          {activeView === 'event' && (
            <EventPage 
              onBookSession={() => handleNavigate('contact')} 
            />
          )}

          {activeView === 'pricing' && (
            <PricingPage 
              onBookSession={() => handleNavigate('contact')} 
              setActiveView={handleNavigate}
            />
          )}

          {activeView === 'about' && (
            <AboutPage 
              onBookSession={() => handleNavigate('contact')} 
            />
          )}

          {activeView === 'blog' && (
            <BlogPage 
              onBookSession={() => handleNavigate('contact')} 
            />
          )}

          {activeView === 'contact' && (
            <ContactPage />
          )}

          {activeView === 'terms' && (
            <TermsPage />
          )}

          {activeView === 'privacy' && (
            <PrivacyPage />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ================= SUBSTANTIAL & BEAUTIFUL FOOTER (090B0B Background) ================= */}
      <footer className="bg-[#090B0B] text-[#F8F4F2] pt-20 pb-12 px-5 md:px-12 border-t border-[#F8F4F2]/10 relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="logo flex items-center cursor-pointer" onClick={() => handleNavigate('home')}>
              <img 
                src={get('brand.logo')} 
                alt="Guliyev Photo" 
                className="h-10 md:h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="font-body text-xs text-[#F8F4F2]/65 leading-relaxed max-w-[320px]">
              {get('footer.description')}
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ key, label, Icon }) => <a key={key} href={get(`social.${key}`)} target="_blank" rel="noreferrer" aria-label={label} className="w-8 h-8 rounded-full bg-[#283133] hover:bg-[#A27B5D] hover:text-[#090B0B] flex items-center justify-center text-xs text-[#F8F4F2]/80 transition-all"><Icon size={13} /></a>)}
            </div>
          </div>

          {/* Column 2: Index Map Navigation Links */}
          <div className="lg:col-span-2.5 flex flex-col gap-4">
            <h4 className="font-display text-sm uppercase tracking-widest text-[#A27B5D] font-bold">
              Navigation Map
            </h4>
            <div className="flex flex-col gap-2.5 font-body text-xs text-[#F8F4F2]/65">
              <button onClick={() => handleNavigate('home')} className="text-left hover:text-[#A27B5D] transition-colors cursor-pointer">Home Studio</button>
              <button onClick={() => handleNavigate('about')} className="text-left hover:text-[#A27B5D] transition-colors cursor-pointer">Narrative Brief</button>
              <button onClick={() => handleNavigate('portfolio')} className="text-left hover:text-[#A27B5D] transition-colors cursor-pointer">Selected Plates</button>
              <button onClick={() => handleNavigate('pricing')} className="text-left hover:text-[#A27B5D] transition-colors cursor-pointer">Session Registry</button>
              <button onClick={() => handleNavigate('contact')} className="text-left hover:text-[#A27B5D] transition-colors cursor-pointer">Contact Desk</button>
            </div>
          </div>

          {/* Column 3: Dallas Contact Details */}
          <div className="lg:col-span-2.5 flex flex-col gap-4">
            <h4 className="font-display text-sm uppercase tracking-widest text-[#A27B5D] font-bold">
              Dallas Studio
            </h4>
            <div className="flex flex-col gap-2.5 font-body text-xs text-[#F8F4F2]/65">
              <p>Dallas-Fort Worth Area</p>
              <p>Texas, United States</p>
              <p>{get('contact.email')}</p>
              <p className="mt-1 font-semibold text-[#A27B5D]">By Appointment Only</p>
            </div>
          </div>

          {/* Column 4: Newsletter Signups */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-display text-sm uppercase tracking-widest text-[#A27B5D] font-bold">
              The Press Dispatch
            </h4>
            <p className="font-body text-xs text-[#F8F4F2]/65 leading-relaxed">
              Register to receive priority booking notifications and selected analog essays.
            </p>
            
            {!newsletterSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-1.5 mt-1">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Inscribe email..."
                  className="bg-[#283133] border border-[#F8F4F2]/10 rounded px-3 py-2 text-xs text-[#F8F4F2] placeholder-[#F8F4F2]/30 focus:outline-none focus:border-[#A27B5D] flex-1"
                />
                <button
                  type="submit"
                  className="px-3 bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] font-bold rounded text-xs transition-colors flex items-center justify-center cursor-pointer"
                  title="Subscribe"
                >
                  <Check size={14} />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-[#A27B5D] font-semibold bg-[#A27B5D]/5 border border-[#A27B5D]/20 py-2.5 px-3 rounded flex items-center gap-1.5 mt-1"
              >
                <CheckCircle size={13} />
                <span>Subscription Confirmed</span>
              </motion.div>
            )}
          </div>

        </div>

        {/* Global Bottom Credit Label */}
        <div className="max-w-[1400px] mx-auto border-t border-[#F8F4F2]/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#F8F4F2]/35 uppercase tracking-widest font-mono gap-4">
          <div>
            © {new Date().getFullYear()} GULIYEV PHOTO • ALL RIGHTS RESERVED
          </div>
          <div className="flex gap-4">
            <button onClick={() => handleNavigate('privacy')} className="hover:text-[#A27B5D] transition-colors cursor-pointer">Privacy Protocol</button>
            <span>•</span>
            <button onClick={() => handleNavigate('terms')} className="hover:text-[#A27B5D] transition-colors cursor-pointer">Bespoke Terms</button>
          </div>
        </div>
      </footer>

      {/* ================= MODALS & OVERLAYS ================= */}
      
      {/* Interactive Selected Archives Grid Lightbox */}
      <PortfolioModal 
        isOpen={isPortfolioOpen} 
        onClose={() => setIsPortfolioOpen(false)} 
      />

      {/* Interactive Reservation Brief Desk */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />

    </div>
  );
}
