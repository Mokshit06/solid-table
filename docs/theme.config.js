import { useRouter } from "next/router";

const title = "Lightweight and extensible data tables for SolidJS";

export default {
  projectLink: "https://github.com/mokshit06/solid-table",
  docsRepositoryBase:
    "https://github.com/mokshit06/solid-table/tree/next/docs/pages",
  titleSuffix: " – Solid Table",
  search: true,
  unstable_flexsearch: true,
  floatTOC: true,
  logo: () => {
    return (
      <span
        className="mx-2 font-extrabold hidden md:inline select-none"
        title={"Solid Table: " + title}
      >
        Solid Table
      </span>
    );
  },
  head: ({ title, meta }) => {
    return (
      <>
        {/* Favicons, meta */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content={
            meta.description ||
            "Lightweight and extensible data tables for SolidJS"
          }
        />
        <meta
          name="og:description"
          content={
            meta.description ||
            "Lightweight and extensible data tables for SolidJS"
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mokshit06" />
        <meta
          name="og:title"
          content={
            title
              ? title + " – Solid Table"
              : "Solid Table: Lightweight and extensible data tables"
          }
        />
        <meta name="apple-mobile-web-app-title" content="Solid Table" />
      </>
    );
  },
  footerEditLink: () => {
    return "Edit this page on GitHub →";
  },
  footerText: () => {
    return `MIT ${new Date().getFullYear()} © Mokshit Jain.`;
  },
};
