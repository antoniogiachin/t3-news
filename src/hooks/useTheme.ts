export const THEMES_LIST = [
  "light",
  "dark",
  "cupcake",
  "corporate",
  "synthwave",
  "retro",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "dracula",
  "cmyk",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
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
