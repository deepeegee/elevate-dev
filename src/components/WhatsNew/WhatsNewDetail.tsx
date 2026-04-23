import * as React from 'react';
import styles from './WhatsNewDetail.module.scss';
import { type INewsItem } from '..//../hooks/useProjectNews';

interface IWhatsNewDetailProps {
  item: INewsItem;
  onBack: () => void;
  onBackToLanding: () => void;
}

const formatDate = (iso: string): string => {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};

const WhatsNewDetail: React.FC<IWhatsNewDetailProps> = ({ item, onBack, onBackToLanding }) => {
  return (
    <section className={styles.page}>
      <div className={styles.topShell}>

        {/* Breadcrumb */}
        {/* <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <a href="#" className={styles.breadcrumbLink} onClick={(e: React.MouseEvent) => { e.preventDefault(); onBack(); }}>
            Home
          </a>
          <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
          <a href="#" className={styles.breadcrumbLink} onClick={(e: React.MouseEvent) => { e.preventDefault(); onBackToLanding(); }}>
            {"What's New"}
          </a>
          <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
          <span className={styles.breadcrumbCurrent} aria-current="page">
            {item.title.length > 40 ? `${item.title.slice(0, 40)}…` : item.title}
          </span>
        </nav> */}

        {/* Back button — always goes to news landing */}
        <div className={styles.backRow}>
          <a
            href="#"
            className={styles.backLink}
            onClick={(e: React.MouseEvent) => { e.preventDefault(); onBackToLanding(); }}
          >
            <span className={styles.backIconWrap} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className={styles.backTextGroup}>
              <span className={styles.backOverline}>News</span>
              <span className={styles.backLabel}>{"What's New"}</span>
            </span>
          </a>
        </div>

        {/* Article */}
        <article className={styles.article}>

          {item.imageUrl && (
            <div className={styles.articleCover}>
              <img src={item.imageUrl} alt={item.title} className={styles.articleCoverImg} />
            </div>
          )}

          <div className={styles.articleInner}>

            <div className={styles.articleMeta}>
              <span className={`${styles.categoryPill} ${item.category === 'Social' ? styles.categoryPillSocial : ''}`}>
                {item.category}
              </span>
              {item.isFeatured && (
                <span className={styles.featuredPill}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 1l1.4 3h3l-2.4 1.8.9 3L6 7.2 3.1 8.8l.9-3L1.6 4h3z"/>
                  </svg>
                  Featured
                </span>
              )}
              <span className={styles.articleDate}>{formatDate(item.publishedDate)}</span>
              <span className={styles.articleAuthor}>by {item.authorName}</span>
            </div>

            <h1 className={styles.articleTitle}>{item.title}</h1>

            <div
              className={styles.articleBody}
              dangerouslySetInnerHTML={{ __html: item.body }}
            />

            {item.linkUrl && (
              <a
                href={item.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.articleLink}
              >
                View more
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            )}

          </div>
        </article>

      </div>
    </section>
  );
};

export default WhatsNewDetail;