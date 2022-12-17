import type { Search } from "@prisma/client";
import type { Dispatch, SetStateAction } from "react";

interface TheSearchBarProps {
  search?: string;
  setSearch: Dispatch<SetStateAction<string>>;
  handleSearch: (
    keyword: string,
    mode?: "debounce" | "search" | "retry"
  ) => Promise<void>;
  searchHistory?: Search[];
}

export const TheSearchBar: React.FC<TheSearchBarProps> = ({
  search,
  setSearch,
  handleSearch,
  searchHistory,
}) => {
  return (
    <article className="mx-auto flex w-1/3 items-center justify-center pt-16">
      <label
        htmlFor="my-modal"
        className="input-bordered input-accent input flex w-full cursor-pointer items-center justify-center p-6"
      >
        {search || "Start Searching Here!"}
      </label>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input-bordered input-accent input w-full"
          />
          {searchHistory &&
            searchHistory.map((sh) => (
              <div
                key={sh.id}
                className="flex items-center justify-between p-4"
              >
                <span className="text-xl capitalize">{sh.keyword}</span>
                <button
                  className="btn"
                  onClick={() => handleSearch(sh.keyword, "retry")}
                >
                  Retry Search
                </button>
              </div>
            ))}
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn"
              onClick={() => {
                if (!search) return;
                handleSearch(search as string, "search");
              }}
            >
              {search ? "Search" : "Close"}
            </label>
          </div>
        </div>
      </div>
    </article>
  );
};
