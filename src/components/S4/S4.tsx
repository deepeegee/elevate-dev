import * as React from "react";
import styles from "./S4.module.scss";
import type { IS4Props } from "./IS4Props";

import seplatLogo from "../../assets/SeplatLogo.svg";
import elevateLogo from "../../assets/ProjectElevate.svg";
import sapLogo from "../../assets/SAP.svg";
import progover from "../../assets/progover2.png";
import faqs from "../../assets/freq2.png";
import changenet from "../../assets/change.png";
import help from "../../assets/quee2.png";
//import roadmapImage from "../../assets/newroad6.png";

import { useSiteMediaCarousel } from "..//../hooks/useSitemediaCarousel";
import HeroCarousel, {
  type IHeroCarouselItem,
} from "../HeroCarousel/HeroCarousel";
import { useErrorToast } from "../common/ErrorToast/ErrorToastProvider";
import { useSharePointAccessCheck } from "..//..//hooks/useSharePointGateCheck";
import ProgrammeOverview from "../ProgrammeOverview/ProgrammeOverview";
import FAQs from "../FAQs/FAQs";
import ChangeNetwork from "../ChangeNetwork/ChangeNetwork";
import ProjectEvents from "../ProjectEvents/ProjectEvents";
import type { INewsItem } from "../../hooks/useProjectNews";
import NewsLanding from "../WhatsNew/Newslanding";
import WhatsNewDetail from "../WhatsNew/WhatsNewDetail";
import WhatsNew from "../WhatsNew/WhatsNew";

interface IDocLibraryItem {
  title: string;
  href: string;
  tag: string;
}

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
}

interface IProjectEventItem {
  title: string;
  description: string;
}

const S4: React.FC<IS4Props> = () => {
  const [currentPage, setCurrentPage] = React.useState<string | null>(null);
  const [teamSectionsOpen, setTeamSectionsOpen] = React.useState(false);
  const [checkingUrl, setCheckingUrl] = React.useState<string | null>(null);
  const [isRoadmapGalleryOpen, setIsRoadmapGalleryOpen] = React.useState(false);
  const [selectedNewsItem, setSelectedNewsItem] = React.useState<INewsItem | null>(null);
  const [newsLandingTab, setNewsLandingTab] = React.useState<'updates' | 'social'>('updates');

  const showError = useErrorToast();
  const { checkAccess } = useSharePointAccessCheck();
  const { slides: heroSlides } = useSiteMediaCarousel("Homepage");

  const overviewRef = React.useRef<HTMLElement | null>(null);
  const roadmapRef = React.useRef<HTMLElement | null>(null);
  const libraryRef = React.useRef<HTMLElement | null>(null);
  const hubsRef = React.useRef<HTMLElement | null>(null);
  const areasRef = React.useRef<HTMLElement | null>(null);
  const contactsRef = React.useRef<HTMLElement | null>(null);

  const navigate = (page: string): void => setCurrentPage(page);

  const roadmapGalleryItem = {
    title: "Timeline & Key Milestones",
    imageUrl:
      "https://seplatenergy.sharepoint.com/:i:/r/sites/ExternalSharing/S4-HANA%20project/SiteAssets/SitePages/newroad7.png",
    alt: "Timeline and key milestones",
  };

  const openRoadmapGallery = (): void => setIsRoadmapGalleryOpen(true);
  const closeRoadmapGallery = (): void => setIsRoadmapGalleryOpen(false);

  React.useEffect(() => {
    console.log("S4 guard build - key-programme-button-fix");
    document.body.classList.add("s4-fullscreen-shell");

    return () => {
      document.body.classList.remove("s4-fullscreen-shell");
    };
  }, []);

  React.useEffect(() => {
    if (!isRoadmapGalleryOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        closeRoadmapGallery();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isRoadmapGalleryOpen]);

  const handleProtectedNavigation = async (
    event: React.MouseEvent<HTMLElement>,
    href: string,
    onSuccess?: () => void
  ): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    if (checkingUrl === href) return;

    setCheckingUrl(href);

    try {
      const result = await checkAccess(href);

      console.log("SP GATE RESULT", { href, result });

      if (result.status !== "SUCCESS") {
        console.warn("SP GATE BLOCKED", { href, result });

        showError(
          result.message ?? "This resource is reserved for the project team."
        );
        return;
      }

      if (onSuccess) {
        console.warn("SP GATE ALLOWED -> local success callback", {
          href,
          result,
        });

        onSuccess();
        return;
      }

      console.warn("SP GATE ALLOWED -> navigating", { href, result });

      window.location.assign(href);
    } finally {
      setCheckingUrl(null);
    }
  };

  if (currentPage === "overview") {
    return <ProgrammeOverview onBack={() => setCurrentPage(null)} />;
  }

  if (currentPage === "faqs") {
    return (
      <FAQs onBack={() => setCurrentPage(null)} onNavigate={setCurrentPage} />
    );
  }

  if (currentPage === "change-network") {
    return <ChangeNetwork onBack={() => setCurrentPage(null)} />;
  }

  if (currentPage === "project-events") {
    return <ProjectEvents onBack={() => setCurrentPage(null)} />;
  }

  if (currentPage === "news-landing") {
    return (
      <NewsLanding
        onBack={() => setCurrentPage(null)}
        initialTab={newsLandingTab}
        onOpenDetail={(item) => {
          setSelectedNewsItem(item);
          setCurrentPage("whats-new-detail");
        }}
      />
    );
  }

  if (currentPage === "whats-new-detail" && selectedNewsItem) {
    return (
      <WhatsNewDetail
        item={selectedNewsItem}
        onBack={() => { setCurrentPage(null); setSelectedNewsItem(null); }}
        onBackToLanding={() => { setCurrentPage("news-landing"); }}
      />
    );
  }

  if (
    currentPage === "data-management" ||
    currentPage === "testing-management" ||
    currentPage === "cutover-management" ||
    currentPage === "day-in-life" ||
    currentPage === "governance-decisions" ||
    currentPage === "training-enablement"
  ) {
    const pageContent: Record<
      | "data-management"
      | "testing-management"
      | "cutover-management"
      | "day-in-life"
      | "governance-decisions"
      | "training-enablement",
      { title: string; text: string; label: string }
    > = {
      "data-management": {
        label: "Project Information Hub",
        title: "Data Management Hub",
        text: "Data cleanup progress and dashboards, key plans, key decisions for data archiving, mock data load plans and objectives.",
      },
      "testing-management": {
        label: "Project Information Hub",
        title: "Testing Management Hub",
        text: "Testing Strategy and Objectives, Testing Plan, Test Case Development Approach and related materials.",
      },
      "cutover-management": {
        label: "Project Information Hub",
        title: "Cutover Management Hub",
        text: "Cutover Strategy and Objectives, Cutover Plan, Blackout Period Plans, Fallback Plans and related materials.",
      },
      "day-in-life": {
        label: "Project Information Hub",
        title: "A Typical Day in the Life",
        text: "A day in the life video — Maintenance, Supply Chain, Finance & Budgeting, Projects, and GRC.",
      },
      "governance-decisions": {
        label: "Project Information Hub",
        title: "Governance & Decisions",
        text: "Governance notes, decision logs, checkpoints, and key programme decisions across workstreams.",
      },
      "training-enablement": {
        label: "Project Information Hub",
        title: "Training & Enablement",
        text: "Training plans, schedules, guides, and readiness support for end users and change agents.",
      },
    };

    const page =
      pageContent[
        currentPage as
          | "data-management"
          | "testing-management"
          | "cutover-management"
          | "day-in-life"
          | "governance-decisions"
          | "training-enablement"
      ];

    return (
      <section className={styles.s4}>
        <div className={styles.peShell}>
          <main className={styles.peMain}>
            <div className={styles.peContainer}>
              <section className={styles.preparedPageSection}>
                <div className={styles.preparedPageCard}>
                  <span className={styles.preparedPageLabel}>{page.label}</span>
                  <h1 className={styles.preparedPageTitle}>{page.title}</h1>
                  <p className={styles.preparedPageText}>{page.text}</p>
                  <div className={styles.preparedPagePillRow}>
                    <span className={styles.preparedPagePill}>
                      Content being prepared
                    </span>
                    <span className={styles.preparedPagePill}>
                      Page coming soon
                    </span>
                  </div>
                  <a
                    href="#"
                    className={styles.preparedPageBackLink}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(null);
                    }}
                  >
                    Back to homepage
                  </a>
                </div>
              </section>
            </div>
          </main>
        </div>
      </section>
    );
  }

  const routeMap = {
    askElevate:
      "https://forms.office.com/pages/responsepage.aspx?id=sl0ycr032EWhrvFpvO4PqD3MZEG3Ah1AjLVYu_vv-rZUMlpCRFc0MjNRQlhFRFRETVZMTkNPRVpPUC4u&route=shorturl",
  };

  const externalLinkProps = {
    target: "_blank" as const,
    rel: "noopener noreferrer",
  };

  const infoHubItems: IInfoHubItem[] = [
    {
      title: "Governance & Decisions",
      summary: "Governance notes, decision logs, checkpoints, and key programme decisions across workstreams.",
      pageKey: "governance-decisions",
    },
    {
      title: "Training & Enablement",
      summary: "Training plans, schedules, guides, and readiness support for end users and change agents.",
      pageKey: "training-enablement",
    },
    {
      title: "Data Management Hub",
      summary: "Data cleanup progress and dashboards, key plans, key decisions for data archiving, mock data load plans and objectives.",
      pageKey: "data-management",
    },
    {
      title: "Testing Management Hub",
      summary: "Testing Strategy and Objectives, Testing Plan, Test Case Development Approach and related materials.",
      pageKey: "testing-management",
    },
    {
      title: "Cutover Management Hub",
      summary: "Cutover Strategy and Objectives, Cutover Plan, Blackout Period Plans, Fallback Plans and related materials.",
      pageKey: "cutover-management",
    },
    {
      title: "A Typical Day in the Life",
      summary: "A day in the life video — Maintenance, Supply Chain, Finance & Budgeting, Projects, and GRC.",
      pageKey: "day-in-life",
    },
  ];

  const projectEvents: IProjectEventItem[] = [
    {
      title: "General Awareness Webinars",
      description:
        "Recorded sessions from general awareness webinars delivered across the business.",
    },
    {
      title: "Team Building Events",
      description:
        "Photos, recordings, and highlights from project team building and community events.",
    },
    {
      title: "Project Plan Workshop",
      description: "Video and materials from the Project Plan Workshop event.",
    },
    {
      title: "Solution Design Workshop Kickoff",
      description:
        "Video and materials from the Solution Design Workshop Kickoff session.",
    },
  ];

  const libraryLinks: IDocLibraryItem[] = [
    {
      title: "Project Elevate",
      href: "https://seplatenergy.sharepoint.com/:f:/r/sites/ExternalSharing/S4-HANA%20project/PROJECT%20ELEVATE/PROJECT%20ELEVATE?csf=1&web=1&e=50Xlwp",
      tag: "Library",
    },
    {
      title: "As-Is Processes",
      href: "https://seplatenergy.sharepoint.com/:f:/r/sites/ExternalSharing/S4-HANA%20project/Shared%20Documents/As-Is%20Processes?csf=1&web=1&e=uVKTzO",
      tag: "Folder",
    },
    {
      title: "Draft Documents",
      href: "https://seplatenergy.sharepoint.com/:f:/r/sites/ExternalSharing/S4-HANA%20project/Shared%20Documents/Draft%20Documents",
      tag: "Folder",
    },
    {
      title: "Pain Points Listing",
      href: "https://seplatenergy.sharepoint.com/:f:/r/sites/ExternalSharing/S4-HANA%20project/Shared%20Documents/PAIN%20POINTS%20LISTING",
      tag: "Folder",
    },
    {
      title: "Reports",
      href: "https://seplatenergy.sharepoint.com/:f:/r/sites/ExternalSharing/S4-HANA%20project/Test",
      tag: "Folder",
    },
  ];


  return (
    <section className={styles.s4}>
      <div className={styles.peShell}>
        <header className={styles.peHeader}>
          <div className={styles.peContainer}>
            <div className={styles.peHeaderband}>
              <div className={styles.peHeaderbandInner}>
                <div className={styles.peLogoRow}>
                  <div className={`${styles.peLogoCell} ${styles.peLogoLeft}`}>
                    <img
                      className={styles.peHeaderLogoSeplat}
                      src={seplatLogo}
                      alt="Seplat logo"
                    />
                  </div>
                  <div className={`${styles.peLogoCell} ${styles.peLogoMid}`}>
                    <img
                      className={styles.peHeaderLogoElevate}
                      src={elevateLogo}
                      alt="Project Elevate logo"
                    />
                  </div>
                  <div className={`${styles.peLogoCell} ${styles.peLogoRight}`}>
                    <img
                      className={styles.peHeaderLogoSap}
                      src={sapLogo}
                      alt="SAP S/4HANA logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className={styles.peMain}>
          <div className={styles.peContainer}>
            {/* ── Row 1: Carousel + Programme Overview + Change Network ── */}
            <section className={styles.overviewStage} ref={overviewRef}>
              <div className={styles.overviewMedia}>
                <HeroCarousel items={heroSlides} autoPlayMs={5000} />
              </div>

              <a
                href="#"
                className={styles.topRouteCard}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("overview");
                }}
              >
                <div className={styles.topRouteMedia}>
                  <img src={progover} alt="Programme Overview" />
                </div>
                <div className={styles.topRouteBody}>
                  <h3 className={styles.topRouteTitle}>Programme Overview</h3>
                  <p className={styles.topRouteText}>
                    The main story, structure, and shared references for the
                    programme.
                  </p>
                  <span className={styles.topRouteLink}>Open page</span>
                </div>
              </a>

              <a
                href="#"
                className={styles.topRouteCard}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("change-network");
                }}
              >
                <div className={styles.topRouteMedia}>
                  <img src={changenet} alt="Change Network" />
                </div>
                <div className={styles.topRouteBody}>
                  {/* <div className={styles.topRouteEyebrow}>Community</div> */}
                  <h3 className={styles.topRouteTitle}>Change Network</h3>
                  <p className={styles.topRouteText}>
                    Meet the people helping drive adoption, local engagement,
                    and programme support across teams.
                  </p>
                  <span className={styles.topRouteLink}>Open page</span>
                </div>
              </a>
            </section>

            {/* ── Row 2: Timeline (70%) + FAQs (30%) ── */}
            <section className={styles.timelineFaqRow} ref={roadmapRef}>
              <div className={styles.rowDivider} aria-hidden="true" />
              <div className={styles.timelineFaqStage}>
                <article className={styles.roadmapCard}>
                  <div className={styles.roadmapTitle}>
                    Timeline & Key Milestones
                  </div>
                  <p className={styles.roadmapIntro}>
                    Key dates and the moments that shape delivery rhythm across
                    the programme
                  </p>
                  <button
                    type="button"
                    className={styles.overviewGalleryCard}
                    onClick={openRoadmapGallery}
                    aria-label="Open timeline visual in full screen"
                  >
                    <img
                      src={roadmapGalleryItem.imageUrl}
                      alt={roadmapGalleryItem.alt}
                      className={styles.overviewGalleryImage}
                    />
                    <div className={styles.overviewGalleryShade} />
                    <div className={styles.overviewGalleryTop}>
                      <span className={styles.overviewGalleryExpand}>
                        <span
                          className={styles.overviewGalleryExpandIcon}
                          aria-hidden="true"
                        >
                          ⤢
                        </span>
                        Full screen
                      </span>
                    </div>
                    <div className={styles.overviewGalleryCaption}>
                      <span className={styles.overviewGalleryLabel}>
                        Programme visual
                      </span>
                      <strong className={styles.overviewGalleryTitle}>
                        {roadmapGalleryItem.title}
                      </strong>
                      <span className={styles.overviewGalleryHint}>
                        Click to expand
                      </span>
                    </div>
                  </button>
                </article>

                <a
                  href="#"
                  className={styles.topRouteCard}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("faqs");
                  }}
                >
                  <div className={styles.topRouteMedia}>
                    <img src={faqs} alt="Enterprise FAQs" />
                  </div>
                  <div className={styles.topRouteBody}>
                    <h3 className={styles.topRouteTitle}>Enterprise FAQs</h3>
                    <p className={styles.topRouteText}>
                      Plain answers to the questions people ask most often
                      across the business.
                    </p>
                    <span className={styles.topRouteLink}>Open page</span>
                  </div>
                </a>
              </div>
            </section>
            <br></br>
            <br></br>
            <br></br>
            {/* ── What's New ── */}
            <section className={styles.whatsNewSection}>
              <div className={styles.rowDivider} aria-hidden="true" />
              <WhatsNew
                onOpenDetail={(item: INewsItem) => {
                  setSelectedNewsItem(item);
                  setCurrentPage("whats-new-detail");
                }}
                onViewAll={(tab) => {
                  setNewsLandingTab(tab);
                  setCurrentPage("news-landing");
                }}
              />
            </section>
            <br></br>
            <br></br>
            <br></br>
            {/* ── Project Information Hub ── */}
            <section className={styles.infoHubSection} ref={hubsRef}>
              <div className={styles.rowDivider} aria-hidden="true" />
              <div className={styles.sectionHeadingRow}>
                <div>
                  <h2>Project Information Hub</h2>
                  <p>
                    Key workstream hubs with progress, plans, and materials for
                    the programme.
                  </p>
                </div>
              </div>
              <div className={styles.infoHubGrid}>
                {infoHubItems.map((item, index) => {
                  const accentClass =
                    [
                      styles.infoHubAccentGreen,
                      styles.infoHubAccentTeal,
                      styles.infoHubAccentGold,
                      styles.infoHubAccentRed,
                      styles.infoHubAccentLime,
                      styles.infoHubAccentGreen,
                    ][index] ?? styles.infoHubAccentGreen;

                  return (
                    <article key={index} className={styles.infoHubCard}>
                      <button
                        type="button"
                        className={styles.infoHubCardLink}
                        onClick={() => navigate(item.pageKey)}
                      >
                        <div className={styles.infoHubTop}>
                          <span
                            className={`${styles.infoHubAccent} ${accentClass}`}
                          />
                          <div className={styles.infoHubMetaMini}>Hub</div>
                        </div>
                        <h3 className={styles.infoHubCardTitle}>
                          {item.title}
                        </h3>
                        <p className={styles.infoHubCardSummary}>
                          {item.summary}
                        </p>
                        <span className={styles.infoHubOpenBtn}>
                          Open page
                          <svg
                            className={styles.infoHubArrow}
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M2 7h10M8 3l4 4-4 4"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
            <br></br>
            <br></br>
            <br></br>
            {/* ── Project Events — slim cinematic card ── */}
            <section className={styles.projectEventsSection}>
              <div className={styles.rowDivider} aria-hidden="true" />
              <button
                type="button"
                className={styles.projectEventsBanner}
                onClick={() => navigate("project-events")}
              >
                <div
                  className={styles.projectEventsBannerDiag}
                  aria-hidden="true"
                />
                <div className={styles.projectEventsBannerLeft}>
                  {/* <span className={styles.projectEventsBannerEyebrow}>
                    Project
                  </span> */}
                  <h2 className={styles.projectEventsBannerEyebrow}>
                    Project Events
                  </h2>
                </div>
                <div className={styles.projectEventsBannerCenter}>
                  <p className={styles.projectEventsBannerSummary}>
                    Awareness webinars · Team building · Workshop recordings ·
                    Solution design kickoffs
                  </p>
                </div>
                <div className={styles.projectEventsBannerRight}>
                  <span
                    className={styles.projectEventsBannerArrow}
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 14h20M16 6l8 8-8 8"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </button>
            </section>
            <br></br>
            <br></br>
            {/* ── Focus Marker (Project Team) ── */}
            <section className={styles.focusMarker}>
              <span className={styles.focusMarkerLine} aria-hidden="true" />
              <div className={styles.focusMarkerTextWrap}>
                <p className={styles.focusMarkerTitle}>Project Team Focus</p>
                <p className={styles.focusMarkerText}>
                  Team spaces and work pages
                </p>
              </div>
              <button
                type="button"
                className={styles.focusMarkerToggle}
                aria-expanded={teamSectionsOpen}
                onClick={() => setTeamSectionsOpen((prev) => !prev)}
              >
                <span className={styles.focusMarkerToggle}>
                  {teamSectionsOpen
                    ? "Hide team sections"
                    : "Show team sections"}
                </span>
                <svg
                  className={styles.focusMarkerChevron}
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 5.5l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </section>

            {teamSectionsOpen && (
              <>
                <section className={styles.libraryStage} ref={libraryRef}>
                  <div className={styles.resourceCardTitle}>
                    Project Document Library
                  </div>
                  <p className={styles.resourceCardIntro}>
                    Access panel for key project folders and working document
                    locations.
                  </p>
                  <div className={styles.resourceList}>
                    {libraryLinks.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        className={styles.resourceItem}
                        onClick={(event) =>
                          void handleProtectedNavigation(event, item.href)
                        }
                      >
                        <span className={styles.resourceItemMain}>
                          <span className={styles.resourceItemIcon} />
                          <span className={styles.resourceItemTitle}>
                            {item.title}
                          </span>
                        </span>
                        <span className={styles.resourceItemTag}>
                          {item.tag}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className={styles.libraryFootnote}>
                    Project Team Members Only
                  </p>
                </section>
              </>
            )}

            {/* ── Dual pre-footer: Project Contact Info + Got a Question ── */}
            <section className={styles.dualFooterSection} ref={contactsRef}>
              <div className={styles.rowDivider} aria-hidden="true" />
              <div className={styles.dualFooterGrid}>
                <div className={styles.contactInfoCard}>
                  <h2 className={styles.contactInfoTitle}>
                    Project Contact Information
                  </h2>
                  <div className={styles.contactInfoBlock}>
                    <p className={styles.contactInfoLabel}>PMO Email</p>
                    <a
                      href="mailto:projectelevate@seplatenergy.com"
                      className={styles.contactInfoLink}
                    >
                      projectelevate@seplatenergy.com
                    </a>
                  </div>
                  <div className={styles.contactInfoBlock}>
                    <p className={styles.contactInfoLabel}>Channels of Engagement</p>
                    <ul className={styles.contactInfoIconList}>
                      <li>
                        <svg viewBox="0 0 20 20" fill="none" className={styles.contactInfoIcon}><rect x="2" y="4" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        <span>Stay informed: Read official project emails</span>
                      </li>
                      <li>
                        <svg viewBox="0 0 20 20" fill="none" className={styles.contactInfoIcon}><circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        <span>Ask early: Route questions through Change Champions / Super Users</span>
                      </li>
                      <li>
                        <svg viewBox="0 0 20 20" fill="none" className={styles.contactInfoIcon}><rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 8h8M6 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        <span>Participate when invited: Join townhalls / webinars / roadshows</span>
                      </li>
                      <li>
                        <svg viewBox="0 0 20 20" fill="none" className={styles.contactInfoIcon}><path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2z" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        <span>Send in your questions or feedback through our email</span>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.contactInfoBlock}>
                    <p className={styles.contactInfoLabel}>
                      How can you find us?
                    </p>
                    <p className={styles.contactInfoValue}>
                      S/4 HANA Wing — Yellow wing of the 4th floor
                    </p>
                  </div>
                </div>

                <a
                  href={routeMap.askElevate}
                  {...externalLinkProps}
                  className={`${styles.supportCard} ${styles.helpCard}`}
                >
                  <div className={styles.supportCardMedia}>
                    <img src={help} alt="Got a question" />
                  </div>
                  <div className={styles.supportCardBody}>
                    <div className={styles.supportCardEyebrow}>Help</div>
                    <h3 className={styles.supportCardTitle}>Got a question?</h3>
                    <p className={styles.supportCardText}>
                      Need a hand, want to flag something, or just not sure
                      where to go next? Ask away and we will point you in the
                      right direction.
                    </p>
                    <span className={styles.supportCardLink}>Ask away</span>
                  </div>
                </a>
              </div>
            </section>
          </div>
        </main>

        <div className={styles.footerStart} />

        <footer className={styles.peFooter}>
          <div className={styles.peContainer}>
            <div className={styles.peFooterInner}>
              <div className={styles.footerComp}>
                <span className={styles.seplatDark}>SEPLAT </span>
                <span className={styles.seplatLight}>ENERGY PLC</span>
              </div>
              <div className={styles.footerText}>
                <p>Reliable energy, limitless potential</p>
              </div>
            </div>
          </div>
        </footer>

        {isRoadmapGalleryOpen && (
          <div
            className={styles.galleryModal}
            role="dialog"
            aria-modal="true"
            aria-label="Timeline gallery"
          >
            <div
              className={styles.galleryBackdrop}
              onClick={closeRoadmapGallery}
            />
            <div className={styles.galleryPanel}>
              <div className={styles.galleryToolbar}>
                <div className={styles.galleryToolbarText}>
                  <strong className={styles.galleryToolbarTitle}>
                    {roadmapGalleryItem.title}
                  </strong>
                </div>
                <button
                  type="button"
                  className={styles.galleryClose}
                  onClick={closeRoadmapGallery}
                  aria-label="Close gallery"
                >
                  ×
                </button>
              </div>
              <div className={styles.galleryStage}>
                <img
                  src={roadmapGalleryItem.imageUrl}
                  alt={roadmapGalleryItem.alt}
                  className={styles.galleryStageImage}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default S4;