import { FC, useState } from 'react';
import { Ibook } from '../pages/Home';
import { loadBooks } from '../utils/loadBooks';

const styles = {
  container: `mb-1 text-gray-600 body-font ml-10`,
  title: `text-gray-600 text-xl text-bold`,
  button: `mb-6 bg-cyan-500 hover:scale-105 drop-shadow-md shadow-cla-blue px-4 py-1 rounded-lg`
};

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
    return <div>Nothing matching those results, please try another search</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {authors && (
        <div className="text-gray-500">
          {authors.length >= 2 ? 'Authors:' : 'Author:'}
          {authors.map((author, i) => (
            <p key={i}> {author}</p>
          ))}
        </div>
      )}
      {publishingCompany && (
        <p className="text-gray-400">Publisher: {publishingCompany}</p>
      )}
      {!saved && (
        <button
          className={styles.button}
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
