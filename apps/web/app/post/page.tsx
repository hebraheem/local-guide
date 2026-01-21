import AppHeader from "@/components/common/AppHeader";
import BottomNav from "@/components/common/BottomNav";
import React from "react";

export default async function PostRequestPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-primary-50 to-white">
      <AppHeader title="Post a Request" backHref="/home" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-4 space-y-4">
        <section className="rounded-2xl bg-white border border-primary-200 shadow-sm p-4 space-y-4">
          <h3 className="font-semibold text-primary-900">What do you need help with?</h3>
          <div className="grid grid-cols-3 gap-3 text-sm">
            {[
              { label: "Translation", emoji: "📝" },
              { label: "Errands", emoji: "🛒" },
              { label: "Admin", emoji: "💬" },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-primary-200 bg-white px-3 py-4 text-center">
                <div className="text-2xl mb-2">{c.emoji}</div>
                <div>{c.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white border border-primary-200 shadow-sm p-4 space-y-2">
          <h3 className="font-semibold text-primary-900">Describe Your Request</h3>
          <input
            className="w-full rounded-xl border border-primary-200 px-3 py-2 text-sm"
            placeholder="Need help with documents."
          />
        </section>

        <section className="rounded-2xl bg-white border border-primary-200 shadow-sm p-4 space-y-2">
          <h3 className="font-semibold text-primary-900">Select Location</h3>
          <div className="rounded-xl border border-primary-200 h-40 bg-primary-100" />
          <select className="w-full rounded-xl border border-primary-200 px-3 py-2 text-sm">
            <option>Munich, Germany</option>
            <option>Nürnberg, Germany</option>
          </select>
        </section>

        <div className="pt-2">
          <button className="w-full rounded-xl bg-primary-600 text-white font-medium py-3 shadow">Post Request</button>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
