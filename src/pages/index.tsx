import type { GetServerSidePropsContext, NextPage } from "next";
import { signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TheHero } from "../components/UI/TheHero";
import { TheSearchBar } from "../components/UI/TheSearchBar";
import { useLocation } from "../hooks/useLocation";
import {
  deleteSearchHistoryFromLS,
  getSearchHistoryFromLS,
  seveSearchToLS,
} from "../utils/saveUtils";
import { useTheme } from "../hooks/useTheme";

import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { makeSerializable } from "../server/common/make-serializable";
import { trpc } from "../utils/trpc";
import type { Search } from "@prisma/client";

export type SessionUser =
  | ({
      id: string;
    } & {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    })
  | undefined
  | null;

const Home: NextPage<{ user: SessionUser }> = ({ user }) => {
  useTheme();
  const getLoc = useLocation();

  const utils = trpc.useContext();

  const [search, setSearch] = useState<string>("");
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

  const { data: getAll } = trpc.example.getAllTodayNews.useQuery(
    {
      loc: getLoc as string,
    },
    { refetchOnWindowFocus: false }
  );

  const { data: allByKeyword, refetch: startSearch } =
    trpc.example.searchByKeyword.useQuery(
      {
        keyword: search,
      },
      { enabled: false }
    );

  const searchHistory = useRef<Search[]>();
  const { data: historyFromServer } = trpc.example.getSearchHistory.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { mutateAsync: saveSearch } = trpc.example.saveSearch.useMutation({
    onSuccess() {
      utils.example.getSearchHistory.invalidate();
    },
  });

  const historyFromLS = getSearchHistoryFromLS();

  useEffect(() => {
    if (historyFromServer && user) {
      searchHistory.current = historyFromServer ?? [];
    } else if (historyFromLS && !user) {
      searchHistory.current = getSearchHistoryFromLS() ?? [];
    }
  }, [historyFromServer, user, historyFromLS]);

  const handleLogin = async () => {
    await signIn();
    deleteSearchHistoryFromLS();
  };

  const handleLogout = async () => {
    await signOut();
  };

  const handleShowUserMenu = () => {
    if (user) setShowUserMenu((prev) => !prev);
  };

  const handleSearch = async (
    keyword: string,
    mode: "debounce" | "search" | "retry" = "debounce"
  ) => {
    if (
      (!search && mode === "debounce" && search.trim() === "") ||
      (!search && mode === "search" && search.trim() === "")
    ) {
      return;
    }


    if (mode !== "debounce") {
      if (user) {
        await saveSearch({ keyword });
      } else {
        seveSearchToLS(keyword);
      }
      await startSearch();
      setSearch("");
      return;
    }

    await startSearch();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search && search.trim() !== "") {
        handleSearch(search);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <Head>
        <title>T3 - News!</title>
        <meta name="description" content="Your Best Place for stay informed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-accent">
        <TheHeader
          handleLogin={handleLogin}
          user={user}
          showUserMenu={showUserMenu}
          handleShowUserMenu={handleShowUserMenu}
        />
      </header>
      <main className="flex flex-col">
        <section>
          <TheSearchBar
            setSearch={setSearch}
            search={search}
            handleSearch={handleSearch}
            searchHistory={searchHistory.current}
          />
          <TheHero showUserMenu={showUserMenu} handleLogout={handleLogout} />
        </section>
      </main>
      <footer className="bg-secondary">
        <TheFooter />
      </footer>
    </>
  );
};

export default Home;

interface TheHeaderProps {
  user: SessionUser;
  showUserMenu: boolean;
  handleLogin: () => Promise<void>;
  handleShowUserMenu: () => void;
}

export const TheHeader: React.FC<TheHeaderProps> = ({
  handleLogin,
  user,
  showUserMenu,
  handleShowUserMenu,
}) => {
  console.log(user);

  return (
    <div className="flex h-full items-center  px-12 text-accent-content">
      <h1 className=" text-2xl">T3 - NEWS</h1>
      <div className="ml-auto flex h-full w-1/2 items-center justify-end">
        {user ? (
          <div className="avatar">
            {showUserMenu ? (
              <button className="btn" onClick={handleShowUserMenu}>
                Close Menu
              </button>
            ) : (
              <div className="w-12 cursor-pointer overflow-hidden rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <Image
                  src={user?.image ?? ""}
                  alt={user?.name ?? ""}
                  width={20}
                  height={20}
                  onClick={handleShowUserMenu}
                />
              </div>
            )}
          </div>
        ) : (
          <button className="btn" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
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

export const getServerSideProps: (
  context: GetServerSidePropsContext
) => Promise<{
  props: { user: SessionUser };
}> = async (context: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(context);

  if (!session) {
    props: {
      user: null;
    }
  }

  return {
    props: {
      user: session?.user ? makeSerializable(session?.user) : null,
    },
  };
};
