import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: FC = () => {
  return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/readinglist">readinglist</Link>
          </li>
        </ul>
      </nav>
  );
};
