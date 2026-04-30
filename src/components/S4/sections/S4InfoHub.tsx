import * as React from "react";
import styles from "../S4.module.scss";

interface IInfoHubItem {
  title: string;
  summary: string;
  pageKey:
    | "data-management"
    | "testing-management"
    | "cutover-management"
    | "day-in-life"
    | "governance-decisions"
    | "training-enablement";
  isReady?: boolean; // toggle to true when content is ready
}

interface IS4InfoHubProps {
  hubsRef: React.RefObject<HTMLElement | null>;
  onNavigate: (page: string) => void;
}

const infoHubItems: IInfoHubItem[] = [
  { title: "Governance & Decisions", summary: "Governance notes, decision logs, checkpoints, and key programme decisions across workstreams.", pageKey: "governance-decisions", isReady: false },
  { title: "Training & Enablement", summary: "Training plans, schedules, guides, and readiness support for end users and change agents.", pageKey: "training-enablement", isReady: false },
  { title: "Data Management Hub", summary: "Data cleanup progress and dashboards, key plans, key decisions for data archiving, mock data load plans and objectives.", pageKey: "data-management", isReady: false },
  { title: "Testing Management Hub", summary: "Testing Strategy and Objectives, Testing Plan, Test Case Development Approach and related materials.", pageKey: "testing-management", isReady: false },
  { title: "Cutover Management Hub", summary: "Cutover Strategy and Objectives, Cutover Plan, Blackout Period Plans, Fallback Plans and related materials.", pageKey: "cutover-management", isReady: false },
  { title: "A Typical Day in the Life", summary: "A day in the life video — Maintenance, Supply Chain, Finance & Budgeting, Projects, and GRC.", pageKey: "day-in-life", isReady: false },
];

const ACCENT_CLASSES = [
  "infoHubAccentGreen",
  "infoHubAccentTeal",
  "infoHubAccentGold",
  "infoHubAccentRed",
  "infoHubAccentLime",
  "infoHubAccentGreen",
] as const;

const S4InfoHub: React.FC<IS4InfoHubProps> = ({ hubsRef, onNavigate }) => {
  return (
    <section className={styles.infoHubSection} ref={hubsRef}>
      <div className={styles.rowDivider} aria-hidden="true" />
      <div className={styles.sectionHeadingRow}>
        <div>
          <h2>Project Information Hub</h2>
          <p>Key workstream hubs with progress, plans, and materials for the programme.</p>
        </div>
      </div>
      <div className={styles.infoHubGrid}>
        {infoHubItems.map((item, index) => {
          const accentKey = ACCENT_CLASSES[index] ?? "infoHubAccentGreen";
          const accentClass = styles[accentKey];
          const isReady = item.isReady ?? false;

          return (
            <article
              key={index}
              className={`${styles.infoHubCard} ${!isReady ? styles.infoHubCardDisabled : ""}`}
            >
              <button
                type="button"
                className={styles.infoHubCardLink}
                onClick={() => isReady && onNavigate(item.pageKey)}
                disabled={!isReady}
                aria-disabled={!isReady}
              >
                <div className={styles.infoHubTop}>
                  <span className={`${styles.infoHubAccent} ${accentClass}`} />
                  <div className={styles.infoHubMetaMini}>Hub</div>
                </div>
                <h3 className={styles.infoHubCardTitle}>{item.title}</h3>
                <p className={styles.infoHubCardSummary}>{item.summary}</p>
                <span className={`${styles.infoHubOpenBtn} ${!isReady ? styles.infoHubOpenBtnSoon : ""}`}>
                  {isReady ? (
                    <>
                      Open page
                      <svg className={styles.infoHubArrow} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg width="11" height="11" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                        <path d="M7 9V6a3 3 0 1 1 6 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                      Coming soon
                    </>
                  )}
                </span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default S4InfoHub;