import type { Dispatch, SetStateAction } from "react";

interface TheSearchBarProps {
  search?: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const TheSearchBar: React.FC<TheSearchBarProps> = ({
  search,
  setSearch,
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
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn"
              onClick={() => setSearch("")}
            >
              Search
            </label>
          </div>
        </div>
      </div>
    </article>
  );
};
