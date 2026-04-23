import * as React from 'react';
import styles from './HeroCarousel.module.scss';

export interface IHeroCarouselItem {
  id: string;
  image: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

export interface IHeroCarouselProps {
  items: IHeroCarouselItem[];
  autoPlayMs?: number;
}

const HeroCarousel: React.FC<IHeroCarouselProps> = ({
  items,
  autoPlayMs = 5000
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (!items.length || isModalOpen) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoPlayMs);

    return () => window.clearInterval(interval);
  }, [items.length, autoPlayMs, isModalOpen]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent): void => {
      if (!isModalOpen || !items.length) {
        return;
      }

      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isModalOpen, items.length]);

  const goToSlide = (index: number): void => {
    setActiveIndex(index);
  };

  const goNext = (): void => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const goPrev = (): void => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  if (!items.length) {
    return null;
  }

  const activeItem = items[activeIndex];

  return (
    <>
      <article className={styles.heroCarousel}>
        <div className={styles.heroMedia}>
          <img
            key={activeItem.id}
            className={styles.heroImage}
            src={activeItem.image}
            alt={activeItem.alt}
          />

          <div className={styles.topOverlay}>
            <button
              type="button"
              className={styles.fullscreenButton}
              onClick={() => setIsModalOpen(true)}
              aria-label="Open fullscreen gallery"
            >
              <svg
                viewBox="0 0 20 20"
                width="18"
                height="18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M7 3H3v4M13 3h4v4M17 13v4h-4M3 13v4h4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className={styles.bottomOverlay}>
            <div className={styles.indicators} aria-label="Carousel indicators">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.indicator} ${
                    index === activeIndex ? styles.indicatorActive : ''
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-pressed={index === activeIndex}
                >
                  {index === activeIndex && (
                    <span
                      key={`${item.id}-progress`}
                      className={styles.indicatorMover}
                      style={{ animationDuration: `${autoPlayMs}ms` }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {(activeItem.title || activeItem.subtitle) && (
            <div className={styles.overlayText}>
              {activeItem.title && <h3>{activeItem.title}</h3>}
              {activeItem.subtitle && <p>{activeItem.subtitle}</p>}
            </div>
          )}
        </div>
      </article>

      {isModalOpen && (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalPanel}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleWrap}>
                <h2>Programme Gallery</h2>
                <p>Browse gallery visuals and highlighted programme imagery.</p>
              </div>

              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setIsModalOpen(false)}
                aria-label="Close gallery"
              >
                ×
              </button>
            </div>

            <div className={styles.modalHero}>
              <button
                type="button"
                className={`${styles.modalNav} ${styles.modalNavLeft}`}
                onClick={goPrev}
                aria-label="Previous image"
              >
                ‹
              </button>

              <img
                className={styles.modalHeroImage}
                src={activeItem.image}
                alt={activeItem.alt}
              />

              <button
                type="button"
                className={`${styles.modalNav} ${styles.modalNavRight}`}
                onClick={goNext}
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            <div className={styles.modalThumbGrid}>
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.thumbButton} ${
                    index === activeIndex ? styles.thumbButtonActive : ''
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Open ${item.alt}`}
                >
                  <img src={item.image} alt={item.alt} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroCarousel;