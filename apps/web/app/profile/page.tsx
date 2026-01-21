import AppHeader from "@/components/common/AppHeader";
import BottomNav from "@/components/common/BottomNav";
import React from "react";

export default async function ProfilePage() {
  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-primary-50 to-white">
      <AppHeader title="Your Profile" backHref="/home" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-4 space-y-4">
        <section className="rounded-2xl bg-white border border-primary-200 shadow-sm p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary-200" />
            <div>
              <p className="font-semibold text-primary-900">Mark Schneider</p>
              <p className="text-sm text-primary-700">★ 4.7 · Errand Helper, Nürnberg</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white border border-primary-200 shadow-sm p-4 space-y-2">
          <h3 className="font-semibold text-primary-900">About Me:</h3>
          <p className="text-sm text-primary-800">Reliable and friendly helper with 20+ reviews.</p>
        </section>

        <section className="rounded-2xl bg-white border border-primary-200 shadow-sm p-4 space-y-2">
          <h3 className="font-semibold text-primary-900">Languages:</h3>
          <p className="text-sm text-primary-800">English, Deutsch</p>
        </section>

        <section className="rounded-2xl bg-white border border-primary-200 shadow-sm p-2">
          <h3 className="font-semibold text-primary-900 px-2 py-1">Request History</h3>
          <ul className="divide-y divide-primary-100">
            <li className="flex items-center justify-between px-3 py-2 text-sm">
              <span>Bank Appointment</span>
              <span className="text-primary-700">Completed</span>
            </li>
            <li className="flex items-center justify-between px-3 py-2 text-sm">
              <span>Grocery Pickup</span>
              <span className="text-primary-700">Pending</span>
            </li>
          </ul>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
