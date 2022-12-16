import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { TheHero } from "../components/UI/TheHero";
import { TheSearchBar } from "../components/UI/TheSearchBar";
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
        <section>
          <TheSearchBar setSearch={setSearch} search={search} />
        </section>
        <section>
          <TheHero />
        </section>
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
