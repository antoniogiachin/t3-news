export const THEMES_LIST = [
  "light",
  "dark",
  "black",
  "dracula",
  "night",
  "winter",
];

export const useTheme = () => {
  if (typeof window !== "undefined") {
    const theme = (localStorage.getItem("t3-news-theme") as string) ?? "dark";

    if (theme) document.body.setAttribute("data-theme", theme);
  }

  const setTheme = (theme: string) => {
    if (theme) {
      document.body.setAttribute("data-theme", theme);
      localStorage.setItem("t3-news-theme", theme);
    }
  };

  return { setTheme };
};
