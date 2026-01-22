export default function SearchBar({ placeholder = "Search" }: { placeholder?: string }) {
  return (
    <div className="w-full">
      <label className="relative block">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 dark:text-gray-500">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-3 py-3 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all"
        />
      </label>
    </div>
  );
}
