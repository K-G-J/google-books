import { FC } from 'react';
import { Ibook } from '../pages/Home';
import { loadBooks } from '../utils/loadBooks'

export const Book: FC<Ibook> = ({
  id,
  title,
  authors,
  publishingCompany
}) => {

  const handleSave = () => {
    let savedArr:Ibook[] | [] = loadBooks();
    const bookObj: Ibook = { id, title, authors, publishingCompany };
    savedArr.push(bookObj);
    localStorage.setItem('books', JSON.stringify(savedArr));
  };

  return (
    <div>
      <h2>{title}</h2>
      <div>
        Authors:
        {authors.map((author, i) => (
          <p key={i}>{author}</p>
        ))}
      </div>
      <p>{publishingCompany}</p>
      <div>
        <button type="button" onClick={handleSave}>
          Save to Reading List
        </button>
      </div>
    </div>
  );
};

export default Book;
