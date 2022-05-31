import { Ibook } from '../pages/Home';

const loadBooks = (): Ibook[] => {
  return JSON.parse(localStorage.getItem('books')!) ?? [];
};
export { loadBooks };
