import styles from "./frontpage-header.module.css";

function FrontPageHeader({ header, number }) {
  return <div className={styles.container}>{header}</div>;
}

export default FrontPageHeader;
