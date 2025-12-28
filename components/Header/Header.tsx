import css from './Header.module.css';
import Link from 'next/link';
import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';
import NavLink from '../NavLink/NavLink';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <NavLink href="/" exact className={css.navLink} activeClassName={css.active}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink href="/notes/filter/all" className={css.navLink} activeClassName={css.active}>
              Notes
            </NavLink>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
