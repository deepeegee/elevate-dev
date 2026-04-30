import * as React from "react";
import styles from "../S4.module.scss";

interface IDocLibraryItem {
    title: string;
    href: string;
    tag: string;
}

interface IS4LibrarySectionProps {
    libraryRef: React.RefObject<HTMLElement>;
    teamSectionsOpen: boolean;
    setTeamSectionsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    libraryLinks: IDocLibraryItem[];
    handleProtectedNavigation: (event: React.MouseEvent<HTMLElement>, href: string) => Promise<void>;
}

const S4LibrarySection: React.FC<IS4LibrarySectionProps> = ({
    libraryRef,
    teamSectionsOpen,
    setTeamSectionsOpen,
    libraryLinks,
    handleProtectedNavigation,
}) => (
    <>
        <section className={styles.focusMarker}>
            <span className={styles.focusMarkerLine} aria-hidden="true" />
            <div className={styles.focusMarkerTextWrap}>
                <p className={styles.focusMarkerTitle}>Project Team Focus</p>
                <p className={styles.focusMarkerText}>Team spaces and work pages</p>
            </div>
            <button
                type="button"
                className={styles.focusMarkerToggle}
                aria-expanded={teamSectionsOpen}
                onClick={() => setTeamSectionsOpen((prev) => !prev)}
            >
                <span className={styles.focusMarkerToggle}>
                    {teamSectionsOpen ? "Hide team sections" : "Show team sections"}
                </span>
                <svg className={styles.focusMarkerChevron} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 5.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </section>

        {teamSectionsOpen && (
            <section className={styles.libraryStage} ref={libraryRef}>
                <div className={styles.resourceCardTitle}>Project Document Library</div>
                <div className={styles.libraryInfoRow}>
                    <p className={styles.libraryIntroText}>Access panel for key project folders and working document locations.</p>
                    <p className={styles.libraryFootnote}>Project Team Members Only</p>
                </div>
                <br></br>
                <div className={styles.resourceList}>
                    {libraryLinks.map((item, index) => (
                        <button
                            key={index}
                            type="button"
                            className={styles.resourceItem}
                            onClick={(event) => void handleProtectedNavigation(event, item.href)}
                        >
                            <span className={styles.resourceItemMain}>
                                <span className={styles.resourceItemIcon} />
                                <span className={styles.resourceItemTitle}>{item.title}</span>
                            </span>
                            <span className={styles.resourceItemTag}>{item.tag}</span>
                        </button>
                    ))}
                </div>
            </section>
        )}
    </>
);

export default S4LibrarySection;