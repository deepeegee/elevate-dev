import * as React from 'react';
import styles from './NewsLanding.module.scss';
import { useProjectNews, type INewsItem, type NewsCategory } from '..//../hooks/useProjectNews';

interface INewsLandingProps {
  onBack: () => void;
  onOpenDetail: (item: INewsItem) => void;
  initialTab?: 'updates' | 'social';
}

const formatDate = (iso: string): string => {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  } catch { return iso; }
};

const NewsCard: React.FC<{ item: INewsItem; onClick: () => void }> = ({ item, onClick }) => (
  <button type="button" className={styles.newsCard} onClick={onClick}>
    <div className={styles.newsCardImageWrap}>
      {item.imageUrl ? (
        <img src={item.imageUrl} alt={item.title} className={styles.newsCardImage} />
      ) : (
        <div className={`${styles.newsCardImagePlaceholder} ${item.category === 'Social' ? styles.newsCardImagePlaceholderSocial : ''}`}>
          {item.category === 'Social' ? (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.2"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          ) : (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.2"/><path d="M7 8h10M7 12h7M7 16h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          )}
        </div>
      )}
      {item.isFeatured && (
        <span className={styles.featuredBadge}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor"><path d="M6 1l1.4 3h3l-2.4 1.8.9 3L6 7.2 3.1 8.8l.9-3L1.6 4h3z"/></svg>
          RECENT
        </span>
      )}
    </div>
    <div className={styles.newsCardBody}>
      {/* <span className={styles.newsCardCategory}>{item.category}</span> */}
      <h3 className={styles.newsCardTitle}>{item.title}</h3>
      <p className={styles.newsCardExcerpt}>
        {item.body.replace(/<[^>]+>/g, '').slice(0, 140)}
        {item.body.replace(/<[^>]+>/g, '').length > 140 ? '…' : ''}
      </p>
      <div className={styles.newsCardFooter}>
        <span className={styles.newsCardDate}>{formatDate(item.publishedDate)}</span>
        <span className={styles.newsCardReadMore}>
          Read more
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
    </div>
  </button>
);

const NewsLanding: React.FC<INewsLandingProps> = ({ onBack, onOpenDetail, initialTab = 'updates' }) => {
  const [activeTab, setActiveTab] = React.useState<'updates' | 'social'>(initialTab);
  const category: NewsCategory = activeTab === 'updates' ? 'Project Update' : 'Social';
  const { items, loading, error } = useProjectNews(category);

  return (
    <section className={styles.page}>
      <div className={styles.topShell}>

        {/* Back */}
        <div className={styles.backRow}>
          <a href="#" className={styles.backLink} onClick={(e) => { e.preventDefault(); onBack(); }}>
            <span className={styles.backIconWrap} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H15v-5h-6v5H4a1 1 0 0 1-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className={styles.backTextGroup}>
              {/* <span className={styles.backOverline}>Project Elevate</span> */}
              <span className={styles.backLabel}>Back to Home</span>
            </span>
          </a>
        </div>

        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.eyebrow}>Project Elevate</p>
            <h1 className={styles.title}>What's New On the Project</h1>
            <p className={styles.intro}>All updates and news from across the programme.</p>
          </div>
          <div className={styles.tabRow}>
            <button
              type="button"
              className={`${styles.tab} ${activeTab === 'updates' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('updates')}
            >
              Project Updates
            </button>
            <button
              type="button"
              className={`${styles.tab} ${activeTab === 'social' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('social')}
            >
              Social News
            </button>
          </div>
        </header>

        {/* Grid */}
        <div className={styles.newsGrid}>
          {loading && (
            <div className={styles.feedState}>
              <div className={styles.feedSpinner} />
              <p className={styles.feedStateText}>Loading...</p>
            </div>
          )}
          {!loading && error && (
            <div className={styles.feedState}>
              <p className={styles.feedStateText}>Could not load updates. Try again later.</p>
            </div>
          )}
          {!loading && !error && items.length === 0 && (
            <div className={styles.feedState}>
              <p className={styles.feedStateText}>No {activeTab === 'updates' ? 'project updates' : 'social news'} yet. Check back soon.</p>
            </div>
          )}
          {!loading && !error && items.length > 0 && items.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              onClick={() => onOpenDetail(item)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewsLanding;