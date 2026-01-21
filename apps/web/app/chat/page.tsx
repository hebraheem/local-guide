import AppHeader from "@/components/common/AppHeader";
import BottomNav from "@/components/common/BottomNav";
import React from "react";

export default async function ChatPage() {
  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-primary-50 to-white">
      <AppHeader title="Chat" backHref="/home" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-4">
        <div className="rounded-2xl bg-white border border-primary-200 shadow-sm p-3 h-[65vh] flex flex-col">
          <div className="space-y-3 flex-1 overflow-auto pr-2">
            <div className="flex items-start gap-2">
              <div className="h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center">A</div>
              <div className="max-w-[70%] rounded-2xl bg-primary-100 px-3 py-2 text-sm">Hi Anna! Can you help me with a translation?</div>
            </div>
            <div className="flex items-start gap-2 justify-end">
              <div className="max-w-[70%] rounded-2xl bg-primary-600 text-white px-3 py-2 text-sm">Sure! I'm happy to help. When do you need it?</div>
              <div className="h-8 w-8 rounded-full bg-secondary-300 flex items-center justify-center">Y</div>
            </div>
          </div>
          <div className="pt-3 flex items-center gap-2">
            <input className="flex-1 rounded-full border border-primary-200 px-4 py-2 text-sm" placeholder="Type a message..." />
            <button className="h-10 w-10 rounded-full bg-primary-600 text-white flex items-center justify-center">➤</button>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
