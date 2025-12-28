'use client';

import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import NavLink from '../NavLink/NavLink';

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated);

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push('/sign-in');
  };

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <NavLink href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </NavLink>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button className={css.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <NavLink href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </NavLink>
      </li>

      <li className={css.navigationItem}>
        <NavLink href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </NavLink>
      </li>
    </>
  );
}
