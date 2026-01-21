import AppHeader from "@/components/common/AppHeader";
import SearchBar from "@/components/common/SearchBar";
import TabNav from "@/components/common/TabNav";
import BottomNav from "@/components/common/BottomNav";
import React from "react";

export default async function MapPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-primary-50 to-white">
      <AppHeader title="HelferIn" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-4 space-y-4">
        <SearchBar placeholder="Search" />
        <TabNav
          active="/map"
          tabs={[
            { label: "Post Request", href: "/post" },
            { label: "View Requests", href: "/home" },
            { label: "Map View", href: "/map" },
          ]}
        />

        <section className="rounded-3xl border border-primary-200 bg-white shadow-sm overflow-hidden">
          <div className="h-[420px] bg-[linear-gradient(45deg,#e0e7ff,transparent),linear-gradient(135deg,#c7d2fe,transparent)] relative">
            {/* Simple fake markers */}
            <div className="absolute top-10 left-10 h-10 w-10 rounded-full bg-white shadow flex items-center justify-center border">
              🧑🏻
            </div>
            <div className="absolute top-24 right-16 h-10 w-10 rounded-full bg-white shadow flex items-center justify-center border">
              👩🏽
            </div>
            <div className="absolute bottom-16 left-1/3 h-10 w-10 rounded-full bg-white shadow flex items-center justify-center border">
              👨🏼
            </div>
            <div className="absolute bottom-6 inset-x-0 px-4 pb-4">
              <div className="rounded-2xl bg-white border border-primary-100 shadow p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-navy-800">Lisa K.</p>
                    <p className="text-xs text-primary-700 flex items-center gap-1">
                      <span className="text-yellow-600">★ 4.9</span>
                      <span>Available Now</span>
                    </p>
                  </div>
                  <button className="rounded-xl bg-primary-600 text-white text-sm px-4 py-2">Request Help</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
