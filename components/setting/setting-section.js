import styles from "./user_profile.module.css";

function SettingSection({ title, children, quote }) {
  return (
    <div className={styles.setting_section}>
      <div className={styles.setting_section_title}>{title}</div>
      <div>{quote}</div>
      <div className={styles.setting_section_content}>{children}</div>
    </div>
  );
}
export default SettingSection;
