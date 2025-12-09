import Link from 'next/link';

const NotFound = () => {
  return (
    <div>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
