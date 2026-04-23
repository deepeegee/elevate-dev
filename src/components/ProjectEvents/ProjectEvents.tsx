import * as React from 'react';
import styles from './ProjectEvents.module.scss';

interface IProjectEventsProps {
  onBack: () => void;
}

interface IWebinarSession {
  id: string;
  label: string;
  date: string;
  embedSrc: string;
}

interface IEventItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  hasContent: boolean;
  placeholder?: string;
}

const webinarSessions: IWebinarSession[] = [
  {
    id: 'option-1',
    label: 'Session 1',
    date: '25 March 2026',
    embedSrc: 'https://seplatenergy.sharepoint.com/sites/SEPNU-ITTeam/ProjectsandUTC/_layouts/15/embed.aspx?UniqueId=43f32c94-c45d-49e8-9487-846debc30c03&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create',
  },
  {
    id: 'option-2',
    label: 'Session 2',
    date: '25 March 2026',
    embedSrc: 'https://seplatenergy.sharepoint.com/sites/SEPNU-ITTeam/ProjectsandUTC/_layouts/15/embed.aspx?UniqueId=47565c99-3eac-4327-9a99-16a4263d4e41&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create',
  },
  {
    id: 'option-3',
    label: 'Session 3',
    date: '1 April 2026',
    embedSrc: 'https://seplatenergy.sharepoint.com/sites/SEPNU-ITTeam/ProjectsandUTC/_layouts/15/embed.aspx?UniqueId=0029423b-360b-49e0-9b69-f153b1a343e3&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create',
  },
  {
    id: 'option-4',
    label: 'Session 4',
    date: '9 April 2026',
    embedSrc: 'https://seplatenergy.sharepoint.com/sites/SEPNU-ITTeam/ProjectsandUTC/_layouts/15/embed.aspx?UniqueId=0f7de640-c1ff-4768-9f0d-e24f92ec1781&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create',
  },
];

const otherEvents: IEventItem[] = [
  {
    id: 'team-building',
    eyebrow: 'Community',
    title: 'Team Building Events',
    description: 'Photos, recordings, and highlights from project team building and community events.',
    hasContent: false,
    placeholder: 'Team building event content will be added here.',
  },
  {
    id: 'project-plan-workshop',
    eyebrow: 'Workshop',
    title: 'Project Plan Workshop',
    description: 'Video and materials from the Project Plan Workshop event.',
    hasContent: false,
    placeholder: 'Project Plan Workshop recording will be added here.',
  },
  {
    id: 'solution-design-kickoff',
    eyebrow: 'Workshop',
    title: 'Solution Design Workshop Kickoff',
    description: 'Video and materials from the Solution Design Workshop Kickoff session.',
    hasContent: false,
    placeholder: 'Solution Design Workshop Kickoff recording will be added here.',
  },
];

const ProjectEvents: React.FC<IProjectEventsProps> = ({ onBack }) => {
  const [activeWebinarId, setActiveWebinarId] = React.useState<string>('option-1');
  const [openEvents, setOpenEvents] = React.useState<Record<string, boolean>>({
    webinars: true,
    'team-building': false,
    'project-plan-workshop': false,
    'solution-design-kickoff': false,
  });

  const toggleEvent = (id: string): void => {
    setOpenEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className={styles.page}>
      <div className={styles.topShell}>

        {/* Back */}
        <div className={styles.backRow}>
          <a href="#" className={styles.backLink} onClick={(e) => { e.preventDefault(); onBack(); }}>
            <span className={styles.backIconWrap} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H15v-5h-6v5H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className={styles.backTextGroup}>
              {/* <span className={styles.backOverline}>Project Elevate</span> */}
              <span className={styles.backLabel}>Back to Home</span>
            </span>
          </a>
        </div>

        {/* Hero */}
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Project Elevate</p>
            <h1 className={styles.title}>Project Events</h1>
            <p className={styles.intro}>
              Videos, recordings, and highlights from key project events and sessions. Select an event below to watch or read more.
            </p>
            {/* <div className={styles.heroCounts}>
              <div className={styles.heroCount}>
                <span className={styles.heroCountValue}>4</span>
                <span className={styles.heroCountLabel}>Awareness sessions</span>
              </div>
              <div className={styles.heroCountDivider} />
              <div className={styles.heroCount}>
                <span className={styles.heroCountValue}>3</span>
                <span className={styles.heroCountLabel}>Upcoming events</span>
              </div>
            </div> */}
          </div>
        </header>

        {/* Events list */}
        <div className={styles.eventsList}>

          {/* General Awareness Webinars */}
          <article className={styles.eventBlock}>
            <button
              type="button"
              className={styles.eventToggle}
              onClick={() => toggleEvent('webinars')}
              aria-expanded={openEvents['webinars']}
            >
              <div className={styles.eventToggleLeft}>
                <span className={styles.eventAccent} />
                <div className={styles.eventToggleText}>
                  <span className={styles.eventEyebrow}>Awareness · 4 sessions</span>
                  <h2 className={styles.eventTitle}>General Awareness Webinars</h2>
                  <p className={styles.eventDesc}>
                    Four sessions introducing Project Elevate to the wider organisation — scope, timeline, and what the change means for each function.
                  </p>
                </div>
              </div>
              <svg
                className={`${styles.toggleChevron} ${openEvents['webinars'] ? styles.toggleChevronOpen : ''}`}
                width="18" height="18" viewBox="0 0 16 16" fill="none"
              >
                <path d="M3 5.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {openEvents['webinars'] && (
              <div className={styles.eventContent}>
                <div className={styles.webinarsLayout}>
                  <div className={styles.webinarsInfo}>
                    <p className={styles.webinarsInfoEyebrow}>Project Elevate Awareness</p>
                    <ul className={styles.webinarsMeta}>
                      <li>Covered scope, timeline, and what the change means for each function</li>
                      <li>Open Q&amp;A with the programme team</li>
                      <li>Hosted on Microsoft Teams in March and April 2026</li>
                    </ul>
                  </div>
                  <div className={styles.webinarsPlayer}>
                    <div className={styles.webinarsTabRow}>
                      {webinarSessions.map((session) => (
                        <button
                          key={session.id}
                          type="button"
                          className={`${styles.webinarTab} ${activeWebinarId === session.id ? styles.webinarTabActive : ''}`}
                          onClick={() => setActiveWebinarId(session.id)}
                        >
                          <span className={styles.webinarTabLabel}>{session.label}</span>
                          <span className={styles.webinarTabDate}>{session.date}</span>
                        </button>
                      ))}
                    </div>
                    {webinarSessions.map((session) =>
                      session.id === activeWebinarId ? (
                        <div key={session.id} className={styles.webinarsFrame}>
                          <iframe
                            src={session.embedSrc}
                            title={`Project Elevate Awareness Webinar — ${session.label}`}
                            frameBorder="0"
                            scrolling="no"
                            allowFullScreen
                            className={styles.webinarsIframe}
                          />
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            )}
          </article>

          {/* Other events */}
          {otherEvents.map((event) => (
            <article key={event.id} className={styles.eventBlock}>
              <button
                type="button"
                className={styles.eventToggle}
                onClick={() => toggleEvent(event.id)}
                aria-expanded={openEvents[event.id]}
              >
                <div className={styles.eventToggleLeft}>
                  <span className={styles.eventAccent} />
                  <div className={styles.eventToggleText}>
                    <span className={styles.eventEyebrow}>{event.eyebrow}</span>
                    <h2 className={styles.eventTitle}>{event.title}</h2>
                    <p className={styles.eventDesc}>{event.description}</p>
                  </div>
                </div>
                <svg
                  className={`${styles.toggleChevron} ${openEvents[event.id] ? styles.toggleChevronOpen : ''}`}
                  width="18" height="18" viewBox="0 0 16 16" fill="none"
                >
                  <path d="M3 5.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {openEvents[event.id] && (
                <div className={styles.eventContent}>
                  <div className={styles.placeholderBlock}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className={styles.placeholderIcon}>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M10 8l6 4-6 4V8z" fill="currentColor" opacity="0.5" />
                    </svg>
                    <p className={styles.placeholderText}>{event.placeholder}</p>
                  </div>
                </div>
              )}
            </article>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ProjectEvents;