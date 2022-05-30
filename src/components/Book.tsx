import { FC, useState } from 'react';
import { Ibook } from '../pages/Home';
import { loadBooks } from '../utils/loadBooks';

export const Book: FC<Ibook> = ({
  id,
  title,
  authors,
  publishingCompany,
  saved
}): JSX.Element => {
  const [bookSaved, setBookSaved] = useState<boolean>(false);

  const handleSave = (): void => {
    const savedArr: Ibook[] = [
      ...loadBooks(),
      { id, title, authors, publishingCompany, saved: true }
    ];
    localStorage.setItem('books', JSON.stringify(savedArr));
    setBookSaved(true);
  };

  if (!id) {
    return <div>Nothing matching those results, please try search</div>;
  }

  return (
    <div>
      <h2>{title}</h2>
      {authors && (
        <div>
          {authors.length >= 2 ? 'Authors:' : 'Author:'}
          {authors.map((author, i) => (
            <p key={i}> {author}</p>
          ))}
        </div>
      )}
      {publishingCompany && <p>Publisher: {publishingCompany}</p>}
      {!saved && (
        <button type="button" onClick={handleSave} disabled={bookSaved}>
          {!bookSaved ? 'Save to Reading List' : 'Saved!'}
        </button>
      )}
    </div>
  );
};

export default Book;
