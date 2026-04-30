import * as React from "react";
import styles from "./ChangeNetwork.module.scss";
import HeroCarousel from "../HeroCarousel/HeroCarousel";
import {
  useChangeNetworkHeadshots,
  normalizeNameSignature,
} from "..//../hooks/useChangeNetworkHeadshots";
import { useSiteMediaCarousel } from "..//../hooks/useSitemediaCarousel";

// ─── Types ────────────────────────────────────────────────────────────────────

type ContactRole = "Super User" | "SME" | "Data Agent";

interface IContact {
  name: string;
  role: ContactRole;
  workstream?: string;
  company?: string;
  email: string;
  phone?: string;
}

interface IChangeNetworkProps {
  onBack: () => void;
  spHttpClient?: unknown;
}


const superUsers: IContact[] = [
  { name: "Godwin Abii-Ndoh", role: "Super User", workstream: "Finance", email: "GAbii-Ndoh@seplatenergy.com" },
  { name: "Collins Ezeocha", role: "Super User", workstream: "Finance", email: "CEzeocha@seplatenergy.com" },
  { name: "Adedeji Ajakaye", role: "Super User", workstream: "Finance", email: "AAjakaye@seplatenergy.com" },
  { name: "Franklin Obika", role: "Super User", workstream: "Finance", email: "fobika@seplatenergy.com" },
  { name: "Titilayo Sonoiki", role: "Super User", workstream: "Finance", email: "TSonoiki@seplatenergy.com" },
  { name: "Israel Ekiko", role: "Super User", workstream: "GRC", email: "IEkiko@seplatenergy.com" },
  { name: "Osaretin Uwumarogie", role: "Super User", workstream: "PM", email: "3P-OUwumarogie@seplatenergy.com" },
  { name: "Ulysses Akporoba", role: "Super User", workstream: "PM", email: "3P-UAkporoba@seplatenergy.com" },
  { name: "Eseoghene Abeke", role: "Super User", workstream: "PM", email: "3P-EAbeke@seplatenergy.com" },
  { name: "Emmanuel Ogri", role: "Super User", workstream: "PM", email: "3P-EOgri@seplatenergy.com" },
  { name: "Jonathan Gharoro", role: "Super User", workstream: "PM", email: "JGharoro@seplatenergy.com" },
  { name: "Ademola Oluwasanmi", role: "Super User", workstream: "PM", email: "AOluwasanmi@seplatenergy.com" },
  { name: "Sammy Otu", role: "Super User", workstream: "PM", email: "SOtu@seplatenergy.com" },
  { name: "Chiossa Osai", role: "Super User", workstream: "PM", email: "COssai@seplatenergy.com" },
  { name: "Thomas Mokwenyei", role: "Super User", workstream: "PM", email: "TMokwenyei@seplatenergy.com" },
  { name: "Gideon Orusa", role: "Super User", workstream: "PM", email: "GOrusa@seplatenergy.com" },
  { name: "Samuel Akpan", role: "Super User", workstream: "PM", email: "Samuel.Akpan@seplatenergy.com" },
  { name: "Uwem Ukpe", role: "Super User", workstream: "PM", email: "UUkpe@seplatenergy.com" },
  { name: "Michael Dada", role: "Super User", workstream: "PM", email: "MDada@seplatenergy.com" },
  { name: "Christian Akamigbo", role: "Super User", workstream: "PM", email: "CAkamigbo@seplatenergy.com" },
  { name: "Chigozie Okonkwo", role: "Super User", workstream: "PM", email: "Chigozie.Okonkwo@seplatenergy.com" },
  { name: "Edet Eka", role: "Super User", workstream: "PS", email: "EEka@seplatenergy.com" },
  { name: "Oluwatosin Odewoye", role: "Super User", workstream: "PS", email: "OOdewoye@seplatenergy.com" },
  { name: "Oluwabunmi Olaniyan", role: "Super User", workstream: "SCM", email: "3P-OOlaniyan@seplatenergy.com" },
  { name: "Anozie Ezeribe", role: "Super User", workstream: "SCM", email: "AEzeribe@seplatenergy.com" },
  { name: "Victor America", role: "Super User", workstream: "SCM", email: "VAmerica@seplatenergy.com" },
  { name: "Onomen Ikuenobe", role: "Super User", workstream: "SCM", email: "OIkuenobe@seplatenergy.com" },
  { name: "Nsikak Lawson", role: "Super User", workstream: "SCM", email: "NLawson@seplatenergy.com" },
  { name: "Vivien Obiokafor", role: "Super User", workstream: "SCM", email: "VObiokafor@seplatenergy.com" },
  { name: "Ucheoma Ezirim", role: "Super User", workstream: "SCM", email: "UEzirim@seplatenergy.com" },
];

const smes: IContact[] = [
  { name: "Joy Efoechoku", role: "SME", workstream: "Finance", email: "JEfoechoku@seplatenergy.com" },
  { name: "Effiong Okokon", role: "SME", workstream: "Finance", email: "EOkokon@seplatenergy.com" },
  { name: "Paul Moses", role: "SME", workstream: "Finance", email: "PMoses@seplatenergy.com" },
  { name: "Adebayo Bodede", role: "SME", workstream: "GRC", email: "ABodede@seplatenergy.com" },
  { name: "Dolapo Egbonwon", role: "SME", workstream: "Technical", email: "degbonwon@seplatenergy.com" },
  { name: "Taiwo Awonaiya", role: "SME", workstream: "Technical", email: "TAwonaiya@seplatenergy.com" },
  { name: "Ifeoluwa Onifade", role: "SME", workstream: "Technical", email: "IOnifade@seplatenergy.com" },
  { name: "Olawale Kareem", role: "SME", workstream: "Technical", email: "OKareem@seplatenergy.com" },
  { name: "Oluseyi Ajala", role: "SME", workstream: "PM", email: "oajala@seplatenergy.com" },
  { name: "Oluwaseun Olasunmonu", role: "SME", workstream: "PM", email: "OOlasunmonu@seplatenergy.com" },
  { name: "Odudu Umoh", role: "SME", workstream: "PM", email: "OUmoh@seplatenergy.com" },
  { name: "Itoro Ukpong", role: "SME", workstream: "PM", email: "IUkpong@seplatenergy.com" },
  { name: "Eniola Olowoyeye", role: "SME", workstream: "PM", email: "EOlowoyeye@seplatenergy.com" },
  { name: "Gabriel Fagade", role: "SME", workstream: "PM", email: "GFagade@seplatenergy.com" },
  { name: "Wole Obawole", role: "SME", workstream: "PS", email: "Wole.Obawole@seplatenergy.com" },
  { name: "Chioma Eze", role: "SME", workstream: "PS", email: "CEze@seplatenergy.com" },
  { name: "Obeto Utomi", role: "SME", workstream: "SCM", email: "OUtomi@seplatenergy.com" },
  { name: "Stephen Onumara", role: "SME", workstream: "SCM", email: "SOnumara@seplatenergy.com" },
  { name: "Aminu Yahya", role: "SME", workstream: "SCM", email: "AYahya@seplatenergy.com" },
  { name: "Adedotun Ogundare", role: "SME", workstream: "SCM", email: "AOgundare@seplatenergy.com" },
  { name: "Bernard Mujakperuo", role: "SME", workstream: "SCM", email: "BMujakperuo@seplatenergy.com" },
  { name: "Ndifreke Umoren", role: "SME", workstream: "SCM", email: "NUmoren@seplatenergy.com" },
];

const dataAgents: IContact[] = [
  { name: "Franklin Obika", role: "Data Agent", workstream: "Finance", email: "fobika@seplatenergy.com" },
  { name: "Titilayo Sonoiki", role: "Data Agent", workstream: "Finance", phone: "+2348072795770", email: "TSonoiki@seplatenergy.com" },
  { name: "Michael Dada", role: "Data Agent", workstream: "PM", phone: "+2349062460142", email: "MDada@seplatenergy.com" },
  { name: "Christian Akamigbo", role: "Data Agent", workstream: "PM", phone: "+2348065215741", email: "CAkamigbo@seplatenergy.com" },
  { name: "Obinna Iwu", role: "Data Agent", workstream: "PM", email: "OIwu@seplatenergy.com" },
  { name: "Chudi Osisiogu", role: "Data Agent", workstream: "PM", email: "COsisiogu@seplatenergy.com" },
  { name: "Desmond Chukwu", role: "Data Agent", workstream: "PM", email: "CDesmond@seplatenergy.com" },
  { name: "Isonguyo Essien", role: "Data Agent", workstream: "PM", email: "Isonguyo.Essien@seplatenergy.com" },
  { name: "TBC", role: "Data Agent", workstream: "PS", email: "" },
  { name: "Victor America", role: "Data Agent", workstream: "SCM", email: "VAmerica@seplatenergy.com" },
  { name: "Onomen Ikuenobe", role: "Data Agent", workstream: "SCM", phone: "+2348066391148", email: "OIkuenobe@seplatenergy.com" },
  { name: "Simon Adekunle", role: "Data Agent", workstream: "SCM", email: "SAdekunle@seplatenergy.com" },
];


const allMembers: IContact[] = [
  ...superUsers,
  ...smes.filter((s) => !superUsers.some((su) => su.name === s.name)),
  ...dataAgents.filter(
    (d) =>
      d.name !== "TBC" &&
      !superUsers.some((su) => su.name === d.name) &&
      !smes.some((s) => s.name === d.name)
  ),
];


const DefaultAvatar: React.FC = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: "100%", height: "100%", display: "block" }}>
    <rect width="40" height="40" rx="20" fill="#dde8de" />
    <circle cx="20" cy="15.5" r="6.5" fill="#a8c4ab" />
    <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" fill="#a8c4ab" />
  </svg>
);


const HEADSHOT_BASE = "https://seplatenergy.sharepoint.com/sites/ExternalSharing/S4-HANA%20project/PROJECT%20ELEVATE/PROJECT%20ELEVATE/01.%20PMO%20Workstream/Project%20Team%20Mobilisation%20and%20Contacts/Change%20Network%20Pix";

const buildFallbackUrl = (name: string): string => {
  // Try common image extensions based on actual filenames in the folder
  const encoded = encodeURIComponent(name);
  return `${HEADSHOT_BASE}/${encoded}.jpg`;
};

interface IPersonCardProps {
  person: IContact;
  headshotMap: Record<string, string>;
}

const EXTENSIONS = ['jpg', 'jpeg', 'JPG', 'PNG', 'png', 'JPEG'];

const buildAttempts = (name: string): string[] => {
  const encoded = encodeURIComponent(name);
  const parts = name.trim().split(' ');
  const reversed = parts.length >= 2
    ? encodeURIComponent(`${parts[parts.length - 1]} ${parts.slice(0, -1).join(' ')}`)
    : encoded;

  const attempts: string[] = [];
  // Original name, all extensions
  EXTENSIONS.forEach(ext => attempts.push(`${HEADSHOT_BASE}/${encoded}.${ext}`));
  // Reversed name, all extensions
  EXTENSIONS.forEach(ext => attempts.push(`${HEADSHOT_BASE}/${reversed}.${ext}`));
  return attempts;
};

const PersonCard: React.FC<IPersonCardProps> = ({ person, headshotMap }) => {
  const mapped = headshotMap[normalizeNameSignature(person.name)];
  const attempts = React.useMemo(() => buildAttempts(person.name), [person.name]);
  const [attemptIndex, setAttemptIndex] = React.useState(0);
  const [imgFailed, setImgFailed] = React.useState(false);
  const initials = person.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

  const imgSrc = mapped ?? attempts[attemptIndex];

  const handleError = (): void => {
    if (attemptIndex < attempts.length - 1) {
      setAttemptIndex((prev) => prev + 1);
    } else {
      setImgFailed(true);
    }
  };

  return (
    <div className={styles.personCard}>
      <div className={styles.personAvatar}>
        {imgFailed ? (
          <div className={styles.personInitials} aria-hidden="true">{initials}</div>
        ) : (
          <img
            src={imgSrc}
            alt={person.name}
            loading="lazy"
            onError={handleError}
          />
        )}
      </div>
      <span className={styles.personName}>{person.name}</span>
      {person.email && (
        <a href={`mailto:${person.email}`} className={styles.personEmail}>
          {person.email}
        </a>
      )}
    </div>
  );
};

const ChangeNetwork: React.FC<IChangeNetworkProps> = ({ onBack, spHttpClient }) => {
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({
    superUsers: true,
    smes: false,
    dataAgents: false,
  });
  const [openWorkstreams, setOpenWorkstreams] = React.useState<Record<string, boolean>>({});

  const { headshotMap } = useChangeNetworkHeadshots(spHttpClient);
  const { slides } = useSiteMediaCarousel("ChangeNetwork", spHttpClient);

  const toggleGroup = (group: string): void => {
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const toggleWorkstream = (key: string): void => {
    setOpenWorkstreams((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getWorkstreams = (contacts: IContact[]): string[] =>
    Array.from(new Set(contacts.map((c) => c.workstream ?? "General"))).sort();

  return (
    <section className={styles.page}>
      <div className={styles.topShell}>

        {/* Back */}
        <div className={styles.backRow}>
          <a href="#" className={styles.backLink} onClick={(e) => { e.preventDefault(); onBack(); }}>
            <span className={styles.backIconWrap} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H15v-5h-6v5H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className={styles.backTextGroup}>
              <span className={styles.backLabel}>Back to Home</span>
            </span>
          </a>
        </div>

        <br />

        {/* Hero — left copy panel, right carousel — fixed 3:1 ratio */}
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1 className={styles.title}>Change Network</h1>
            <p className={styles.intro}>
              A business-led network of departmental SMEs, super users, and data agents
              who help translate change locally, cascade approved messages, and surface
              risks and feedback back into the programme.
            </p>
          </div>

          <div className={styles.heroCarouselWrap}>
            <HeroCarousel items={slides} autoPlayMs={5000} />
          </div>
        </header>

        {/* Summary cards */}
        <section className={styles.summaryGrid}>
          <article className={`${styles.summaryCard} ${styles.summaryCardGreen}`}>
            <p className={styles.cardLabel}>What it is</p>
            <h2>Embedded Change Agents</h2>
            <p>The change network is a pre-identified community of departmental SMEs, super users, and data agents who act as embedded change agents inside functions directly impacted by Project Elevate.</p>
          </article>
          <article className={`${styles.summaryCard} ${styles.summaryCardWarm}`}>
            <p className={styles.cardLabel}>Why it matters</p>
            <h2>Business-led Adoption</h2>
            <p>The network makes adoption business-led rather than only project-led by turning central project decisions into day-to-day behaviours in each function.</p>
          </article>
          <article className={`${styles.summaryCard} ${styles.summaryCardSoft}`}>
            <p className={styles.cardLabel}>How it works</p>
            <h2>Two Way Flow</h2>
            <p>It cascades messages down, surfaces feedback and risks up, and helps reduce blind spots, misinformation, and late operational surprises.</p>
          </article>
        </section>

        {/* Story section */}
        <section className={styles.storySection}>
          <article className={styles.featurePanel}>
            <div className={styles.featurePanelHead}>
              <p className={styles.cardLabel}>Who is in the network</p>
            </div>
            <h2>Designed for Translation, Validation, and the Right Level of Support</h2>
            <p className={styles.featureIntro}>
              The network is structured so teams know who to engage depending on the type and depth of support needed: <strong>SMEs</strong> support business process and data related topics at deep dive level, <strong>Super Users</strong> support business process and data related topics at a high level, and <strong>Data Agents</strong> support all data related topics.
            </p>
            <div className={styles.layerGrid}>
              <div className={styles.layerCard}>
                <h3>SMEs</h3>
                <p>Business and process authorities inside each function who confirm that process and content are right for the business.</p>
              </div>
              <div className={styles.layerCard}>
                <h3>Super Users</h3>
                <p>Hands-on enablers who help people do the work using the new ways of working.</p>
              </div>
              <div className={styles.layerCard}>
                <h3>Data Agents</h3>
                <p>Data-focused representatives who support all data-related topics, help drive data readiness, and act as the primary point of contact for data issues.</p>
              </div>
            </div>
          </article>

          <article className={styles.actionPanel}>
            <p className={styles.cardLabel}>What members do</p>
            <h2>Key Responsibilities</h2>
            <ul className={styles.bulletList}>
              <li>Cascade deep dive outcomes to your teams, what is changing, why, who is impacted, and when</li>
              <li>Translate outcomes into team level impacts and keep the impact actions log current as decisions evolve</li>
              <li>Drive readiness actions to closure, communications, training inputs, and local enablement</li>
              <li>Support teams through the change, answer questions, and reinforce new ways of working</li>
              <li>Feed back sentiment and issues, surface risks early, and escalate with practical mitigation actions</li>
            </ul>
          </article>
        </section>

        {/* Meet the people section — grouped by department, then by role */}
        <section className={styles.contactsSection}>
          <div className={styles.sectionHead}>
            <p className={styles.cardLabel}>The people behind the network</p>
            <h2>Meet the people driving SAP S/4 Hana change in Seplat</h2>
            <p>Browse by department, then by role. Email addresses shown under each person.</p>
          </div>

          {(() => {
            const DEPARTMENTS = ["Finance", "GRC", "PM", "PS", "SCM", "Technical"];
            const ROLE_ORDER: ContactRole[] = ["SME", "Super User", "Data Agent"];
            const allContacts = [...superUsers, ...smes, ...dataAgents.filter(d => d.name !== "TBC")];

            return DEPARTMENTS.map((dept) => {
              const deptKey = `dept-${dept}`;
              const isOpen = openGroups[deptKey] ?? (dept === "Finance");
              const deptPeople = allContacts.filter(c => c.workstream === dept);
              if (!deptPeople.length) return null;

              return (
                <article key={dept} className={styles.contactBlock}>
                  <button type="button" className={styles.contactToggle} onClick={() => toggleGroup(deptKey)} aria-expanded={isOpen}>
                    <div className={styles.blockHead}>
                      <div>
                        <p className={styles.blockKicker}>Department</p>
                        <h3>{dept}</h3>
                      </div>
                      <div className={styles.blockHeadRight}>
                        <span>{deptPeople.length} members</span>
                        <svg className={`${styles.toggleChevron} ${isOpen ? styles.toggleChevronOpen : ""}`} width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 5.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                  </button>
                  {isOpen && (
                    <div className={styles.workstreamList}>
                      {ROLE_ORDER.map((role) => {
                        const roleKey = `${deptKey}-${role}`;
                        const roleOpen = openWorkstreams[roleKey] ?? true;
                        const people = deptPeople.filter(c => c.role === role);
                        if (!people.length) return null;
                        const roleMeta: Record<ContactRole, string> = {
                          "SME": "Deep Dive Support",
                          "Super User": "High Level Support",
                          "Data Agent": "Data Related Support",
                        };
                        return (
                          <div key={role} className={styles.workstreamGroup}>
                            <button type="button" className={styles.workstreamToggle} onClick={() => toggleWorkstream(roleKey)} aria-expanded={roleOpen}>
                              <span className={styles.workstreamAccent} />
                              <span className={styles.workstreamLabel}>{role}s <span className={styles.workstreamSubLabel}>— {roleMeta[role]}</span></span>
                              <span className={styles.workstreamCount}>{people.length}</span>
                              <svg className={`${styles.toggleChevron} ${roleOpen ? styles.toggleChevronOpen : ""}`} width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 5.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </button>
                            {roleOpen && (
                              <div className={styles.headshotGrid}>
                                {people.map((person) => (
                                  <PersonCard key={`${person.email}-${person.role}`} person={person} headshotMap={headshotMap} />
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            });
          })()}
        </section>

        {/* Footer */}
        {/* <section className={styles.footerCard}>
          <div className={styles.footerInner}>
            <div>
              <p className={styles.cardLabel}>Project contact</p>
              <h2>Need help from the programme team?</h2>
              <p>Project email: <a href="mailto:Projectelevate@seplatenergy.com">Projectelevate@seplatenergy.com</a></p>
              <p>Floor: S/4Hana Floor, 4th Floor, Yellow Wing, Seplat House</p>
            </div>
            <div className={styles.footerAside}>
              <span className={styles.footerAsideTag}>Support</span>
              <p>Use the change network to translate impacts locally, surface risks early, and keep teams confident through transition.</p>
            </div>
          </div>
        </section> */}

      </div>
    </section>
  );
};

export default ChangeNetwork;