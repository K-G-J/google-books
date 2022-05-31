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
    <div className="text-gray-600 body-font mb-4 ml-10">
      <h2 className="text-gray-600 text-xl text-bold">{title}</h2>
      {authors && (
        <div className="text-gray-500">
          {authors.length >= 2 ? 'Authors:' : 'Author:'}
          {authors.map((author, i) => (
            <p key={i}> {author}</p>
          ))}
        </div>
      )}
      {publishingCompany && <p className="text-gray-400">Publisher: {publishingCompany}</p>}
      {!saved && (
        <button
          className="bg-cyan-500 hover:scale-105 drop-shadow-md  shadow-cla-blue px-4 py-1 rounded-lg"
          type="button"
          onClick={handleSave}
          disabled={bookSaved}
        >
          {!bookSaved ? 'Save to Reading List' : 'Saved!'}
        </button>
      )}
    </div>
  );
};

export default Book;
