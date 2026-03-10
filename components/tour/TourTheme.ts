export const THEME = {
  dark: "#24140E",
  dark2: "#1C100B",
  darkBorder: "rgba(255,255,255,0.14)",
  darkSoft: "rgba(255,255,255,0.10)",
  darkText: "rgba(255,255,255,0.92)",
  darkMuted: "rgba(255,255,255,0.78)",
  warm: "rgba(148,111,77,0.18)",
  warmStrong: "rgba(148,111,77,0.28)",
  warmInk: "rgba(148,111,77,0.95)",
};

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}