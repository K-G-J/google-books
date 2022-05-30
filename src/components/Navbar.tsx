import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: FC = (): JSX.Element => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/readinglist">Reading List</Link>
        </li>
      </ul>
    </nav>
  );
};
