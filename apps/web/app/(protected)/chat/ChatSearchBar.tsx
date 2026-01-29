"use client";

import React from "react";
import SearchBar from "@/common/SearchBar";
import useTranslation from "@/hooks/useTranslation";

const ChatSearchBar = () => {
  const [query, setQuery] = React.useState("");
  const { t } = useTranslation();

  const deferredQuery = React.useDeferredValue(query);

  function handleSearch(query: any) {
    setQuery(query.target.value);
  }

  return (
    <SearchBar
      placeholder={t("CHAT_SEARCH_PLACEHOLDER")}
      handleSearch={handleSearch}
      value={query}
    />
  );
};
export default ChatSearchBar;
