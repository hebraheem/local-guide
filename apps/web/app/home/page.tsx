import AppHeader from "@/components/common/AppHeader";
import SearchBar from "@/components/common/SearchBar";
import TabNav from "@/components/common/TabNav";
import HelperCard from "@/components/cards/HelperCard";
import BottomNav from "@/components/common/BottomNav";
import React from "react";

export default async function HomePage() {
  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <AppHeader
        title="HelferIn"
        rightIcons={[
          {
            label: "Settings",
            href: "/profile",
            svg: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0A1.65 1.65 0 0 0 9 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0A1.65 1.65 0 0 0 21 9.91H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            ),
          },
        ]}
        showLanguage
      />

      {/* Content */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-4 space-y-4">
        <div>
          <h2 className="font-semibold text-primary-800">Find a Helper Near You</h2>
        </div>
        <SearchBar />

        <TabNav
          active="/home"
          tabs={[
            { label: "Post Request", href: "/post" },
            { label: "View Requests", href: "/home" },
            { label: "Map View", href: "/map" },
          ]}
        />

        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-primary-900">Recommended Helpers</h3>
          <HelperCard name="Anna Müller" role="Translator" city="Munich" rating={4.8} />
          <HelperCard name="Mark Schneider" role="Errand Helper" city="Nürnberg" rating={4.7} />
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
