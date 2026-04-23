import * as React from "react";
import styles from "./Faqs.module.scss";
import helpImage from '../../assets/helps.png';


type TAudience = "Everyone" | "Directly impacted" | "Not directly impacted";

interface IFaqsProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
}
interface IFaqItem {
  id: string;
  audience: TAudience;
  topic: string;
  question: string;
  answer: string;
  relatedResources?: string[];
}

interface IPageSection {
  id: string;
  label: string;
  level: 1 | 2 | 3 | 4;
  showInRail?: boolean;
}

interface IAudienceSummary {
  title: TAudience;
  shortLabel: string;
  description: string;
}

const FAQS: IFaqItem[] = [
  {
    id: "everyone-1",
    audience: "Everyone",
    topic: "Programme basics",
    question: "What is Project Elevate?",
    answer:
      "Project Elevate is Seplat's enterprise-wide transformation programme to move key parts of the business onto a single SAP S/4 HANA Private Cloud Edition platform. The programme will help replace fragmented legacy systems with one integrated digital core that supports more standardised processes, stronger controls, and more consistent reporting across the businesses in scope.",
  },
  {
    id: "everyone-2",
    audience: "Everyone",
    topic: "Programme basics",
    question: "Why is Seplat implementing SAP S/4 HANA?",
    answer:
      "Project Elevate is moving Seplat from multiple legacy systems, including SAP ECC, Infor Sun Systems Cloud, and Enterprise Asset Management, to a single SAP S/4 HANA Private Cloud Edition platform. This will help unify operations across the businesses in scope, reduce fragmentation, improve automation, strengthen controls, and support better reporting and decision making. Once SAP S/4 HANA goes live, the old systems will no longer be the main platform for the in-scope processes.",
  },
  {
    id: "everyone-3",
    audience: "Everyone",
    topic: "Programme basics",
    question: "What is SAP?",
    answer:
      "SAP is a leading provider of enterprise software used by organisations around the world to manage business processes in one integrated environment.",
    relatedResources: ["What is SAP?"],
  },
  {
    id: "everyone-4",
    audience: "Everyone",
    topic: "Programme basics",
    question: "What is ERP?",
    answer:
      "ERP stands for enterprise resource planning. It is a software system that helps organisations manage core business processes, such as finance, procurement, supply chain, sales, and human resources, in one connected system with a shared source of data.",
    relatedResources: ["What is ERP?"],
  },
  {
    id: "everyone-5",
    audience: "Everyone",
    topic: "Programme basics",
    question: "What is SAP S/4 HANA Private Cloud Edition?",
    answer:
      "SAP S/4 HANA Private Cloud Edition is SAP's enterprise resource planning solution for organisations that want the benefits of cloud deployment together with broad business process coverage and greater flexibility. It provides a single platform to run core business operations across multiple functions.",
    relatedResources: ["SAP S/4 HANA Cloud Private Edition"],
  },
  {
    id: "everyone-6",
    audience: "Everyone",
    topic: "Programme basics",
    question: "Who is delivering Project Elevate?",
    answer:
      "Project Elevate is being delivered by Seplat in partnership with EY. EY is the system integrator working with Seplat to implement SAP. This means EY is supporting the design, configuration, testing, and deployment of the SAP solution, while working closely with Seplat teams to prepare the business for go live and adoption.",
  },
  {
    id: "everyone-7",
    audience: "Everyone",
    topic: "Programme basics",
    question: "What does a system integrator do?",
    answer:
      "A system integrator helps translate business requirements into a working system solution. In Project Elevate, EY is supporting Seplat to design processes, configure SAP, support testing, prepare for data migration, enable training, and help the business move successfully into the new environment.",
  },
  {
    id: "everyone-8",
    audience: "Everyone",
    topic: "Scope & value",
    question: "Which businesses are in scope?",
    answer:
      "The businesses currently in scope are:\n\n- Seplat East Ltd\n- Seplat West Ltd\n- Seplat Energy UK Ltd\n- Seplat Energy Producing Nigeria Unlimited, SEPNU",
  },
  {
    id: "everyone-9",
    audience: "Everyone",
    topic: "Scope & value",
    question: "Which process areas are in scope?",
    answer:
      "The main process areas currently in scope include:\n\n- Finance and controlling\n- Governance, risk and controls\n- Supply chain and procurement\n- Projects\n- Maintenance\n- Data, reporting and analytics",
  },
  {
    id: "everyone-10",
    audience: "Everyone",
    topic: "Scope & value",
    question: "Why does Project Elevate matter?",
    answer:
      "Project Elevate matters because it will help Seplat move to a more connected and consistent way of working. For directly impacted teams, this may mean changes to transactions, approvals, reporting, system access, and day to day processes. For the wider organisation, it is expected to support stronger controls, better visibility, and more consistent information across the business.",
  },
  {
    id: "everyone-11",
    audience: "Everyone",
    topic: "Delivery approach",
    question: "What methodology is being used to deliver Project Elevate?",
    answer:
      "Project Elevate is being delivered using SAP Activate. SAP Activate is SAP's implementation methodology for SAP S/4 HANA programmes. It provides a structured approach with clear phases, defined activities, and delivery checkpoints to support implementation from planning through go live and stabilisation.",
    relatedResources: ["What is SAP Activate?"],
  },
  {
    id: "everyone-12",
    audience: "Everyone",
    topic: "Delivery approach",
    question: "What are the phases of Project Elevate?",
    answer:
      "Project Elevate follows six SAP Activate phases:\n\n- Discover\n- Prepare\n- Explore\n- Realise\n- Deploy\n- Run",
  },
  {
    id: "everyone-13",
    audience: "Everyone",
    topic: "Delivery approach",
    question: "What happens during each phase?",
    answer:
      "The phases help structure the programme from planning through go live and post go live support.\n\n- Discover: This is where the overall direction is shaped. The focus is on understanding the business need, confirming the high-level scope, and aligning on what the programme is expected to achieve.\n- Prepare: This is where the project is mobilised. Teams are aligned, governance is set up, stakeholders are identified, delivery planning is completed, and the foundations for communications, change support, and project execution are put in place.\n- Explore: This is where detailed design discussions take place. The team works through fit to standard workshops, reviews business requirements, confirms future state processes, and identifies where changes will affect roles, teams, and ways of working.\n- Realise: This is where the solution is built and prepared for use. Activities include system configuration, data migration preparation, testing support, role mapping, training preparation, and readiness tracking.\n- Deploy: This is where the business gets ready to move into the live environment. Activities usually include final testing, end user training, cutover preparation, go live readiness checks, and communications to support launch.\n- Run: This phase begins after go live. The focus is on support, issue resolution, user adoption, hypercare, and transition into business-as-usual ownership.",
    relatedResources: ["SAP Activate methodology"],
  },
  {
    id: "everyone-14",
    audience: "Everyone",
    topic: "Timeline & milestones",
    question: "What is the timeline for Project Elevate?",
    answer:
      "Project Elevate is planned to run from January 2026 to May 2027. Go live is planned for 28th February 2027, followed by post go live hypercare from March 2027 to May 2027.",
  },
  {
    id: "everyone-15",
    audience: "Everyone",
    topic: "Timeline & milestones",
    question: "How long will the programme run for?",
    answer:
      "The programme is planned over a 14-month implementation period to go live, followed by 3 months of post go live hypercare to support stabilisation.",
  },
  {
    id: "everyone-16",
    audience: "Everyone",
    topic: "Timeline & milestones",
    question: "What are some of the key milestones?",
    answer:
      "Some of the key milestones currently planned include:\n\n- Prepare: 19th January 2026\n- Design: 9th March 2026\n- Build: 18th May 2026\n- Functional testing: 3rd August 2026\n- SIT: 5th October 2026\n- TTT: 26th October 2026\n- UAT: 10th November 2026\n- EUT: 11th January 2027\n- Business process design: 9th March to 22nd May 2026\n- Go live: 28th February 2027",
  },
  {
    id: "everyone-17",
    audience: "Everyone",
    topic: "Solution & change",
    question: "Will historical data still be available?",
    answer:
      "Seplat leadership will determine the age and scope of historical data to be migrated into SAP S/4 HANA. Historical data that is not migrated will be retained in a secure repository for reference purposes.",
  },
  {
    id: "everyone-18",
    audience: "Everyone",
    topic: "Solution & change",
    question: "Will the system be customised?",
    answer:
      "The preferred approach is to stay as close as possible to SAP standard. Customisation will only be considered where there is a strong business justification and the required approvals have been obtained.",
  },
  {
    id: "everyone-19",
    audience: "Everyone",
    topic: "Solution & change",
    question: "Will knowledge from the legacy systems still matter?",
    answer:
      "Yes. Legacy system knowledge still matters because it helps provide business context, identify current pain points, and support transition planning. At the same time, the future design will aim to align more closely with SAP standard processes rather than reproducing every legacy way of working.",
  },
  {
    id: "everyone-20",
    audience: "Everyone",
    topic: "Solution & change",
    question: "Does the new Seplat organogram affect the implementation?",
    answer:
      "The new organogram does not change the direction of the SAP implementation. It mainly supports stakeholder identification, role mapping, and clarity on who needs to be engaged during delivery.",
  },
  {
    id: "everyone-21",
    audience: "Everyone",
    topic: "Solution & change",
    question: "What should colleagues expect as the programme progresses?",
    answer:
      "As the programme moves forward, colleagues can expect awareness activities, engagement sessions, surveys, process walkthroughs, training activities, and regular updates. These activities are intended to build understanding, support readiness, and help teams transition into the new environment.",
  },
  {
    id: "everyone-22",
    audience: "Everyone",
    topic: "Support network",
    question: "Where can I go for more information or support?",
    answer:
      "If you need more information about Project Elevate, please visit the Contact Information page to find the relevant Super Users, SMEs, and Data Agents for your function.\n\nYou can also visit the S/4 HANA floor on the 4th floor of Seplat House, Yellow Wing for support.\n\nIf you would prefer to send a question or comment online, please use the Ask a Question function on the SharePoint site.",
  },
  {
    id: "everyone-23",
    audience: "Everyone",
    topic: "Support network",
    question: "Who are the Super Users, SMEs, and Data Agents?",
    answer:
      "Super Users, SMEs, and Data Agents are business representatives identified across the directly impacted departments to support Project Elevate.\n\nAn SME, or Subject Matter Expert, provides detailed knowledge of current processes, controls, policies, and day-to-day activities. SMEs help the project team understand how work is done today and support the design of how it should work in SAP S/4 HANA.\n\nA Super User is a department representative with a stronger understanding of the future SAP S/4 HANA processes and system changes. Super Users help support testing, training, adoption, and go live readiness within their teams.\n\nA Data Agent supports data related activities within the department. This includes helping with data preparation, review, cleansing, validation, and other activities needed to support the move into SAP S/4 HANA.\n\nTogether, these roles help connect the project team with the business and support each department through the transition.",
  },
  {
    id: "everyone-24",
    audience: "Everyone",
    topic: "Support network",
    question:
      "How do Super Users, SMEs, and Data Agents support my department?",
    answer:
      "Super Users, SMEs, and Data Agents have been identified across the directly impacted departments, including Finance, Supply Chain and Procurement, Maintenance, and Projects, to provide department level support throughout Project Elevate.\n\nThey support key project activities such as business engagement, process validation, testing, training, data readiness, and go live preparation.\n\nThey are also the first level of support within their departments. If colleagues have questions about what is changing, what they need to do, how a process will work, or where to get help, they should first reach out to their department's Super User, SME, or Data Agent.\n\nFor more information on who these representatives are in your department, please visit the Change Network tab on the SharePoint site, send an email to Project.elevate@seplatenergy.com, use the Ask a Question function on the SharePoint site, or visit the S/4 HANA floor on the 4th floor of Seplat House, Yellow Wing.",
  },
  {
    id: "direct-1",
    audience: "Directly impacted",
    topic: "Direct impact",
    question: "How do I know if I am directly impacted?",
    answer:
      "You are likely directly impacted if you work in Finance, Supply Chain and Procurement, Maintenance, or Projects.",
  },
  {
    id: "direct-2",
    audience: "Directly impacted",
    topic: "Direct impact",
    question: "What does being directly impacted mean for me?",
    answer:
      "It means your day-to-day work, system interactions, approvals, controls, reporting, or process steps may change as Project Elevate is implemented. You may also be asked to participate in workshops, walkthroughs, testing, training, or readiness activities.",
  },
  {
    id: "direct-3",
    audience: "Directly impacted",
    topic: "Direct impact",
    question: "What types of changes should I expect?",
    answer:
      "You may see new or standardised process steps, different system transactions, updated approval flows, stronger controls, clearer roles and responsibilities, and a complete reliance on SAP as the system of record.",
  },
  {
    id: "direct-4",
    audience: "Directly impacted",
    topic: "Direct impact",
    question: "When will directly impacted teams be engaged?",
    answer:
      "Directly impacted teams will be engaged throughout the programme, especially during Explore and Realise when process walkthroughs, change impact validation, role mapping, training preparation, and readiness activities take place.",
  },
  {
    id: "direct-5",
    audience: "Directly impacted",
    topic: "Direct impact",
    question: "Will I receive training before go live?",
    answer:
      "Yes. Training is planned for different user groups, including SMEs, Super Users, business end users, and business leaders. End User Training is currently planned for January 2027, ahead of go live.",
  },
  {
    id: "direct-6",
    audience: "Directly impacted",
    topic: "Direct impact",
    question: "Will my SAP access or role change?",
    answer:
      "Potentially, yes. Role mapping is part of the programme and is intended to align SAP business roles to Seplat job roles so that users have the right access for their responsibilities in the new environment.",
  },
  {
    id: "direct-7",
    audience: "Directly impacted",
    topic: "Direct impact",
    question: "What will be expected from me as a directly impacted colleague?",
    answer:
      "Depending on your role, you may be asked to:\n\n- Join design sessions\n- Validate process changes\n- Support testing\n- Attend training\n- Raise issues early\n- Adopt the new process and system ways of working once they go live",
  },
  {
    id: "direct-8",
    audience: "Directly impacted",
    topic: "Direct impact",
    question: "What support will be available at go live?",
    answer:
      "Go live support will include a tiered help model, departmental Super Users, SAP functional consultants, and structured hypercare support to help resolve issues and reinforce adoption after launch.",
  },
  {
    id: "direct-9",
    audience: "Directly impacted",
    topic: "Direct impact",
    question: "What should I do if I identify a process issue or risk?",
    answer:
      "You should raise it through the agreed project channels as early as possible. Early escalation helps the programme review, track, and address issues before go live.",
  },
  {
    id: "direct-10",
    audience: "Directly impacted",
    topic: "Direct impact",
    question:
      "Why am I being asked to attend workshops, surveys, or walkthroughs?",
    answer:
      "These activities help the programme confirm what is changing, identify impacts, validate future state processes, assess readiness, and make sure the solution works in the context of Seplat's business operations.",
  },
  {
    id: "direct-11",
    audience: "Directly impacted",
    topic: "Direct impact",
    question: "Where can I go if I need help or have questions?",
    answer:
      "For more information on who these representatives are in your department, please visit the Change Network tab on the SharePoint site, send an email to Project.elevate@seplatenergy.com, use the Ask a Question function on the SharePoint site, or visit the S/4 HANA floor on the 4th floor of Seplat House, Yellow Wing.",
  },
  {
    id: "indirect-1",
    audience: "Not directly impacted",
    topic: "Wider awareness",
    question: "What does not directly impacted mean?",
    answer:
      "It means your function is not currently expected to experience major day to day process or system changes in the same way as the directly impacted business departments. However, you may still need awareness of the programme and may interact with the new environment indirectly.",
  },
  {
    id: "indirect-2",
    audience: "Not directly impacted",
    topic: "Wider awareness",
    question:
      "If I am not directly impacted, why am I still hearing about Project Elevate?",
    answer:
      "Project Elevate is an enterprise wide transformation programme, so it is important for colleagues across the organisation to understand what it is, why it matters, and how it supports Seplat's future way of working.",
  },
  {
    id: "indirect-3",
    audience: "Not directly impacted",
    topic: "Wider awareness",
    question: "Will my work change immediately?",
    answer:
      "In most cases, not directly impacted colleagues should not expect major immediate changes to their daily work. However, some teams may experience indirect effects over time, especially where reporting, governance, information access, or business interactions connect with the new platform.",
  },
  {
    id: "indirect-4",
    audience: "Not directly impacted",
    topic: "Wider awareness",
    question: "Do I need to attend training?",
    answer:
      "Not necessarily. Training will be prioritised for directly impacted users and roles. If any awareness sessions, briefings, or optional learning activities are relevant to your team, those will be communicated in advance.",
  },
  {
    id: "indirect-5",
    audience: "Not directly impacted",
    topic: "Wider awareness",
    question: "Will I still receive updates?",
    answer:
      "Yes. Not directly impacted stakeholders will continue to receive project communications, newsletters, awareness materials, and leadership updates so they stay informed on progress and key milestones.",
  },
  {
    id: "indirect-6",
    audience: "Not directly impacted",
    topic: "Wider awareness",
    question: "Could my team become directly impacted later?",
    answer:
      "It is possible that the level of impact could change as the programme progresses and more detailed design decisions are made. If this happens, the relevant teams will be engaged and informed through the project communication and stakeholder management process.",
  },
  {
    id: "indirect-7",
    audience: "Not directly impacted",
    topic: "Wider awareness",
    question: "Is there anything I need to do now?",
    answer:
      "For now, the main expectation is to stay informed, read project updates, attend any relevant awareness sessions, and understand how the programme supports Seplat's long term direction.",
  },
  {
    id: "indirect-8",
    audience: "Not directly impacted",
    topic: "Wider awareness",
    question:
      "Will there still be benefits for teams that are not directly impacted?",
    answer:
      "Yes. Even where teams are not directly impacted day to day, the programme is expected to support improved reporting, stronger controls, more consistent information, and better cross functional alignment across the wider organisation.",
  },
  {
    id: "indirect-9",
    audience: "Not directly impacted",
    topic: "Wider awareness",
    question: "Where can I go if I want to know more?",
    answer:
      "For more information on who these representatives are in your department, please visit the Change Network tab on the SharePoint site, send an email to Project.elevate@seplatenergy.com, use the Ask a Question function on the SharePoint site, or visit the S/4 HANA floor on the 4th floor of Seplat House, Yellow Wing.",
  },
];

const AUDIENCE_SUMMARIES: IAudienceSummary[] = [
  {
    title: "Everyone",
    shortLabel: "General FAQs",
    description:
      "Core programme, platform, timeline, milestones, and support questions for all colleagues.",
  },
  {
    title: "Directly impacted",
    shortLabel: "Directly impacted",
    description:
      "Questions focused on role changes, training, engagement, process impact, and go live support.",
  },
  {
    title: "Not directly impacted",
    shortLabel: "Not directly impacted",
    description:
      "Awareness, communications, indirect effects, and what wider teams should expect.",
  },
];

const PAGE_SECTIONS: IPageSection[] = [
  { id: "hero", label: "Intro", level: 1 },
  { id: "browse", label: "Browse", level: 2 },
  { id: "audiences", label: "Audience guide", level: 2 },
  { id: "results", label: "Results", level: 2 },
  { id: "support", label: "Support", level: 2 },
];

const Faqs: React.FC<IFaqsProps> = ({ onBack, onNavigate }) => {

  const [activeAudience, setActiveAudience] = React.useState<
    "All audiences" | TAudience
  >("All audiences");
  const [activeTopic, setActiveTopic] = React.useState<string>("All topics");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [openId, setOpenId] = React.useState<string | null>(FAQS[0].id);
  const [activeSectionId, setActiveSectionId] = React.useState<string>("hero");

  const heroRef = React.useRef<HTMLElement | null>(null);
  const browseRef = React.useRef<HTMLElement | null>(null);
  const audiencesRef = React.useRef<HTMLElement | null>(null);
  const resultsRef = React.useRef<HTMLElement | null>(null);
  const supportRef = React.useRef<HTMLElement | null>(null);

  const railSections = React.useMemo(
    () =>
      PAGE_SECTIONS.filter(
        (section) => section.showInRail !== false && section.level <= 2
      ),
    []
  );

  const sectionRefs = React.useMemo<
    Record<string, React.RefObject<HTMLElement | null>>
  >(
    () => ({
      hero: heroRef,
      browse: browseRef,
      audiences: audiencesRef,
      results: resultsRef,
      support: supportRef,
    }),
    []
  );

  const audienceOptions = React.useMemo(
    () => ["All audiences", ...AUDIENCE_SUMMARIES.map((item) => item.title)],
    []
  );
  const topicOptions = React.useMemo(
    () => [
      "All topics",
      ...Array.from(new Set(FAQS.map((item) => item.topic))),
    ],
    []
  );

  const audienceCounts = React.useMemo(() => {
    const counts = new Map<TAudience, number>();
    FAQS.forEach((faq) =>
      counts.set(faq.audience, (counts.get(faq.audience) ?? 0) + 1)
    );
    return counts;
  }, []);

  const filteredFaqs = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return FAQS.filter((faq) => {
      const matchesAudience =
        activeAudience === "All audiences" || faq.audience === activeAudience;
      const matchesTopic =
        activeTopic === "All topics" || faq.topic === activeTopic;
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.topic.toLowerCase().includes(q) ||
        faq.audience.toLowerCase().includes(q);

      return matchesAudience && matchesTopic && matchesSearch;
    });
  }, [activeAudience, activeTopic, searchQuery]);

  const groupedFaqs = React.useMemo(() => {
    return AUDIENCE_SUMMARIES.map((summary) => ({
      audience: summary.title,
      items: filteredFaqs.filter((faq) => faq.audience === summary.title),
    })).filter((group) => group.items.length > 0);
  }, [filteredFaqs]);

  const scrollToSection = (sectionId: string): void => {
    sectionRefs[sectionId]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggle = (id: string): void => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const renderAnswer = (answer: string): React.ReactNode => {
    return answer.split("\n\n").map((block, index) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const isBulletList =
        lines.length > 0 && lines.every((line) => line.startsWith("- "));

      if (isBulletList) {
        return (
          <ul key={index} className={styles.faqBulletList}>
            {lines.map((line) => (
              <li key={line}>{line.replace(/^- /, "")}</li>
            ))}
          </ul>
        );
      }

      return (
        <p key={index} className={styles.faqAnswerBlock}>
          {lines.join(" ")}
        </p>
      );
    });
  };

  React.useEffect(() => {
    if (openId && filteredFaqs.some((faq) => faq.id === openId)) {
      return;
    }

    setOpenId(filteredFaqs.length ? filteredFaqs[0].id : null);
  }, [filteredFaqs, openId]);

  React.useEffect(() => {
    const observed = PAGE_SECTIONS.map((section) => ({
      id: section.id,
      element: sectionRefs[section.id]?.current,
    })).filter(
      (item): item is { id: string; element: HTMLElement } =>
        item.element instanceof HTMLElement
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveSectionId(visible.target.dataset.sectionId || "hero");
        }
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0.2, 0.45, 0.7],
      }
    );

    observed.forEach(({ id, element }) => {
      element.dataset.sectionId = id;
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionRefs]);

  return (
    <div className={styles.page}>
      <div className={styles.progressRail} aria-label="FAQ page progress">
        {railSections.map((section) => {
          const isActive = activeSectionId === section.id;

          return (
            <button
              key={section.id}
              type="button"
              className={`${styles.progressDot} ${isActive ? styles.progressDotActive : ""
                }`}
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
              <p className={styles.pageEyebrow}>FAQs & Support</p>
              <h1 className={styles.pageTitle}>Frequently asked questions</h1>
              <p className={styles.pageSubtitle}>
                Explore the full FAQ manual across general programme questions,
                directly impacted colleagues, and not directly impacted
                colleagues, with support routes built into the page.
              </p>
            </div>

            {/* <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>{FAQS.length}</div>
                <div className={styles.heroStatLabel}>Questions in manual</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>{AUDIENCE_SUMMARIES.length}</div>
                <div className={styles.heroStatLabel}>Audience groups</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>4</div>
                <div className={styles.heroStatLabel}>Support routes</div>
              </div>
            </div> */}
          </div>
        </section>
      </div>

      <section className={styles.searchSection} ref={browseRef}>
        <div className={styles.sectionIntroBlock}>
          <h2 className={styles.sectionTitle}>
            Browse by audience, topic, or search
          </h2>
          <p className={styles.sectionText}>
            The manual is broader than the current page, so the filters now
            cover audience and topic, not just a small set of generic
            categories.
          </p>
        </div>

        <div className={styles.searchWrap}>
          <span className={styles.searchIcon} aria-hidden="true">
            ⌕
          </span>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search questions, answers, support routes, or terminology"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search FAQs"
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.searchClear}
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className={styles.filterBlock}>
          <div className={styles.filterLabel}>Audience</div>
          <div
            className={styles.tabStrip}
            role="tablist"
            aria-label="FAQ audience"
          >
            {audienceOptions.map((audience) => (
              <button
                key={audience}
                type="button"
                role="tab"
                aria-selected={activeAudience === audience}
                className={`${styles.tab} ${activeAudience === audience ? styles.tabActive : ""
                  }`}
                onClick={() =>
                  setActiveAudience(audience as "All audiences" | TAudience)
                }
              >
                <span>{audience}</span>
                {audience !== "All audiences" && (
                  <span className={styles.tabCount}>
                    {audienceCounts.get(audience as TAudience) ?? 0}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterBlock}>
          <div className={styles.filterLabel}>Topic</div>
          <div
            className={styles.tabStrip}
            role="tablist"
            aria-label="FAQ topic"
          >
            {topicOptions.map((topic) => (
              <button
                key={topic}
                type="button"
                role="tab"
                aria-selected={activeTopic === topic}
                className={`${styles.tab} ${activeTopic === topic ? styles.tabActive : ""
                  }`}
                onClick={() => setActiveTopic(topic)}
              >
                <span>{topic}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* <section className={styles.faqSummaryStrip} ref={audiencesRef}>
        {AUDIENCE_SUMMARIES.map((summary) => {
          const isActive = activeAudience === summary.title;

          return (
            <button
              key={summary.title}
              type="button"
              className={`${styles.summaryCardButton} ${isActive ? styles.summaryCardActive : ''}`}
              onClick={() => setActiveAudience(summary.title)}
              aria-pressed={isActive}
            >
              <div className={styles.summaryCard}>
                <div className={styles.summaryLabel}>{summary.shortLabel}</div>
                <div className={styles.summaryValue}>{audienceCounts.get(summary.title) ?? 0}</div>
                <div className={styles.summaryText}>{summary.description}</div>
              </div>
            </button>
          );
        })}
      </section> */}

      <section className={styles.faqBody} ref={resultsRef}>
        {filteredFaqs.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No results found</p>
            <p className={styles.emptyText}>
              Try a different audience, topic, or search term.
            </p>
          </div>
        ) : activeAudience === "All audiences" ? (
          <div className={styles.groupedFaqs}>
            {groupedFaqs.map((group) => (
              <section key={group.audience} className={styles.groupSection}>
                <div className={styles.groupHead}>
                  <h3 className={styles.groupLabel}>{group.audience}</h3>
                </div>

                <div className={styles.faqList}>
                  {group.items.map((faq) => (
                    <div
                      key={faq.id}
                      className={`${styles.faqItem} ${openId === faq.id ? styles.faqItemOpen : ""
                        }`}
                    >
                      <button
                        type="button"
                        className={styles.faqQuestion}
                        onClick={() => toggle(faq.id)}
                        aria-expanded={openId === faq.id}
                      >
                        <div className={styles.faqQuestionMain}>
                          <div className={styles.faqMeta}>
                            <span className={styles.faqAudiencePill}>
                              {faq.audience}
                            </span>
                            <span className={styles.faqTopicPill}>
                              {faq.topic}
                            </span>
                          </div>
                          <span className={styles.faqQuestionText}>
                            {faq.question}
                          </span>
                        </div>

                        <span
                          className={`${styles.faqChevron} ${openId === faq.id ? styles.faqChevronOpen : ""
                            }`}
                          aria-hidden="true"
                        >
                          <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 7.5L10 12.5L15 7.5"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>

                      <div
                        className={`${styles.faqAnswerWrap} ${openId === faq.id ? styles.faqAnswerWrapOpen : ""
                          }`}
                      >
                        <div className={styles.faqAnswer}>
                          {renderAnswer(faq.answer)}

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className={styles.faqList}>
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className={`${styles.faqItem} ${openId === faq.id ? styles.faqItemOpen : ""
                  }`}
              >
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() => toggle(faq.id)}
                  aria-expanded={openId === faq.id}
                >
                  <div className={styles.faqQuestionMain}>
                    <div className={styles.faqMeta}>
                      <span className={styles.faqAudiencePill}>
                        {faq.audience}
                      </span>
                      <span className={styles.faqTopicPill}>{faq.topic}</span>
                    </div>
                    <span className={styles.faqQuestionText}>
                      {faq.question}
                    </span>
                  </div>

                  <span
                    className={`${styles.faqChevron} ${openId === faq.id ? styles.faqChevronOpen : ""
                      }`}
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={`${styles.faqAnswerWrap} ${openId === faq.id ? styles.faqAnswerWrapOpen : ""
                    }`}
                >
                  <div className={styles.faqAnswer}>
                    {renderAnswer(faq.answer)}


                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.helpSection} ref={supportRef}>
        <div className={styles.helpImage} aria-hidden="true">
          <img src={helpImage} alt="" aria-hidden="true" />
        </div>        <div className={styles.helpContent}>
          <p className={styles.helpEyebrow}>Support routes</p>
          <h2 className={styles.helpTitle}>Need more than the FAQ?</h2>
          <p className={styles.helpText}>
            Choose the route that fits what you need. Some options take you to a
            page, some open a form, one is an in-person support location, and
            one sends an email.
          </p>

          <div className={styles.helpRoutes}>
            <a
              onClick={(e) => {
                e.preventDefault();
                onNavigate("change-network");
              }} className={`${styles.helpRouteCard} ${styles.helpRouteCardPage}`}
            >
              <div className={styles.helpRouteTop}>
                <span
                  className={`${styles.helpRouteBadge} ${styles.helpRouteBadgePage}`}
                >
                  Page
                </span>
                <span className={styles.helpRouteArrow} aria-hidden="true">
                  ↗
                </span>
              </div>
              <div className={styles.helpRouteTitle}>
                Change Network and Contact Information
              </div>
              <div className={styles.helpRouteText}>
                Find the relevant Super Users, SMEs, and Data Agents for your
                function on the site.
              </div>
              {/* <div className={styles.helpRouteMeta}>Replace with the final SharePoint page link</div> */}
              <span className={styles.helpRouteAction}>Open page</span>
            </a>

            <a
              href="https://forms.office.com/pages/responsepage.aspx?id=sl0ycr032EWhrvFpvO4PqD3MZEG3Ah1AjLVYu_vv-rZUMlpCRFc0MjNRQlhFRFRETVZMTkNPRVpPUC4u&route=shorturl"
              className={`${styles.helpRouteCard} ${styles.helpRouteCardForm}`}
            >
              <div className={styles.helpRouteTop}>
                <span
                  className={`${styles.helpRouteBadge} ${styles.helpRouteBadgeForm}`}
                >
                  Form
                </span>
                <span className={styles.helpRouteArrow} aria-hidden="true">
                  ↗
                </span>
              </div>
              <div className={styles.helpRouteTitle}>Ask a Question</div>
              <div className={styles.helpRouteText}>
                Use the site form when you want to submit a question or comment
                online.
              </div>
              {/* <div className={styles.helpRouteMeta}>Replace with the final form link</div> */}
              <span className={styles.helpRouteAction}>Open form</span>
            </a>

            <div
              className={`${styles.helpRouteCard} ${styles.helpRouteCardLocation}`}
            >
              <div className={styles.helpRouteTop}>
                <span
                  className={`${styles.helpRouteBadge} ${styles.helpRouteBadgeLocation}`}
                >
                  Location
                </span>
              </div>
              <div className={styles.helpRouteTitle}>
                S/4 HANA support floor
              </div>
              <div className={styles.helpRouteText}>
                Visit the team in person for support and guidance.
              </div>
              <div className={styles.helpRouteLocationBlock}>
                <span className={styles.helpRouteLocationLabel}>
                  Support location
                </span>
                <span className={styles.helpRouteLocationValue}>
                  4th floor, Seplat House, Yellow Wing
                </span>
              </div>
            </div>

            <a
              href="mailto:Project.elevate@seplatenergy.com"
              className={`${styles.helpRouteCard} ${styles.helpRouteCardEmail}`}
            >
              <div className={styles.helpRouteTop}>
                <span
                  className={`${styles.helpRouteBadge} ${styles.helpRouteBadgeEmail}`}
                >
                  Email
                </span>
                <span className={styles.helpRouteArrow} aria-hidden="true">
                  ↗
                </span>
              </div>
              <div className={styles.helpRouteTitle}>Project mailbox</div>
              <div className={styles.helpRouteText}>
                Send questions directly to the programme support mailbox.
              </div>
              <div className={styles.helpRouteMeta}>
                Project.elevate@seplatenergy.com
              </div>
              <span className={styles.helpRouteAction}>Send email</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faqs;
