import Link from "next/link";

type Tab = { label: string; href: string; icon?: React.ReactNode };

export default function TabNav({ tabs, active }: { tabs: Tab[]; active: string }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {tabs.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className={
            "flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm " +
            (active === t.href
              ? "bg-primary-600 text-white border-primary-600"
              : "bg-white border-primary-200 text-primary-700")
          }
        >
          {t.icon}
          <span>{t.label}</span>
        </Link>
      ))}
    </div>
  );
}
