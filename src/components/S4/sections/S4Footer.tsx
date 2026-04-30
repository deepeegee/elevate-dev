import * as React from "react";
import styles from "../S4.module.scss";
import help from "../../../assets/quee2.png";

interface IS4FooterProps {
  askElevateUrl: string;
  onNavigateFaqs: () => void;
  onNavigateChangeNetwork: () => void;
  onNavigateProgrammeOverview: () => void;
}

const S4Footer: React.FC<IS4FooterProps> = ({ askElevateUrl, onNavigateFaqs, onNavigateChangeNetwork, onNavigateProgrammeOverview }) => {
  return (
    <>
    <br></br>
      {/* ── Pre-footer: Contact Info + Got a Question ── */}
      <section className={styles.dualFooterSection}>
        <div className={styles.rowDivider1} aria-hidden="true" />
        {/* ── Mid-bar nav ── */}
        <div className={styles.footerMidBar}>
          <nav className={styles.footerNav}>
            <button type="button" className={styles.footerNavLink} onClick={onNavigateProgrammeOverview}>Programme Overview</button>
            <span className={styles.footerNavDot} aria-hidden="true">·</span>
            <button type="button" className={styles.footerNavLink} onClick={onNavigateFaqs}>FAQs</button>
            <span className={styles.footerNavDot} aria-hidden="true">·</span>
            <button type="button" className={styles.footerNavLink} onClick={onNavigateChangeNetwork}>Change Network</button>
            <span className={styles.footerNavDot} aria-hidden="true">·</span>

          </nav>
        </div>
        <div className={styles.dualFooterGrid}>

          <div className={styles.contactInfoCard}>
            <h2 className={styles.contactInfoTitle}>Project Contact Information</h2>
            <div className={styles.contactInfoBlock}>
              <p className={styles.contactInfoLabel}>Project Email</p>
              <a href="mailto:projectelevate@seplatenergy.com" className={styles.contactInfoLink}>
                projectelevate@seplatenergy.com
              </a>
            </div>
            <div className={styles.contactInfoBlock}>
              <p className={styles.contactInfoLabel}>Channels of Engagement</p>
              <ul className={styles.contactInfoIconList}>
                <li>
                  <svg viewBox="0 0 20 20" fill="none" className={styles.contactInfoIcon}><rect x="2" y="4" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  <span>Stay informed: Read official project emails</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="none" className={styles.contactInfoIcon}><circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" /><path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  <span>
                    Ask early: Route questions through{" "}
                    <a href="#" className={styles.contactInfoInlineLink} onClick={(e) => { e.preventDefault(); onNavigateChangeNetwork(); }}>
                      Change Champions / Super Users
                    </a>
                  </span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="none" className={styles.contactInfoIcon}><rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M6 8h8M6 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  <span>Participate when invited: Join townhalls / webinars / roadshows</span>
                </li>
                {/* <li>
                  <svg viewBox="0 0 20 20" fill="none" className={styles.contactInfoIcon}><path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2z" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  <span>
                    Send in your questions or feedback through our{" "}
                    <a href="mailto:projectelevate@seplatenergy.com" className={styles.contactInfoInlineLink}>
                      email
                    </a>
                  </span>
                </li> */}
              </ul>
            </div>
            <div className={styles.contactInfoBlock}>
              <p className={styles.contactInfoLabel}>How can you find us?</p>
              <p className={styles.contactInfoValue}>S/4 HANA Wing — Yellow wing of the 4th floor</p>
            </div>
          </div>

          <a
            href={askElevateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.supportCard} ${styles.helpCard}`}
          >
            <div className={styles.supportCardMedia}>
              <img src={help} alt="Got a question" />
            </div>
            <div className={styles.supportCardBody}>
              <div className={styles.supportCardEyebrow}>Help</div>
              <h3 className={styles.supportCardTitle}>Got a question?</h3>
              <p className={styles.supportCardText}>
                Need a hand, want to flag something, or just not sure where to go next? Ask away and we will point you in the right direction.
              </p>
              <span className={styles.supportCardLink}>Ask away</span>
            </div>
          </a>

        </div>
      </section>



      {/* ── Enterprise footer bar ── */}
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
    </>
  );
};

export default S4Footer;