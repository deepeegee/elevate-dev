import * as React from 'react';
import styles from '../ProgrammeOverview/Programmeoverview.module.scss';
//import overviewGalleryPreview from '../../assets/newroad6.png';
import sapLogo from '../../assets/SeplatLogo.svg';
import stakeholderMapImage from '../../assets/stakeholdermap.png';


interface IPhaseRoadmapSegment {
  key: string;
  label: string;
  date: string;
  startIso: string;
  detail: string;
}

interface IRoadmapTouchpoint {
  key: string;
  badge: string;
  label: string;
  date: string;
  detail: string;
}

interface IMilestoneItem {
  phase: string;
  date: string;
  isoDate: string;
}

interface IProcessArea {
  label: string;
  detail: string;
  icon: string;
}

interface IStakeholderGroup {
  name: string;
  roles: string[];
}


interface IPageSection {
  id: string;
  label: string;
}

interface IOverviewGalleryItem {
  title: string;
  imageUrl: string;
  alt: string;
}

type TRoadmapItemState = {
  type: 'phase' | 'touchpoint';
  key: string;
};

const PAGE_SECTIONS: IPageSection[] = [
  { id: 'hero', label: 'Overview' },
  { id: 'scope', label: 'Scope' },
  { id: 'phases', label: 'Phases' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'governance', label: 'Governance' },
  { id: 'people', label: 'People' }
];

interface IProgrammeOverviewProps {
  onBack: () => void;
}

const ProgrammeOverview: React.FC<IProgrammeOverviewProps> = ({ onBack }) => {
  const today = React.useMemo(() => new Date(), []);

  const formatCurrentPeriod = React.useCallback((): string => {
    return today.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric'
    });
  }, [today]);

  const roadmapPhases = React.useMemo<IPhaseRoadmapSegment[]>(
    () => [
      {
        key: 'prepare',
        label: 'Prepare',
        date: 'January 2026',
        startIso: '2026-01-01',
        detail:
          'Mobilisation, planning, governance setup, and readiness work to establish the programme foundation.'
      },
      {
        key: 'design',
        label: 'Design',
        date: 'March – May 2026',
        startIso: '2026-03-01',
        detail:
          'Detailed process and solution design, workshops, decision making, and business alignment across the functional areas.'
      },
      {
        key: 'build',
        label: 'Build',
        date: 'May 2026',
        startIso: '2026-05-01',
        detail:
          'Configuration, development, integration setup, and preparation of the solution for end to end testing.'
      },
      {
        key: 'functional-testing',
        label: 'Functional Testing',
        date: 'August 2026',
        startIso: '2026-08-01',
        detail:
          'Validation of process flows, solution design outputs, and core functional behaviour before formal test cycles.'
      },
      {
        key: 'sit',
        label: 'SIT',
        date: 'October 2026',
        startIso: '2026-10-01',
        detail:
          'System integration testing across connected business processes, interfaces, and data handoffs.'
      },
      {
        key: 'ttt',
        label: 'TTT',
        date: 'October 2026',
        startIso: '2026-10-01',
        detail:
          'Train the trainer sessions to prepare key change and training leads ahead of broader end user readiness activities.'
      },
      {
        key: 'uat',
        label: 'UAT',
        date: 'November 2026',
        startIso: '2026-11-01',
        detail:
          'User acceptance testing to confirm the solution works for business users and is ready for deployment.'
      },
      {
        key: 'eut',
        label: 'EUT',
        date: 'January 2027',
        startIso: '2027-01-01',
        detail:
          'End user training to prepare impacted teams for the new ways of working ahead of launch.'
      },
      {
        key: 'run',
        label: 'Run',
        date: 'March 2027',
        startIso: '2027-02-01',
        detail:
          'Go live and hypercare, with focused support as the business transitions into steady state operation.'
      }
    ],
    []
  );

  const roadmapTouchpoints = React.useMemo<IRoadmapTouchpoint[]>(
    () => [
      {
        key: 'design-window',
        badge: 'DG',
        label: 'Design Activity Window',
        date: 'March 2026 to May 2026',
        detail:
          'This period covers the main design and business process definition work before the build stage begins.'
      },
      {
        key: 'ttt-sessions',
        badge: 'TTT',
        label: 'Train the Trainer Sessions',
        date: 'October 2026',
        detail:
          'Selected change and training leads are prepared to support readiness and adoption activity across the business.'
      },
      {
        key: 'uat-sessions',
        badge: 'UAT',
        label: 'UAT Sessions',
        date: 'November 2026',
        detail:
          'Business users validate whether the solution is fit for purpose in realistic end to end scenarios.'
      },
      {
        key: 'end-user-training',
        badge: 'EUT',
        label: 'End User Training',
        date: 'January 2027',
        detail:
          'Wider user groups receive training to prepare for launch and support confident adoption.'
      },
      {
        key: 'go-live',
        badge: 'GL',
        label: 'Go Live',
        date: 'March 2027',
        detail: 'The programme enters production and transitions into supported hypercare.'
      }
    ],
    []
  );

  const milestones = React.useMemo<IMilestoneItem[]>(
    () => [
      { phase: 'Prepare', date: 'January 2026', isoDate: '2026-01-01' },
      { phase: 'Design', date: 'March – May 2026', isoDate: '2026-03-01' },
      { phase: 'Build', date: 'May 2026', isoDate: '2026-05-01' },
      { phase: 'Functional Testing', date: 'August 2026', isoDate: '2026-08-01' },
      { phase: 'SIT', date: 'October 2026', isoDate: '2026-10-01' },
      { phase: 'TTT', date: 'October 2026', isoDate: '2026-10-01' },
      { phase: 'UAT', date: 'November 2026', isoDate: '2026-11-01' },
      { phase: 'EUT', date: 'January 2027', isoDate: '2027-01-01' },
      { phase: 'Go Live', date: 'March 2027', isoDate: '2027-02-01' },
      { phase: 'Project End', date: 'May 2027', isoDate: '2027-05-01' }
    ],
    []
  );

  const processAreas: IProcessArea[] = [
    {
      label: 'Finance and Controlling',
      detail: 'Joint venture accounting and core finance processes.',
      icon: '₦'
    },
    {
      label: 'Governance, Risk and Controls',
      detail: 'Control framework, governance visibility, and risk oversight.',
      icon: '⊕'
    },
    {
      label: 'Supply Chain and Procurement',
      detail: 'Procurement, materials management, lean EWM, and SAP Ariba.',
      icon: '◈'
    },
    {
      label: 'Project Systems',
      detail: 'Project delivery and engineering related system workflows.',
      icon: '◎'
    },
    {
      label: 'Maintenance',
      detail: 'Asset support, work management, and operational continuity.',
      icon: '⚙'
    },
    {
      label: 'Data, Reporting and Analytics',
      detail: 'Business reporting, analytics, and decision support.',
      icon: '◇'
    }
  ];

  const processColumns = [
    processAreas.slice(0, 2),
    processAreas.slice(2, 4),
    processAreas.slice(4, 6)
  ];

  const directlyImpacted: IStakeholderGroup[] = [
    { name: 'Executive Leadership', roles: ['CEO', 'CFO', 'COO'] },
    {
      name: 'Finance',
      roles: [
        'Enterprise Risk and Controls',
        'Corporate Finance and Treasury',
        'Financial Control',
        'Financial Control and Tax',
        'Business Finance and Financial Performance',
        'Strategic Cost Management'
      ]
    },
    {
      name: 'Supply Chain and Procurement',
      roles: [
        'Category Management',
        'Procurement',
        'Procurement Operations',
        'Materials Management and Logistics',
        'NCD',
        'Onshore Asset Development'
      ]
    },
    {
      name: 'Maintenance',
      roles: ['Onshore Asset Team', 'Offshore Asset Team', 'Technical Team']
    },
    {
      name: 'Project Systems',
      roles: ['Technical Team', 'Projects Team', 'Exploration Team']
    },
    {
      name: 'IT',
      roles: ['Enterprise Projects', 'Enterprise Infrastructure', 'Cybersecurity']
    }
  ];
  const notDirectlyImpacted = [
    'External Affairs',
    'Planning and Business Development',
    'Gas and New Energy',
    'Corporate Services',
    'Legal and Company Secretary',
    'Business Assurance and Integrity'
  ];

  const financeSubItems = ['Investor Relations'];
  const maintenanceSubItems = ['Security', 'Technical', 'HSE'];

  const [indirectFinanceOpen, setIndirectFinanceOpen] = React.useState(false);

  interface IActivityMonthGroup {
    month: string;
    activities: string[];
  }

  const upcomingActivities = React.useMemo<IActivityMonthGroup[]>(
    () => [
      {
        month: 'March 2026',
        activities: ['General Project Awareness Webinar (Option 1)']
      },
      {
        month: 'April 2026',
        activities: [
          'General Project Awareness Webinar (Option 2)',
          'Pulse Survey',
          'Change Network Onboarding',
          'Executive Briefings',
          'BPO Steering Meeting',
          'Leadership Update Email'
        ]
      },
      {
        month: 'June 2026',
        activities: ['Vendor Update Email', 'SAP Day 1']
      },
      {
        month: 'August 2026',
        activities: ['General Project Awareness Webinar']
      },
      {
        month: 'October 2026',
        activities: [
          'Role Mapping and Design',
          'BPO Steering Meeting',
          'Train the Trainer Sessions',
          'Conference Room Pilot'
        ]
      },
      {
        month: 'November 2026',
        activities: ['SAP Day', 'User Acceptance Testing Sessions']
      },
      {
        month: 'January 2027',
        activities: ['End User Training Sessions', 'Roadshows and Town Halls']
      },
      {
        month: 'February 2027',
        activities: ['Go Live Readiness Survey']
      }
    ],
    []
  );

  const totalPlannedActivities = React.useMemo(
    () => upcomingActivities.reduce((total, group) => total + group.activities.length, 0),
    [upcomingActivities]
  );

  const businesses = [
    'Seplat East Ltd',
    'Seplat West Ltd',
    'Seplat Energy UK Ltd',
    'Seplat Energy Producing Nigeria Unlimited, Seplat'
  ];

  interface IWebinarSession {
    id: string;
    label: string;
    date: string;
    embedSrc: string;
  }

  const webinarSessions: IWebinarSession[] = [
    {
      id: 'option-1',
      label: 'Session 1',
      date: '25 March 2026',
      embedSrc: 'https://seplatenergy.sharepoint.com/sites/SEPNU-ITTeam/ProjectsandUTC/_layouts/15/embed.aspx?UniqueId=43f32c94-c45d-49e8-9487-846debc30c03&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create'
    },
    {
      id: 'option-2',
      label: 'Session 2',
      date: '25 March 2026',
      embedSrc: 'https://seplatenergy.sharepoint.com/sites/SEPNU-ITTeam/ProjectsandUTC/_layouts/15/embed.aspx?UniqueId=47565c99-3eac-4327-9a99-16a4263d4e41&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create'
    },
    {
      id: 'option-3',
      label: 'Session 3',
      date: '1 April 2026',
      embedSrc: 'https://seplatenergy.sharepoint.com/sites/SEPNU-ITTeam/ProjectsandUTC/_layouts/15/embed.aspx?UniqueId=0029423b-360b-49e0-9b69-f153b1a343e3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create'
    },
    {
      id: 'option-4',
      label: 'Session 4',
      date: '9 April 2026',
      embedSrc: 'https://seplatenergy.sharepoint.com/sites/SEPNU-ITTeam/ProjectsandUTC/_layouts/15/embed.aspx?UniqueId=0f7de640-c1ff-4768-9f0d-e24f92ec1781&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create'
    }
  ];

  interface IGovernanceNode {
    key: string;
    title: string;
    role: string;
    detail: string;
    color: 'green' | 'gold' | 'red' | 'teal';
  }

  const [activeGovNode, setActiveGovNode] = React.useState<string | null>(null);

  const governanceNodes: IGovernanceNode[] = [
    {
      key: 'steerco',
      title: 'Steering Committee',
      role: 'Programme Governance',
      detail: 'The Steering Committee provides executive oversight, resolves escalated issues, approves major decisions, and ensures the programme remains aligned with Seplat strategy and business objectives.',
      color: 'green',
    },
    {
      key: 'pmo',
      title: 'PMO',
      role: 'Programme Management',
      detail: 'The Programme Management Office coordinates delivery, tracks progress against the plan, manages risks and issues, and ensures consistent governance practices across all workstreams.',
      color: 'teal',
    },
    {
      key: 'bpo',
      title: 'BPO Council',
      role: 'Business Process Ownership',
      detail: 'Business Process Owners represent their functional areas, sign off on process design decisions, and ensure the solution meets business requirements before build and testing.',
      color: 'gold',
    },
    {
      key: 'ocm',
      title: 'OCM & Comms',
      role: 'Change Management',
      detail: 'The Organisational Change Management team manages readiness activities, communications, training planning, and stakeholder engagement to support successful adoption.',
      color: 'teal',
    },
    {
      key: 'sme',
      title: 'SME & Super Users',
      role: 'Subject Matter Expertise',
      detail: 'Subject Matter Experts and Super Users contribute to design workshops, validate outputs, support UAT, and act as the first line of support for their teams post go-live.',
      color: 'green',
    },
    {
      key: 'tech',
      title: 'Technical & IT',
      role: 'Technical Delivery',
      detail: 'The Technical and IT team manages the SAP build, integrations, infrastructure, security, and environment management throughout the implementation lifecycle.',
      color: 'red',
    },
  ];

  const overviewGalleryItem: IOverviewGalleryItem = {
    title: 'Programme Overview Visual',
    imageUrl: "https://seplatenergy.sharepoint.com/:i:/r/sites/ExternalSharing/S4-HANA%20project/SiteAssets/SitePages/newroad7.png",
    alt: 'Project Elevate programme overview visual'
  };


  const stakeholderMapGalleryItem: IOverviewGalleryItem = {
    title: 'Stakeholder Map',
    imageUrl: stakeholderMapImage,
    alt: 'Stakeholder landscape visual'
  };

  const heroRef = React.useRef<HTMLElement | null>(null);
  const scopeRef = React.useRef<HTMLElement | null>(null);
  const phasesRef = React.useRef<HTMLElement | null>(null);
  const milestonesRef = React.useRef<HTMLElement | null>(null);
  const governanceRef = React.useRef<HTMLElement | null>(null);
  const peopleRef = React.useRef<HTMLElement | null>(null);

  const sectionRefs = React.useMemo<Record<string, React.RefObject<HTMLElement | null>>>(
    () => ({
      hero: heroRef,
      scope: scopeRef,
      phases: phasesRef,
      milestones: milestonesRef,
      governance: governanceRef,
      people: peopleRef
    }),
    []
  );

  const currentRoadmapPhaseKey = 'design';

  const currentRoadmapPhaseIndex = React.useMemo(
    () => roadmapPhases.findIndex((phase) => phase.key === currentRoadmapPhaseKey),
    [roadmapPhases]
  );

  const currentRoadmapPhase = roadmapPhases[currentRoadmapPhaseIndex];
  const nextRoadmapPhase = roadmapPhases[currentRoadmapPhaseIndex + 1] ?? null;

  const [activeSectionId, setActiveSectionId] = React.useState<string>('hero');
  const [activeWebinarId, setActiveWebinarId] = React.useState<string>('option-1');
  const [impactedOpen, setImpactedOpen] = React.useState<Record<string, boolean>>({});
  const [indirectMaintenanceOpen, setIndirectMaintenanceOpen] = React.useState(false);
  const [activeGalleryItem, setActiveGalleryItem] = React.useState<IOverviewGalleryItem | null>(null);
  const [activeRoadmapItem, setActiveRoadmapItem] = React.useState<TRoadmapItemState>({
    type: 'phase',
    key: currentRoadmapPhaseKey
  });

  const activeRoadmapDetail = React.useMemo(() => {
    if (activeRoadmapItem.type === 'phase') {
      const phase =
        roadmapPhases.find((item) => item.key === activeRoadmapItem.key) ?? currentRoadmapPhase;

      return {
        eyebrow: 'Phase detail',
        badge: phase.label,
        title: phase.label,
        date: phase.date,
        detail: phase.detail,
        isGoLive: false
      };
    }

    const touchpoint =
      roadmapTouchpoints.find((item) => item.key === activeRoadmapItem.key) ?? roadmapTouchpoints[0];

    return {
      eyebrow: 'Adoption touchpoint',
      badge: touchpoint.badge,
      title: touchpoint.label,
      date: touchpoint.date,
      detail: touchpoint.detail,
      isGoLive: touchpoint.key === 'go-live'
    };
  }, [activeRoadmapItem, currentRoadmapPhase, roadmapPhases, roadmapTouchpoints]);

  const getMilestoneStatus = React.useCallback(
    (index: number): 'past' | 'current' | 'future' => {
      const currentMilestoneStart = new Date(milestones[index].isoDate);
      const nextMilestoneStart = milestones[index + 1] ? new Date(milestones[index + 1].isoDate) : null;

      if (nextMilestoneStart && today >= nextMilestoneStart) {
        return 'past';
      }

      if (today >= currentMilestoneStart && (!nextMilestoneStart || today < nextMilestoneStart)) {
        return 'current';
      }

      return 'future';
    },
    [milestones, today]
  );

  const nextMilestone = React.useMemo(
    () => milestones.find((item) => new Date(item.isoDate) > today) ?? milestones[milestones.length - 1],
    [milestones, today]
  );

  // const totalPlannedActivities = React.useMemo(
  //   () => upcomingActivities.reduce((total, group) => total + group.activities.length, 0),
  //   [upcomingActivities]
  // );

  const scrollToSection = (sectionId: string): void => {
    sectionRefs[sectionId]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleImpacted = (name: string): void => {
    setImpactedOpen((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const resetRoadmapDetail = (): void => {
    setActiveRoadmapItem({ type: 'phase', key: currentRoadmapPhaseKey });
  };

  const openGallery = (item: IOverviewGalleryItem): void => {
    setActiveGalleryItem(item);
  };

  const closeGallery = (): void => {
    setActiveGalleryItem(null);
  };

  React.useEffect(() => {
    if (!activeGalleryItem) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        closeGallery();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeGalleryItem]);

  React.useEffect(() => {
    const observed = PAGE_SECTIONS.map((section) => ({
      id: section.id,
      element: sectionRefs[section.id]?.current
    })).filter((item): item is { id: string; element: HTMLElement } => item.element instanceof HTMLElement);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveSectionId(visible.target.dataset.sectionId || 'hero');
        }
      },
      {
        rootMargin: '-18% 0px -55% 0px',
        threshold: [0.2, 0.45, 0.7]
      }
    );

    observed.forEach(({ id, element }) => {
      element.dataset.sectionId = id;
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionRefs]);

const renderGalleryCard = (item: IOverviewGalleryItem, label: string): React.ReactNode => (
  <button
    type="button"
    className={styles.overviewGalleryCard}
    onClick={() => openGallery(item)}
    aria-label={`Open ${item.title} in full screen`}
  >
    <img
      src={item.imageUrl}
      alt={item.alt}
      className={styles.overviewGalleryImage}
    />

    <div className={styles.overviewGalleryShade} />

    <div className={styles.overviewGalleryTop}>
      <span className={styles.overviewGalleryExpand}>
        <span className={styles.overviewGalleryExpandIcon} aria-hidden="true">
          ⤢
        </span>
        FULL SCREEN
      </span>
    </div>

    <div className={styles.overviewGalleryCaption}>
      <span className={styles.overviewGalleryLabel}>{label}</span>
      {/* <strong className={styles.overviewGalleryTitle}>{item.title}</strong> */}
      <span className={styles.overviewGalleryHint}>Click to expand</span>
    </div>
  </button>
);



  return (
    <div className={styles.page}>
      <div className={styles.progressRail} aria-label="Programme overview progress">
        {PAGE_SECTIONS.map((section) => {
          const isActive = activeSectionId === section.id;

          return (
            <button
              key={section.id}
              type="button"
              className={`${styles.progressDot} ${isActive ? styles.progressDotActive : ''}`}
              onClick={() => scrollToSection(section.id)}
              aria-label={`Go to ${section.label}`}
              title={section.label}
            >
              <span className={styles.progressDotBase} />
              {isActive && <span className={styles.progressMover} />}
            </button>
          );
        })}
      </div>

      <div className={styles.topShell}>
        <div className={styles.backRow}>
          <a
            href="#"
            className={styles.backLink}
            onClick={(event) => {
              event.preventDefault();
              onBack();
            }}
          >
            <span className={styles.backIconWrap} aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H15v-5h-6v5H4a1 1 0 0 1-1-1V9.5z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className={styles.backTextGroup}>
              <span className={styles.backLabel}>Back to Home</span>
            </span>
          </a>
        </div>

        <section className={styles.heroBanner} ref={heroRef}>
          <div className={styles.heroVisual} aria-hidden="true" />
          <div className={styles.heroOverlay}>
            <div className={styles.heroMain}>
              <p className={styles.pageEyebrow}>Programme overview</p>
              <h1 className={styles.pageTitle}>A new digital foundation for how Seplat works</h1>
              <p className={styles.pageSubtitle}>
                Project Elevate is Seplat&apos;s transformation programme to move key parts of the business onto a
                single SAP S/4 HANA Private Cloud Edition platform. The aim is to create a more connected,
                standardised, and efficient way of working across the organisation, supported by stronger controls,
                better reporting, and a simplified technology landscape.
              </p>
              <p className={styles.pageSubtitleSecondary}>
                By replacing multiple legacy systems and aligning ways of working across the business, Project
                Elevate will help Seplat build a stronger operational foundation for the future. Organisational
                change management is embedded into the programme so that people readiness develops alongside
                technical delivery, helping to protect business continuity and support successful adoption.
              </p>
              <div className={styles.heroActions}>
                <button type="button" className={styles.primaryCta} onClick={() => scrollToSection('phases')}>
                  View programme phases
                </button>
                <button type="button" className={styles.secondaryCta} onClick={() => scrollToSection('milestones')}>
                  Jump to milestones
                </button>
              </div>
            </div>

            <div className={styles.heroAside}>
              <div className={styles.todayBadge}>
                <span className={styles.todayDot} />
                <span className={styles.todayText}>{formatCurrentPeriod()}</span>
              </div>
              <div className={styles.heroAsideLogo}>
                <img src={sapLogo} alt="SAP S/4HANA" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className={styles.overviewBand}>
        <div className={styles.overviewLead}>
          <span className={styles.overviewLabel}>Where the programme stands</span>
          {/* <span className={styles.overviewPhasePill}>{currentRoadmapPhase.label}</span> */}
          <div className={styles.overviewBigValue}>{currentRoadmapPhase.label}</div>
          <p className={styles.overviewLeadText}>
            The programme is currently in {currentRoadmapPhase.label.toLowerCase()} and is working towards{' '}
            {nextRoadmapPhase ? `${nextRoadmapPhase.label} as the next major phase transition.` : 'the final delivery transition.'}
          </p>
          <br></br>
          <div className={styles.overviewDivider} />
          <span className={styles.overviewMetaLabel}>Next key date</span>
          <strong className={styles.overviewMetaValue}>{nextMilestone.date}</strong>
          <span className={styles.overviewMetaText}>{nextMilestone.phase}</span>
        </div>
        <div className={styles.overviewBandGallery}>
          {renderGalleryCard(overviewGalleryItem, 'Programme visual')}
        </div>
      </section>

      <section className={styles.scopeSection} ref={scopeRef}>
        <div className={styles.scopeGrid}>
          <div className={styles.scopeCard}>
            <div className={styles.sectionEyebrow}>Vision and objectives</div>
            <h2 className={styles.sectionTitle}>Why This Matters</h2>
            <p className={styles.sectionIntro}>
              Seplat currently operates across multiple legacy platforms, including SAP ECC, Infor Sun Systems
              Cloud, and Enterprise Asset Management. This has contributed to fragmented technology, inconsistent
              processes, limited automation, and duplicated data across parts of the organisation.
            </p>
            <p className={styles.scopeBody}>
              Project Elevate is designed to address these challenges by creating a single digital core across the
              businesses in scope. The expected outcome is a more unified environment with standard processes,
              more system driven execution, improved operational efficiency, and lower support complexity over time.
            </p>
            <div className={styles.businessesWrap}>
              <div className={styles.scopeMetaLabel}>Businesses in scope</div>
              <div className={styles.businessTags}>
                {businesses.map((business, index) => (
                  <span key={index} className={styles.businessTag}>{business}</span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.coverageCard}>
            <div className={styles.sectionEyebrow}>Programme structure</div>
            <div className={styles.coverageHeader}>
              <h2 className={styles.sectionTitle}>Programme Governance</h2>
              <p className={styles.coverageIntro}>Click a role to see what it covers in the programme.</p>
            </div>

            {activeGovNode === null ? (
              /* ── Grid view ── */
              <div className={styles.govGrid}>
                {governanceNodes.map((node) => (
                  <button
                    key={node.key}
                    type="button"
                    className={[styles.govNode, styles[`govNode_${node.color}`]].join(' ')}
                    onClick={() => setActiveGovNode(node.key)}
                  >
                    <div className={styles.govNodeRole}>{node.role}</div>
                    <div className={styles.govNodeTitle}>{node.title}</div>
                  </button>
                ))}
              </div>
            ) : (
              /* ── Master-detail view ── */
              <div className={styles.govDetail}>
                <div className={styles.govDetailSidebar}>
                  {governanceNodes.map((node) => {
                    const isActive = activeGovNode === node.key;
                    return (
                      <button
                        key={node.key}
                        type="button"
                        className={[
                          styles.govSidebarBtn,
                          styles[`govSidebarBtn_${node.color}`],
                          isActive ? styles.govSidebarBtnActive : ''
                        ].filter(Boolean).join(' ')}
                        onClick={() => setActiveGovNode(node.key)}
                      >
                        <span className={styles.govSidebarBtnAccent} />
                        <span className={styles.govSidebarBtnLabel}>{node.title}</span>
                        {isActive && (
                          <span className={styles.govSidebarBtnArrow} aria-hidden="true">›</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className={styles.govDetailPanel}>
                  {(() => {
                    const node = governanceNodes.find((n) => n.key === activeGovNode)!;
                    return (
                      <>
                        <div className={styles.govDetailPanelTop}>
                          <div>
                            <span className={styles.govDetailEyebrow}>{node.role}</span>
                            <h3 className={styles.govDetailTitle}>{node.title}</h3>
                          </div>
                          <button
                            type="button"
                            className={styles.govDetailClose}
                            onClick={() => setActiveGovNode(null)}
                            aria-label="Close and return to grid"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                            </svg>
                          </button>
                        </div>
                        <div className={styles.govDetailDivider} />
                        <p className={styles.govDetailText}>{node.detail}</p>
                        <p className={styles.govDetailPlaceholder}>
                          Additional content for this governance area will be added here.
                        </p>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>


      <section className={styles.phasesSection} ref={phasesRef}>
        <div className={styles.sectionEyebrow}>SAP Activate methodology</div>
        <h2 className={styles.sectionTitle}>Programme Phases</h2>
        <p className={styles.sectionIntro}>
          The roadmap below mirrors the programme visual and shows the delivery path from prepare through run,
          including the implementation period, hypercare, the current design stage, and the major learning and
          adoption touchpoints around go live.
        </p>

        <div className={styles.phaseRoadmapLayout}>
          {/* <aside className={styles.phaseStateCard}>
            <div className={styles.phaseStateLabel}>Current state</div>
            <div className={styles.phaseStateValue}>Design</div>
            <div className={styles.phaseStateDate}>March 2026</div>
            <p className={styles.phaseStateText}>
              The roadmap is currently in the design stage and is progressing towards{' '}
              {nextRoadmapPhase ? `${nextRoadmapPhase.label} in ${nextRoadmapPhase.date}.` : 'the next delivery stage.'}
            </p>
          </aside> */}

          <div className={styles.phaseRoadmapCard}>
            <div className={styles.phaseSpanRow} aria-hidden="true">
              <div className={`${styles.phaseSpan} ${styles.phaseSpanImplementation}`}>
                14 month implementation period
              </div>
              <div className={`${styles.phaseSpan} ${styles.phaseSpanHypercare}`}>3 months hypercare</div>
            </div>

            <div className={styles.phaseRoadmapShell}>
              <div className={styles.phaseSegmentRow} onMouseLeave={resetRoadmapDetail}>
                {roadmapPhases.map((phase, index) => {
                  const isPast = index < currentRoadmapPhaseIndex;
                  const isCurrent = index === currentRoadmapPhaseIndex;

                  return (
                    <button
                      key={phase.key}
                      type="button"
                      className={[
                        styles.phaseSegment,
                        isPast ? styles.phaseSegmentPast : '',
                        isCurrent ? styles.phaseSegmentCurrent : ''
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onMouseEnter={() => setActiveRoadmapItem({ type: 'phase', key: phase.key })}
                      onFocus={() => setActiveRoadmapItem({ type: 'phase', key: phase.key })}
                      aria-label={`${phase.label}, ${phase.date}`}
                    >
                      <span className={styles.phaseSegmentText}>{phase.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className={styles.phaseMarkerRow}>
                {roadmapPhases.map((phase, index) => {
                  const isCurrent = index === currentRoadmapPhaseIndex;
                  const isRun = phase.key === 'run';

                  return (
                    <div key={phase.key} className={styles.phaseMarkerItem}>
                      <div className={styles.phaseMarkerStem} aria-hidden="true" />
                      <div className={styles.phaseMarkerDot} aria-hidden="true" />
                      {isCurrent && <div className={styles.phaseMarkerCurrent}>We are here</div>}
                      {isRun && <div className={styles.phaseMarkerFlag}>Go live</div>}
                      <div className={styles.phaseMarkerLabel}>{phase.label}</div>
                      <div className={styles.phaseMarkerDate}>{phase.date}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.phaseDetailCard}>
              <div className={styles.phaseDetailTop}>
                <span className={styles.phaseDetailEyebrow}>{activeRoadmapDetail.eyebrow}</span>
                <span
                  className={`${styles.phaseDetailBadge} ${activeRoadmapDetail.isGoLive ? styles.phaseDetailBadgeLive : ''
                    }`}
                >
                  {activeRoadmapDetail.badge}
                </span>
              </div>
              <div className={styles.phaseDetailTitle}>{activeRoadmapDetail.title}</div>
              <div className={styles.phaseDetailDate}>{activeRoadmapDetail.date}</div>
              <p className={styles.phaseDetailText}>{activeRoadmapDetail.detail}</p>
            </div>

            <div className={styles.phaseTouchpoints} onMouseLeave={resetRoadmapDetail}>
              {roadmapTouchpoints.map((touchpoint) => (
                <button
                  key={touchpoint.key}
                  type="button"
                  className={styles.phaseTouchpoint}
                  onMouseEnter={() => setActiveRoadmapItem({ type: 'touchpoint', key: touchpoint.key })}
                  onFocus={() => setActiveRoadmapItem({ type: 'touchpoint', key: touchpoint.key })}
                  aria-label={`${touchpoint.label}, ${touchpoint.date}`}
                >
                  <span
                    className={`${styles.phaseTouchpointBadge} ${touchpoint.key === 'go-live' ? styles.phaseTouchpointBadgeLive : ''
                      }`}
                  >
                    {touchpoint.badge}
                  </span>
                  <span className={styles.phaseTouchpointBody}>
                    <span className={styles.phaseTouchpointLabel}>{touchpoint.label}</span>
                    <span className={styles.phaseTouchpointDate}>{touchpoint.date}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.milestonesSection} ref={milestonesRef}>
        <div className={styles.sectionEyebrow}>Delivery timeline</div>
        <h2 className={styles.sectionTitle}>Key Milestones</h2>

        <div className={styles.milestoneTableWrap}>
          <table className={styles.milestoneTable}>
            <thead>
              <tr>
                <th>Phase / Activity</th>
                <th>Start date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {milestones.map((milestone, index) => {
                const status = getMilestoneStatus(index);

                return (
                  <tr
                    key={`${milestone.phase}-${index}`}
                    className={
                      status === 'current'
                        ? styles.rowCurrent
                        : status === 'past'
                          ? styles.rowPast
                          : ''
                    }
                  >
                    <td className={styles.milestonePhase}>
                      <span className={styles.milestonePhaseInner}>
                        {milestone.phase === 'Go live' && <span className={styles.goLiveFlag}>★</span>}
                        <span>{milestone.phase}</span>
                      </span>
                    </td>
                    <td className={styles.milestoneDate}>{milestone.date}</td>
                    <td>
                      <span className={`${styles.statusPill} ${styles[`status_${status}`]}`}>
                        {status === 'past' ? 'Complete' : status === 'current' ? 'Ongoing' : 'Upcoming'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>



      <section className={styles.peopleSection} ref={peopleRef}>
        <div className={styles.peopleIntro}>
          <div>
            <div className={styles.sectionEyebrow}>Stakeholder landscape</div>
            <h2 className={styles.sectionTitle}>Who is Impacted</h2>
            <p className={styles.sectionIntro}>
              Stakeholders are grouped into teams that are directly impacted by process and system change, and teams
              that are not directly impacted but still require visibility, awareness, and readiness information.
            </p>
          </div>
        </div>

        {/* Full-width stakeholder map */}
        <div className={styles.stakeholderMapFull}>
          {renderGalleryCard(stakeholderMapGalleryItem, 'Stakeholder map')}
        </div>

        <div className={styles.activitiesCard}>
          <div className={styles.activitiesCardHead}>
            <div>
              <div className={styles.sectionEyebrow}>Communications Calendar</div>
              <h2 className={styles.sectionTitle}>Upcoming Activities</h2>
            </div>
            <div className={styles.activitiesHeadTag}>{totalPlannedActivities} planned activities</div>
          </div>

          <div className={styles.activityMonthGroups}>
            {upcomingActivities.map((group) => (
              <div key={group.month} className={styles.activityMonthGroup}>
                <div className={styles.activityMonthTop}>
                  <div className={styles.activityMonthHeader}>{group.month}</div>
                </div>
                <div className={styles.activityTagList}>
                  {group.activities.map((activity) => (
                    <span key={activity} className={styles.activityTag}>{activity}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeGalleryItem && (
        <div
          className={styles.galleryModal}
          role="dialog"
          aria-modal="true"
          aria-label={activeGalleryItem.title}
        >
          <div className={styles.galleryBackdrop} onClick={closeGallery} />

          <div className={styles.galleryPanel}>
            <div className={styles.galleryToolbar}>
              <div className={styles.galleryToolbarText}>
                <strong className={styles.galleryToolbarTitle}>{activeGalleryItem.title}</strong>
              </div>

              <button
                type="button"
                className={styles.galleryClose}
                onClick={closeGallery}
                aria-label="Close gallery"
              >
                ×
              </button>
            </div>

            <div className={styles.galleryStage}>
              <img
                src={activeGalleryItem.imageUrl}
                alt={activeGalleryItem.alt}
                className={styles.galleryStageImage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgrammeOverview;