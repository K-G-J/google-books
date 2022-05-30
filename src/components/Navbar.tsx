import { FC } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  nav: `relative flex flex-wrap items-center justify-between px-2 py-3 bg-cyan-500 mb-3`,
  navContainer: `container px-4 mx-auto flex flex-wrap items-center justify-between`,
  navDiv: `w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start`,
  navLink: `px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75`,
  navFlex: `lg:flex flex-grow items-center flex`,
  navUl: `flex flex-col lg:flex-row list-none lg:ml-auto`
};

export const Navbar: FC = (): JSX.Element => {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navDiv}>
            <Link
              className={styles.navLink}
              to="/"
            >
              Home
            </Link>
          </div>
          <div className={styles.navFlex}>
            <ul className={styles.navUl}>
              <li>
                <Link
                  className={styles.navLink}
                  to="/readinglist"
                >
                  Reading List
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
