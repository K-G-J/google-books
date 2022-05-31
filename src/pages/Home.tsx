import { FC, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Book } from '../components/Book';

export interface Ibook {
  id: string;
  title: string;
  authors: string[];
  publishingCompany?: string;
  saved: boolean;
}

interface IbookData {
  id: string;
  volumeInfo: {
    title: string;
    categories?: string[];
    publisher?: string;
    authors: string[];
    description: string;
    infoLink: string;
    imageLinks?: {
      thumbnail: string;
    };
    publishedDate: string;
  };
}

const styles = {
  error: `m-6 left-5 text-red-500`,
  form: `flex bg-white justify-between border-2 rounded-sm p-2 left-5 m-6 sm:max-w-screen-sm text-stone-900`,
  input: `appearance-none bg-white px-4 py-2 pt-3 w-80`,
  button: `flex items-center justify-center px-3`
};

export const Home: FC = (): JSX.Element => {
  const [query, setQuery] = useState<string>('');
  const [books, setBooks] = useState<Ibook[]>([]);
  const [error, setError] = useState<string>('');

  const handleSearch = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ): Promise<void> => {
    e.preventDefault();
    if (!query) {
      setError('please enter a search term');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
      );
      if (!data.items) {
        setError('please enter a different search term');
        setTimeout(() => {
          setError('');
        }, 3000);
        setQuery('');
      }
      const bookList: Ibook[] = [];
      data.items.map((item: IbookData) => {
        let bookObj: Ibook = {
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          publishingCompany: item.volumeInfo.publisher,
          saved: false
        };
        bookList.push(bookObj);
      });
      setBooks(bookList);
      setQuery('');
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Error: ${err.message}`);
        console.log(err);
      }
      if (err instanceof AxiosError && err.response?.status != 400) {
        console.log(err);
        setError('something went wrong, please try again');
        setTimeout(() => {
          setError('');
        }, 3000);
      }
      setQuery('');
    }
  };

  return (
    <div>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          className={styles.input}
          name="search"
          value={query}
          type="text"
          placeholder="search for books..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="button" onClick={handleSearch} className={styles.button}>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
          </svg>
          Search
        </button>
      </form>
      {books &&
        books.map((book, i) => (
          <div key={i} className="flex">
            <Book
              id={book.id}
              title={book.title}
              authors={book.authors}
              publishingCompany={book.publishingCompany}
              saved={book.saved}
            />
          </div>
        ))}
    </div>
  );
};

export default Home;
