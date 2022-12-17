import type { Search } from "@prisma/client";

export const seveSearchToLS = (keyword: string): void => {
  if (typeof window !== "undefined") {
    const searchHistory: Search[] =
      JSON.parse(localStorage.getItem("t3-search-history") as string) ?? [];

    if (searchHistory && searchHistory.length > 10) {
      searchHistory.shift();
    }

    if (
      searchHistory &&
      searchHistory.find(
        (sh) => sh.keyword.toLowerCase() === keyword.toLowerCase()
      )
    ) {
      return;
    }

    const newSearch = {
      id: new Date().getTime().toString(),
      keyword: keyword,
      createdAd: new Date(),
    };

    const removeDupls = [...new Set([...searchHistory, newSearch])];

    localStorage.setItem("t3-search-history", JSON.stringify(removeDupls));
  }
};

export const getSearchHistoryFromLS = (): Search[] | undefined => {
  if (typeof window !== "undefined") {
    return (
      JSON.parse(localStorage.getItem("t3-search-history") as string) ?? []
    );
  }
};

export const deleteSearchHistoryFromLS = (): void => {
  localStorage.removeItem("t3-search-history");
};
