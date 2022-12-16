import { type NextPage } from "next";
import Head from "next/head";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";

const Home: NextPage = () => {
  useTheme();

  const [search, setSearch] = useState<string>("");

  const handleSearch = async (keyword: string) => {
    // logiche di ricerca
    // settare timeout debounce, salvare ricerche recenti utente sia DB che LS se non auth
    console.log(keyword);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search && search !== "") {
        handleSearch(search);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <>
      <Head>
        <title>T3 - News!</title>
        <meta name="description" content="Your Best Place for stay informed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-accent">
        <TheHeader />
      </header>
      <main className="flex flex-col">
        <section className="mx-auto flex w-1/3 items-center justify-center pt-8">
          <TheSearchBar setSearch={setSearch} search={search} />
        </section>
        <section></section>
      </main>
      <footer className="bg-secondary">
        <TheFooter />
      </footer>
    </>
  );
};

export default Home;

export const TheHeader: React.FC = () => {
  return (
    <div className=" ml-auto flex h-full w-1/2 items-center justify-between pr-12 text-accent-content">
      <h1 className="text-2xl">T3 - NEWS</h1>
      <div>ciao</div>
    </div>
  );
};

export const TheFooter: React.FC = () => {
  return (
    <h2 className="text-xl text-accent-content">
      T3 - News is Developed and Manteined by Tonino
    </h2>
  );
};

interface TheSearchBarProps {
  search?: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const TheSearchBar: React.FC<TheSearchBarProps> = ({
  search,
  setSearch,
}) => {
  return (
    <>
      <label
        htmlFor="my-modal"
        className="input-bordered input-accent input flex w-full cursor-pointer items-center justify-center p-6"
      >
        {search !== "" ? search : "Start Searching Here!"}
      </label>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input-bordered input-accent input w-full max-w-xs"
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
    </>
  );
};
