import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 - News!</title>
        <meta name="description" content="Your Best Place for stay informed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="h-16">
        <TheHeader />
      </header>
      <main className="flex flex-col items-center justify-center">ciao</main>
      <footer>
        <TheFooter />
      </footer>
    </>
  );
};

export default Home;

export const TheHeader: React.FC = () => {
  return (
    <div className=" ml-auto flex h-full w-1/2 items-center justify-between pr-12">
      <div>T3 - NEWS</div>
      <div>ciao</div>
    </div>
  );
};

export const TheFooter: React.FC = () => {
  return (
    <h2 className="text-xl">T3 - News is Developed and Manteined by Tonino</h2>
  );
};
