const AVAILABLE_COUNTRIES = [
  { locale: "it", code: "Europe/Rome" },
  { locale: "gb", code: "Europe/Uk" },
  { locale: "fr", code: "Europe/Paris" },
];

const getAndSetLocation = () => {
  const location = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const loc = AVAILABLE_COUNTRIES.find((ct) => ct.code === location)?.locale;
  localStorage.setItem("t3-news-location", loc ?? "us");
  return loc;
};

export const useLocation = () => {
  let location!: string;
  if (typeof window !== "undefined") {
    location = localStorage.getItem("t3-news-location") as string;

    if (location) return location;

    const getLoc = getAndSetLocation();
    return getLoc ?? "us";
  }
};
