import * as React from "react";
import styles from "../S4.module.scss";
import seplatLogo from "../../../assets/SeplatLogo.svg";
import elevateLogo from "../../../assets/ProjectElevate.svg";
import sapLogo from "../../../assets/SAP.svg";

const S4Header: React.FC = () => (
  <header className={styles.peHeader}>
    <div className={styles.peContainer}>
      <div className={styles.peHeaderband}>
        <div className={styles.peHeaderbandInner}>
          <div className={styles.peLogoRow}>
            <div className={`${styles.peLogoCell} ${styles.peLogoLeft}`}>
              <img className={styles.peHeaderLogoSeplat} src={seplatLogo} alt="Seplat logo" />
            </div>
            <div className={`${styles.peLogoCell} ${styles.peLogoMid}`}>
              <img className={styles.peHeaderLogoElevate} src={elevateLogo} alt="Project Elevate logo" />
            </div>
            <div className={`${styles.peLogoCell} ${styles.peLogoRight}`}>
              <img className={styles.peHeaderLogoSap} src={sapLogo} alt="SAP S/4HANA logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default S4Header;