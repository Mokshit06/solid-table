import { useRouter } from "next/router";

import styles from "./features.module.css";

const Feature = ({ text, icon }) => (
  <div className={styles.feature}>
    {icon}
    <h4>{text}</h4>
  </div>
);

const title = "Lightweight and extensible data tables for SolidJS";

const features = {
  lightweight: "Lightweight",
  aggregation: "Aggregation",
  sort: "Multi sort",
  globalFilters: "Global Filters",
  dataModels: "Server-side data models",
  virtualizable: "Virtualizable",
  pagination: "Pagination",
};

export default () => {
  return (
    <div className="mx-auto max-w-full w-[880px] text-center px-4 mb-10">
      <p className="text-lg mb-2 text-gray-600 md:!text-2xl">{title}</p>
      <div className={styles.features}>
        <Feature
          text={features.lightweight}
          icon={
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
              <line x1="16" y1="8" x2="2" y2="22"></line>
              <line x1="17.5" y1="15" x2="9" y2="15"></line>
            </svg>
          }
        />
        <Feature
          text={features.sort}
          icon={
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              shapeRendering="geometricPrecision"
              viewBox="0 0 24 24"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
          }
        />
        <Feature
          text={features.aggregation}
          icon={
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="10" y1="15" x2="10" y2="9"></line>
              <line x1="14" y1="15" x2="14" y2="9"></line>
            </svg>
          }
        />
        <Feature
          text={features.sort}
          icon={
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          }
        />
        <Feature
          text={features.globalFilters}
          icon={
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              shapeRendering="geometricPrecision"
            >
              <path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 16.25" />
              <path d="M8 16h.01" />
              <path d="M8 20h.01" />
              <path d="M12 18h.01" />
              <path d="M12 22h.01" />
              <path d="M16 16h.01" />
              <path d="M16 20h.01" />
            </svg>
          }
        />
        <Feature
          text={features.dataModels}
          icon={
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              shapeRendering="geometricPrecision"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          }
        />
        <Feature
          text={features.virtualizable}
          icon={
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              shapeRendering="geometricPrecision"
              viewBox="0 0 24 24"
            >
              <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
              <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"></path>
            </svg>
          }
        />
        <Feature
          text={features.pagination}
          icon={
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              shapeRendering="geometricPrecision"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="2"></circle>
              <path d="M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14"></path>
            </svg>
          }
        />
      </div>
    </div>
  );
};
