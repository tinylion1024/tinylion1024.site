import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://tinylion1024.site",
  base: "/",
  output: "static",
  i18n: {
    locales: ["zh-CN", "en"],
    defaultLocale: "zh-CN",
    routing: { prefixDefaultLocale: false },
  },
});
