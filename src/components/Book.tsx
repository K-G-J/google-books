import { FC, useState } from 'react';
import { Ibook } from '../pages/Home';
import { loadBooks } from '../utils/loadBooks';

export const Book: FC<Ibook> = ({ id, title, authors, publishingCompany }) => {
  const [saved, setSaved] = useState<boolean>(false)

  const handleSave = () => {
    let savedArr: Ibook[] = loadBooks();
    const bookObj: Ibook = { id, title, authors, publishingCompany };
    savedArr.push(bookObj);
    localStorage.setItem('books', JSON.stringify(savedArr));
    setSaved(true)
  };

  if (!id) {
    return (
      <div>Nothing matching those results, please try search</div>
    )
  }

  return (
    <div>
      <h2>{title}</h2>
      <div>
        {authors.length >= 2 ? 'Authors' : 'Author' }
        {authors && authors.map((author, i) => <p key={i}> {author}</p>)}
      </div>
      <p>{publishingCompany}</p>
      <div>
        <button type="button" onClick={handleSave} disabled={saved}>
          {!saved ? 'Save to Reading List' : 'Saved!' }
        </button>
      </div>
    </div>
  );
};

export default Book;
