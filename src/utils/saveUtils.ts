export const seveSearchToLS = (keyword: string): void => {
  if (typeof window !== "undefined") {
    const searchHistory = localStorage.getItem("t3-search-history");

    localStorage.setItem(
      "t3-search-history",
      JSON.stringify([...(searchHistory ?? []), keyword])
    );
  }
};
