import Link from 'next/link';
import { Metadata } from 'next';
import css from './ProfilePage.module.css';
import Image from 'next/image';
import { getMeServer } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'NoteHub App Profile Page',
  description: 'View and edit your profile information.',
};

export default async function ProfilePage() {
  const user = await getMeServer();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || 'https://ac.goit.global/assets/images/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username || '—'}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}
