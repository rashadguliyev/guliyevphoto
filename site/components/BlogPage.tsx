/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { BlogArticle } from '../blogData';
import { useSiteData } from '../SiteDataContext';
import { defaultBlogArticles, parseJsonSetting } from '../contentModels';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Compass, 
  ArrowRight, 
  Sparkles, 
  SlidersHorizontal 
} from 'lucide-react';

interface BlogPageProps {
  onBookSession: () => void;
}

export default function BlogPage({ onBookSession }: BlogPageProps) {
  const { get } = useSiteData();
  const articles = parseJsonSetting<BlogArticle[]>(get('blog.articles'), defaultBlogArticles);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(articles.map((article) => article.category)))];

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(art => art.category === selectedCategory);

  const activeArticle = articles.find(art => art.id === selectedArticleId);

  // Scroll to top of article detail view when selected
  const handleSelectArticle = (id: number) => {
    setSelectedArticleId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#090B0B] text-[#F8F4F2] pt-12 pb-24 font-body">
      
      <AnimatePresence mode="wait">
        {!selectedArticleId ? (
          /* ================= BLOG LANDING ================= */
          <motion.div
            key="blog-landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <section className="relative py-20 px-5 md:px-12 text-center max-w-4xl mx-auto border-b border-[#F8F4F2]/10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A27B5D] font-bold block mb-4">
                {get('blog.eyebrow')}
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-[#F8F4F2] mb-6">
                {get('blog.heading')}
              </h1>
              <p className="text-sm md:text-base text-[#F8F4F2]/75 leading-relaxed max-w-2xl mx-auto">
                {get('blog.intro')}
              </p>
            </section>

            {/* Categories Navigation Bar */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-12 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F8F4F2]/5">
              <div className="flex items-center gap-2 text-xs text-[#F8F4F2]/50 uppercase tracking-widest font-mono">
                <SlidersHorizontal size={12} className="text-[#A27B5D]" />
                <span>Filter Index:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded text-xs tracking-wider transition-all cursor-pointer font-body ${
                      selectedCategory === cat
                        ? 'bg-[#A27B5D] text-[#090B0B] font-semibold'
                        : 'bg-[#283133]/60 text-[#F8F4F2]/70 hover:bg-[#283133]/80 hover:text-[#F8F4F2]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* Articles Grid */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-12 py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((art) => (
                  <article
                    key={art.id}
                    className="group flex flex-col justify-between bg-[#283133]/10 border border-[#F8F4F2]/8 hover:border-[#A27B5D]/40 rounded overflow-hidden transition-all duration-300"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="aspect-[16/10] bg-[#090B0B] overflow-hidden relative">
                        <img 
                          src={art.imageUrl} 
                          alt={art.title} 
                          className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-3 left-3 bg-[#090B0B]/85 text-[9px] uppercase tracking-wider text-[#A27B5D] font-mono px-2 py-0.5 rounded border border-[#A27B5D]/20">
                          {art.category}
                        </span>
                      </div>

                      {/* Content Block */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-4 text-[9px] text-[#F8F4F2]/40 font-mono uppercase">
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {art.readTime}
                          </span>
                        </div>
                        <h3 className="font-display text-xl md:text-2xl font-semibold text-[#F8F4F2] group-hover:text-[#A27B5D] transition-colors leading-snug">
                          {art.title}
                        </h3>
                        <p className="text-xs text-[#F8F4F2]/60 leading-relaxed font-body line-clamp-3">
                          {art.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 mt-auto">
                      <button
                        onClick={() => handleSelectArticle(art.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A27B5D] group-hover:text-[#AA876C] transition-colors cursor-pointer"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </article>
                ))}
              </div>
            </section>
          </motion.div>
        ) : (
          /* ================= ARTICLE READ VIEW ================= */
          <motion.div
            key="blog-detail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-[800px] mx-auto px-5 md:px-12"
          >
            {/* Back Button */}
            <div className="mb-12">
              <button
                onClick={() => setSelectedArticleId(null)}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#F8F4F2]/60 hover:text-[#A27B5D] transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>BACK TO ARTICLES</span>
              </button>
            </div>

            {/* Article Content */}
            {activeArticle && (
              <article className="space-y-8 font-body">
                {/* Meta details */}
                <div className="space-y-4">
                  <span className="inline-block bg-[#A27B5D]/10 text-[#A27B5D] font-mono font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded border border-[#A27B5D]/20">
                    {activeArticle.category}
                  </span>
                  <h1 className="font-display text-3xl md:text-5xl font-semibold text-[#F8F4F2] leading-tight">
                    {activeArticle.title}
                  </h1>
                  <div className="flex items-center gap-6 text-xs text-[#F8F4F2]/40 font-mono uppercase border-b border-[#F8F4F2]/10 pb-6">
                    <span>KEYWORDS: <strong className="text-[#A27B5D] font-normal">{activeArticle.keyword}</strong></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F8F4F2]/10" />
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {activeArticle.readTime}
                    </span>
                  </div>
                </div>

                {/* Banner Image */}
                <div className="aspect-[16/9] rounded overflow-hidden border border-[#F8F4F2]/10 bg-[#090B0B]">
                  <img 
                    src={activeArticle.imageUrl} 
                    alt={activeArticle.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Paragraphs body */}
                <div className="space-y-6 text-sm md:text-base leading-relaxed text-[#F8F4F2]/75 font-body">
                  {activeArticle.content.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                {/* Strategic SEO Footer inside article */}
                <div className="border-t border-[#F8F4F2]/10 pt-12 mt-12 space-y-6">
                  <div className="p-8 rounded bg-[#283133]/20 border border-[#F8F4F2]/10 text-center space-y-4">
                    <span className="text-[10px] uppercase tracking-wider text-[#A27B5D] font-mono font-bold block">
                      CRAFTED FOR YOU IN DFW
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-[#F8F4F2]">
                      Want to Achieve Similar Results?
                    </h3>
                    <p className="text-xs text-[#F8F4F2]/60 max-w-md mx-auto leading-relaxed">
                      Every session is custom-planned from orientation to wardrobe to fully deliver on your unique portrait, branding, or commercial goals.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={onBookSession}
                        className="btn bg-[#A27B5D] hover:bg-[#AA876C] text-[#090B0B] font-semibold py-2.5 px-6 rounded text-xs tracking-wider uppercase cursor-pointer"
                      >
                        Start Planning Your Shoot
                      </button>
                    </div>
                  </div>
                </div>

              </article>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
