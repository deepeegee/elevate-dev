import * as React from 'react';
import styles from './WhatsNew.module.scss';
import { useProjectNews, type INewsItem } from '..//../hooks/useProjectNews';

interface IWhatsNewProps {
  onOpenDetail: (item: INewsItem) => void;
  onViewAll: (tab: 'updates' | 'social') => void;
  spHttpClient?: unknown;
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
        {item.body.replace(/<[^>]+>/g, '').slice(0, 120)}
        {item.body.replace(/<[^>]+>/g, '').length > 120 ? '…' : ''}
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

const WhatsNew: React.FC<IWhatsNewProps> = ({ onOpenDetail, onViewAll, spHttpClient }) => {
  const [activeTab, setActiveTab] = React.useState<'updates' | 'social'>('updates');
  const category = activeTab === 'updates' ? 'Project Update' : 'Social';
  const { items, loading, error } = useProjectNews(category as 'Project Update' | 'Social', spHttpClient);

  return (
    <div className={styles.whatsNewCard}>
      <div className={styles.whatsNewHeader}>
        <div className={styles.whatsNewHeaderLeft}>
          <h2 className={styles.whatsNewTitle}>What's New On the Project</h2>
          <p className={styles.whatsNewSubtitle}>
            {activeTab === 'updates' ? 'Key project updates and what is happening now.' : 'Project social news, moments, and community highlights.'}
          </p>
        </div>
        <button type="button" className={styles.whatsNewTabToggle} onClick={() => setActiveTab((prev) => prev === 'updates' ? 'social' : 'updates')}>
          <span className={styles.whatsNewTabToggleIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h10M4 18h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </span>
          {activeTab === 'updates' ? 'Switch to Social News' : 'Switch to Project Updates'}
        </button>
      </div>

      <div className={styles.whatsNewFeed}>
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
            <p className={styles.feedStateText}>No updates yet. Check back soon.</p>
          </div>
        )}
        {!loading && !error && items.length > 0 && (
          <div className={styles.newsCarousel}>
            {items.map((item) => (
              <NewsCard key={item.id} item={item} onClick={() => onOpenDetail(item)} />
            ))}
          </div>
        )}
      </div>
      <div className={styles.viewAllRow}>
        <button
          type="button"
          className={styles.viewAllBtn}
          onClick={() => onViewAll(activeTab)}
        >
          View all {activeTab === 'updates' ? 'project updates' : 'social news'}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WhatsNew;