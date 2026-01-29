"use client";

import React from "react";
import SearchBar from "@/common/SearchBar";
import Link from "next/link";
import { UsersQueryParams, useUsers } from "@/hooks/useUsers";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useTranslations } from "next-intl";

type Filter = {
  key: string;
  active: boolean;
};
const filters: Filter[] = [
  { key: "HELPERS_ALL", active: true },
  { key: "HELPERS_NEARBY", active: false },
  { key: "HELPERS_TOP_RATED", active: false },
];

const Helpers = () => {
  const  t  = useTranslations();
  const [query, setQuery] = React.useState<UsersQueryParams>({
    role: "HELPER",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useUsers(query);

  const loadMoreRef = useInfiniteScroll(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  );

  const userList = data?.pages?.flatMap((p) => p.data) || [];

  const handleFilterClick = (filter: Filter) => {
    const prevActiveFilter = filters.find((f) => f.active);
    if (prevActiveFilter) {
      prevActiveFilter.active = false;
    }
    filter.active = true;
    switch (filter.key) {
      case "HELPERS_ALL":
        setQuery({ role: "HELPER" });
        break;
      case "HELPERS_NEARBY":
        // For demonstration, we set a dummy location parameter
        setQuery({ role: "HELPER" /* location: "current_location" */ });
        break;
      case "HELPERS_TOP_RATED":
        setQuery({ role: "HELPER" /* sortBy: "avgRating", order: "desc" */ });
        break;
      default:
        setQuery({ role: "HELPER" });
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t("HELPERS_TITLE")} ✨
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {userList.length} helpers available in your area
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar
        type="search"
        placeholder={t("HELPERS_SEARCH_PLACEHOLDER")}
        handleSearch={(e) =>
          // @ts-expect-error value not recognized
          setQuery((prev) => ({ ...prev, search: e.target.value }))
        }
      />

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
          {t("HELPERS_FILTER")}:
        </span>
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              filter.active
                ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500"
            }`}
            onClick={() => handleFilterClick(filter)}
          >
            {t(filter.key)}
          </button>
        ))}
      </div>

      {/*/!* Loading State *!/*/}
      {isLoading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin h-12 w-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-16 bg-red-50 dark:bg-red-900/20 rounded-2xl">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            Error loading helpers
          </h3>
          <p className="text-red-500 dark:text-red-300">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
        </div>
      )}

      {/* Helpers List */}
      <div className="space-y-4">
        {!isLoading && !error && userList.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t("HELPERS_NO_RESULTS")}
            </h3>
          </div>
        ) : (
          !isLoading &&
          !error &&
          userList.map((helper) => (
            <Link
              key={helper.id}
              href={`/helpers/${helper.id}`}
              className="block group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all p-4 group-hover:scale-[1.02] duration-300">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="h-16 w-16 rounded-xl overflow-hidden bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-md">
                    {helper?.profile?.firstName?.charAt(0)}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {helper.profile?.firstName} {helper.profile?.lastName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {helper.roles?.join(", ")}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l3 7h7l-5.5 4 2.5 7-7-4.5L5.5 20 8 13 2 9h7z" />
                        </svg>
                        <span className="text-sm font-semibold">
                          {helper.avgRating}
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {helper?.profile?.address?.city}
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {helper.profile?.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-shrink-0"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))
        )}
        <div ref={loadMoreRef} className="h-10 flex justify-center">
          {isFetchingNextPage && <span>Loading…</span>}
        </div>
      </div>
    </main>
  );
};
export default Helpers;
