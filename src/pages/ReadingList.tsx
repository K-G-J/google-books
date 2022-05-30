import { FC, useEffect, useState } from 'react';
import Book from '../components/Book';
import { Ibook } from '../pages/Home';
import { loadBooks } from '../utils/loadBooks';

export const ReadingList: FC = (): JSX.Element => {
  const [savedBooks, setSavedBooks] = useState<Ibook[]>([]);

  useEffect(() => {
    let savedArr = loadBooks();
    setSavedBooks(savedArr);
  }, []);

  const handleRemove = (id: string): void => {
    let newArr: Ibook[] = savedBooks.filter((book) => book.id !== id);
    localStorage.setItem('books', JSON.stringify(newArr));
    setSavedBooks(newArr);
  };

  return (
    <div>
      {!savedBooks.length && (
        <div>Reading list empty, search for some new books!</div>
      )}
      {savedBooks &&
        savedBooks.map((book, i) => (
          <div key={i}>
            <Book
              id={book.id}
              title={book.title}
              authors={book.authors}
              publishingCompany={book.publishingCompany}
              saved={book.saved}
            />
            <button type="button" onClick={() => handleRemove(book.id)}>
              Remove from Reading List
            </button>
          </div>
        ))}
    </div>
  );
};
