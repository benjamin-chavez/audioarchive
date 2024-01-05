'use client';

/* Core */
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* Instruments */
import styles from '../styles/layout.module.css';

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link
        className={`${styles.link} ${
          pathname === '/redux' ? styles.active : ''
        }`}
        href="/redux"
      >
        Home
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === '/redux/verify' ? styles.active : ''
        }`}
        href="/redux/verify"
      >
        Verify
      </Link>
    </nav>
  );
};
