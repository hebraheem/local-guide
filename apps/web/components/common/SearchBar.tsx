export default function SearchBar({ placeholder = "Search" }: { placeholder?: string }) {
  return (
    <div className="w-full">
      <label className="relative block">
        <span className="absolute inset-y-0 left-3 flex items-center text-primary-500">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full rounded-xl border border-primary-200 bg-white/90 pl-10 pr-3 py-2 text-sm placeholder:text-primary-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
      </label>
    </div>
  );
}
