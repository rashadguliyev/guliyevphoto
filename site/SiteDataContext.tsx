"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";
import { defaultCmsValues } from "./cmsFields";
import { portfolioItems as defaultPortfolioItems } from "./data";
import type { PortfolioItem } from "./types";

type SiteDataValue = {
  content: Record<string, string>;
  get: (key: string, fallback?: string) => string;
  portfolioItems: PortfolioItem[];
  refresh: () => Promise<void>;
};

const SiteDataContext = createContext<SiteDataValue>({
  content: defaultCmsValues,
  get: (key, fallback = "") => defaultCmsValues[key] ?? fallback,
  portfolioItems: defaultPortfolioItems,
  refresh: async () => {},
});

function normalizePortfolio(row: Record<string, unknown>): PortfolioItem {
  return {
    id: String(row.id),
    title: String(row.title || "Untitled"),
    category: String(row.category || "portraits") as PortfolioItem["category"],
    imageUrl: String(row.image_url || ""),
    description: String((row.settings as Record<string, unknown> | null)?.description || ""),
    gear: String(row.gear || ""),
    location: String(row.location || ""),
    settings: (row.settings as PortfolioItem["settings"]) || {
      lens: "",
      aperture: "",
      shutter: "",
      iso: "",
    },
  };
}

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<Record<string, string>>(defaultCmsValues);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(defaultPortfolioItems);

  const refresh = async () => {
    const [contentResult, portfolioResult] = await Promise.all([
      supabase.from("site_content").select("key,value"),
      supabase.from("portfolio_items").select("*").eq("is_visible", true).order("sort_order"),
    ]);

    if (contentResult.data) {
      const overrides = Object.fromEntries(contentResult.data.map((row) => [row.key, row.value]));
      setContent({ ...defaultCmsValues, ...overrides });
    }
    if (portfolioResult.data?.length) {
      setPortfolioItems(portfolioResult.data.map(normalizePortfolio));
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const value = useMemo<SiteDataValue>(
    () => ({
      content,
      get: (key, fallback = "") => content[key] ?? fallback,
      portfolioItems,
      refresh,
    }),
    [content, portfolioItems],
  );

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export const useSiteData = () => useContext(SiteDataContext);
