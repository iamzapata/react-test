import styles from './styles.module.scss'

export function InspectIcon({ color, onClick }) {
  return <span className={styles.Icon} onClick={onClick} style={{ color, height: 24 }}><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg></span>
}