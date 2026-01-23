"use client";

import React from "react";
import useTranslation from "@/hooks/useTranslation";
import SearchBar from "@/common/SearchBar";

const filterBtn = [
  { label: "MAP_FILTER_ALL", key: "ALL" },
  { label: "MAP_FILTER_URGENT", key: "URGENT" },
  { label: "MAP_FILTER_NEARBY", key: "NEARBY" },
];

const MapSearchAndFilterButtons = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = React.useState<string>("ALL");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  
  const deferredSearchQuery = React.useDeferredValue(searchQuery);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  }

  console.log("deferredSearchQuery", deferredSearchQuery);

  return (
    <div className="flex flex-col gap-4">
      <SearchBar placeholder={t("MAP_SEARCH_PLACEHOLDER")} handleSearch={handleSearch}/>
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
          Filter:
        </span>
        {filterBtn.map((filter) => {
          const isActive = filter.key === activeFilter;
          let defaultClass =
            "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap";
          if (isActive) {
            defaultClass +=
              " bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg";
          } else {
            defaultClass +=
              " bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500";
          }
          return (
            <button
              key={filter.key}
              className={defaultClass}
              onClick={() => setActiveFilter(filter.key)}
            >
              {t(filter.label)}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default MapSearchAndFilterButtons;
