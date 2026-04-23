import * as React from 'react';
import styles from '../ProgrammeOverview/Programmeoverview.module.scss';

interface IOverviewGalleryProps {
  imageUrl: string;
  alt: string;
  label: string;
  hint?: string;
}

const OverviewGallery: React.FC<IOverviewGalleryProps> = ({
  imageUrl,
  alt,
  label,
  hint = 'Click to expand'
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = (): void => setIsOpen(true);
  const close = (): void => setIsOpen(false);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={styles.overviewGalleryCard}
        onClick={open}
      >
        <img src={imageUrl} alt={alt} className={styles.overviewGalleryImage} />

        <div className={styles.overviewGalleryShade} />

        <div className={styles.overviewGalleryTop}>
          <span className={styles.overviewGalleryExpand}>
            <span className={styles.overviewGalleryExpandIcon} aria-hidden="true">⤢</span>
            Full screen
          </span>
        </div>

        <div className={styles.overviewGalleryCaption}>
          <span className={styles.overviewGalleryLabel}>{label}</span>
          <span className={styles.overviewGalleryHint}>{hint}</span>
        </div>
      </button>

      {isOpen && (
        <div
          className={styles.galleryModal}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.galleryBackdrop} onClick={close} />

          <div className={styles.galleryPanel}>
            <div className={styles.galleryToolbar}>
              <div className={styles.galleryToolbarText}>
              </div>
              <button
                type="button"
                className={styles.galleryClose}
                onClick={close}
                aria-label="Close gallery"
              >
                ×
              </button>
            </div>

            <div className={styles.galleryStage}>
              <img src={imageUrl} alt={alt} className={styles.galleryStageImage} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OverviewGallery;