import * as React from "react";
import styles from "./S4.module.scss";
import type { IS4Props } from "./IS4Props";

import progover from "../../assets/progover2.png";
import faqs from "../../assets/freq2.png";
import changenet from "../../assets/change.png";

import { useSiteMediaCarousel } from "../../hooks/useSitemediaCarousel";
import HeroCarousel from "../HeroCarousel/HeroCarousel";
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

import S4Header from "./sections/S4Header";
import S4InfoHub from "./sections/S4InfoHub";
import S4LibrarySection from "./sections/S4LibrarySection";
import S4Footer from "./sections/S4Footer";

interface IDocLibraryItem {
  title: string;
  href: string;
  tag: string;
}

const ASK_ELEVATE_URL = "https://forms.office.com/pages/responsepage.aspx?id=sl0ycr032EWhrvFpvO4PqD3MZEG3Ah1AjLVYu_vv-rZUMlpCRFc0MjNRQlhFRFRETVZMTkNPRVpPUC4u&route=shorturl";

const libraryLinks: IDocLibraryItem[] = [
  { title: "Project Elevate", href: "https://seplatenergy.sharepoint.com/:f:/r/sites/ExternalSharing/S4-HANA%20project/PROJECT%20ELEVATE/PROJECT%20ELEVATE?csf=1&web=1&e=50Xlwp", tag: "Library" },
  { title: "As-Is Processes", href: "https://seplatenergy.sharepoint.com/:f:/r/sites/ExternalSharing/S4-HANA%20project/Shared%20Documents/As-Is%20Processes?csf=1&web=1&e=uVKTzO", tag: "Folder" },
  { title: "Draft Documents", href: "https://seplatenergy.sharepoint.com/:f:/r/sites/ExternalSharing/S4-HANA%20project/Shared%20Documents/Draft%20Documents", tag: "Folder" },
  { title: "Pain Points Listing", href: "https://seplatenergy.sharepoint.com/:f:/r/sites/ExternalSharing/S4-HANA%20project/Shared%20Documents/PAIN%20POINTS%20LISTING", tag: "Folder" },
  { title: "Reports", href: "https://seplatenergy.sharepoint.com/:f:/r/sites/ExternalSharing/S4-HANA%20project/Test", tag: "Folder" },
];

const S4: React.FC<IS4Props> = () => {
  const [currentPage, setCurrentPage] = React.useState<string | null>(null);
  const [teamSectionsOpen, setTeamSectionsOpen] = React.useState(false);
  const [checkingUrl, setCheckingUrl] = React.useState<string | null>(null);
  const [isRoadmapGalleryOpen, setIsRoadmapGalleryOpen] = React.useState(false);
  const [selectedNewsItem, setSelectedNewsItem] = React.useState<INewsItem | null>(null);
  const [newsLandingTab, setNewsLandingTab] = React.useState<"updates" | "social">("updates");

  const showError = useErrorToast();
  const { checkAccess } = useSharePointAccessCheck();
  const { slides: heroSlides } = useSiteMediaCarousel("Homepage");

  const overviewRef = React.useRef<HTMLElement | null>(null);
  const roadmapRef = React.useRef<HTMLElement | null>(null);
  const libraryRef = React.useRef<HTMLElement | null>(null);
  const hubsRef = React.useRef<HTMLElement | null>(null);
  const contactsRef = React.useRef<HTMLElement | null>(null);

  const navigate = (page: string): void => setCurrentPage(page);

  const roadmapGalleryItem = {
    title: "Timeline & Key Milestones",
    imageUrl: "https://seplatenergy.sharepoint.com/:i:/r/sites/ExternalSharing/S4-HANA%20project/SiteAssets/SitePages/newroad7.png",
    alt: "Timeline and key milestones",
  };

  const openRoadmapGallery = (): void => setIsRoadmapGalleryOpen(true);
  const closeRoadmapGallery = (): void => setIsRoadmapGalleryOpen(false);

  React.useEffect(() => {
    document.body.classList.add("s4-fullscreen-shell");
    return () => { document.body.classList.remove("s4-fullscreen-shell"); };
  }, []);

  React.useEffect(() => {
    if (!isRoadmapGalleryOpen) return;
    const handleKeyDown = (event: KeyboardEvent): void => { if (event.key === "Escape") closeRoadmapGallery(); };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = previousOverflow; };
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
      if (result.status !== "SUCCESS") { showError(result.message ?? "This resource is reserved for the project team."); return; }
      if (onSuccess) { onSuccess(); return; }
      window.location.assign(href);
    } finally {
      setCheckingUrl(null);
    }
  };

  // ── Page routing ──────────────────────────────────────────────────────────
  if (currentPage === "overview") return <ProgrammeOverview onBack={() => setCurrentPage(null)} />;
  if (currentPage === "faqs") return <FAQs onBack={() => setCurrentPage(null)} onNavigate={setCurrentPage} />;
  if (currentPage === "change-network") return <ChangeNetwork onBack={() => setCurrentPage(null)} />;
  if (currentPage === "project-events") return <ProjectEvents onBack={() => setCurrentPage(null)} />;

  if (currentPage === "news-landing") {
    return (
      <NewsLanding
        onBack={() => setCurrentPage(null)}
        initialTab={newsLandingTab}
        onOpenDetail={(item) => { setSelectedNewsItem(item); setCurrentPage("whats-new-detail"); }}
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

  if (["data-management", "testing-management", "cutover-management", "day-in-life", "governance-decisions", "training-enablement"].includes(currentPage ?? "")) {
    const pageContent: Record<string, { title: string; text: string; label: string }> = {
      "data-management": { label: "Project Information Hub", title: "Data Management Hub", text: "Data cleanup progress and dashboards, key plans, key decisions for data archiving, mock data load plans and objectives." },
      "testing-management": { label: "Project Information Hub", title: "Testing Management Hub", text: "Testing Strategy and Objectives, Testing Plan, Test Case Development Approach and related materials." },
      "cutover-management": { label: "Project Information Hub", title: "Cutover Management Hub", text: "Cutover Strategy and Objectives, Cutover Plan, Blackout Period Plans, Fallback Plans and related materials." },
      "day-in-life": { label: "Project Information Hub", title: "A Typical Day in the Life", text: "A day in the life video — Maintenance, Supply Chain, Finance & Budgeting, Projects, and GRC." },
      "governance-decisions": { label: "Project Information Hub", title: "Governance & Decisions", text: "Governance notes, decision logs, checkpoints, and key programme decisions across workstreams." },
      "training-enablement": { label: "Project Information Hub", title: "Training & Enablement", text: "Training plans, schedules, guides, and readiness support for end users and change agents." },
    };
    const page = pageContent[currentPage!];
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
                    <span className={styles.preparedPagePill}>Content being prepared</span>
                    <span className={styles.preparedPagePill}>Page coming soon</span>
                  </div>
                  <a href="#" className={styles.preparedPageBackLink} onClick={(e) => { e.preventDefault(); setCurrentPage(null); }}>Back to homepage</a>
                </div>
              </section>
            </div>
          </main>
        </div>
      </section>
    );
  }

  // ── Main homepage ─────────────────────────────────────────────────────────
  return (
    <section className={styles.s4}>
      <div className={styles.peShell}>

        <S4Header />

        <main className={styles.peMain}>
          <div className={styles.peContainer}>

            {/* Row 1: Carousel + Programme Overview + Change Network */}
            <section className={styles.overviewStage} ref={overviewRef}>
              <div className={styles.overviewMedia}>
                <HeroCarousel items={heroSlides} autoPlayMs={5000} />
              </div>
              <a href="#" className={styles.topRouteCard} onClick={(e) => { e.preventDefault(); navigate("overview"); }}>
                <div className={styles.topRouteMedia}><img src={progover} alt="Programme Overview" /></div>
                <div className={styles.topRouteBody}>
                  <h3 className={styles.topRouteTitle}>Programme Overview</h3>
                  <p className={styles.topRouteText}>The main story, structure, and shared references for the programme.</p>
                  <span className={styles.topRouteLink}>Open page</span>
                </div>
              </a>
              <a href="#" className={styles.topRouteCard} onClick={(e) => { e.preventDefault(); navigate("change-network"); }}>
                <div className={styles.topRouteMedia}><img src={changenet} alt="Change Network" /></div>
                <div className={styles.topRouteBody}>
                  <h3 className={styles.topRouteTitle}>Change Network</h3>
                  <p className={styles.topRouteText}>Meet the people helping drive adoption, local engagement, and programme support across teams.</p>
                  <span className={styles.topRouteLink}>Open page</span>
                </div>
              </a>
            </section>

            {/* Row 2: Timeline + FAQs */}
            <section className={styles.timelineFaqRow} ref={roadmapRef}>
              <div className={styles.rowDivider} aria-hidden="true" />
              <div className={styles.timelineFaqStage}>
                <article className={styles.roadmapCard}>
                  <div className={styles.roadmapTitle}>Timeline & Key Milestones</div>
                  <p className={styles.roadmapIntro}>Key dates and the moments that shape delivery rhythm across the programme</p>
                  <button type="button" className={styles.overviewGalleryCard} onClick={openRoadmapGallery} aria-label="Open timeline visual in full screen">
                    <img src={roadmapGalleryItem.imageUrl} alt={roadmapGalleryItem.alt} className={styles.overviewGalleryImage} />
                    <div className={styles.overviewGalleryShade} />
                    <div className={styles.overviewGalleryTop}>
                      <span className={styles.overviewGalleryExpand}>
                        <span className={styles.overviewGalleryExpandIcon} aria-hidden="true">⤢</span>
                        Full screen
                      </span>
                    </div>
                    <div className={styles.overviewGalleryCaption}>
                      <span className={styles.overviewGalleryLabel}>Programme visual</span>
                      <strong className={styles.overviewGalleryTitle}>{roadmapGalleryItem.title}</strong>
                      <span className={styles.overviewGalleryHint}>Click to expand</span>
                    </div>
                  </button>
                </article>
                <a href="#" className={styles.topRouteCard} onClick={(e) => { e.preventDefault(); navigate("faqs"); }}>
                  <div className={styles.topRouteMedia}><img src={faqs} alt="Enterprise FAQs" /></div>
                  <div className={styles.topRouteBody}>
                    <h3 className={styles.topRouteTitle}>Enterprise FAQs</h3>
                    <p className={styles.topRouteText}>Plain answers to the questions people ask most often across the business.</p>
                    <span className={styles.topRouteLink}>Open page</span>
                  </div>
                </a>
              </div>
            </section>
            <br></br>
            <br></br>
            {/* What's New */}
            <section className={styles.whatsNewSection}>
              <div className={styles.rowDivider} aria-hidden="true" />
              <WhatsNew
                onOpenDetail={(item: INewsItem) => { setSelectedNewsItem(item); setCurrentPage("whats-new-detail"); }}
                onViewAll={(tab) => { setNewsLandingTab(tab); setCurrentPage("news-landing"); }}
              />
            </section>
            <br></br>
            <br></br>
            {/* Project Information Hub */}
            <S4InfoHub hubsRef={hubsRef} onNavigate={navigate} />
            <br></br>
            <br></br>
            {/* Project Events */}
            <section className={styles.projectEventsSection}>
              <div className={styles.rowDivider} aria-hidden="true" />
              <button type="button" className={styles.projectEventsBanner} onClick={() => navigate("project-events")}>
                <div className={styles.projectEventsBannerDiag} aria-hidden="true" />
                <div className={styles.projectEventsBannerLeft}>
                  <h2 className={styles.projectEventsBannerEyebrow}>Project Events</h2>
                </div>
                <div className={styles.projectEventsBannerCenter}>
                  <p className={styles.projectEventsBannerSummary}>
                    Awareness webinars · Team building · Workshop recordings · Solution design kickoffs
                  </p>
                </div>
                <div className={styles.projectEventsBannerRight}>
                  <span className={styles.projectEventsBannerArrow} aria-hidden="true">
                    <svg viewBox="0 0 28 28" fill="none"><path d="M4 14h20M16 6l8 8-8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </div>
              </button>
            </section>
            <br></br>
            <br></br>
            {/* Project Team Library */}
            <S4LibrarySection
              libraryRef={libraryRef as React.RefObject<HTMLElement>}
              teamSectionsOpen={teamSectionsOpen}
              setTeamSectionsOpen={setTeamSectionsOpen}
              libraryLinks={libraryLinks}
              handleProtectedNavigation={handleProtectedNavigation}
            />
            <br></br>
            <br></br>
            <br></br>

            {/* Footer + Contact */}
            <div ref={contactsRef as React.RefObject<HTMLDivElement>}>
              <S4Footer
                askElevateUrl={ASK_ELEVATE_URL}
                onNavigateFaqs={() => navigate("faqs")}
                onNavigateChangeNetwork={() => navigate("change-network")}
                onNavigateProgrammeOverview={() => navigate("overview")}
              />
            </div>

          </div>
        </main>

        {/* Roadmap gallery modal */}
        {isRoadmapGalleryOpen && (
          <div className={styles.galleryModal} role="dialog" aria-modal="true" aria-label="Timeline gallery">
            <div className={styles.galleryBackdrop} onClick={closeRoadmapGallery} />
            <div className={styles.galleryPanel}>
              <div className={styles.galleryToolbar}>
                <div className={styles.galleryToolbarText}>
                  <strong className={styles.galleryToolbarTitle}>{roadmapGalleryItem.title}</strong>
                </div>
                <button type="button" className={styles.galleryClose} onClick={closeRoadmapGallery} aria-label="Close gallery">×</button>
              </div>
              <div className={styles.galleryStage}>
                <img src={roadmapGalleryItem.imageUrl} alt={roadmapGalleryItem.alt} className={styles.galleryStageImage} />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default S4;