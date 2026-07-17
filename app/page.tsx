"use client";

import App from "@/site/App";
import { SiteDataProvider } from "@/site/SiteDataContext";

export default function Home() {
  return (
    <SiteDataProvider>
      <App />
    </SiteDataProvider>
  );
}
