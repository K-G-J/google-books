import axios from 'axios';
import { FC, useState } from 'react';
import { Book } from '../components/Book';

export interface Ibook {
  id: string,
  title: string,
  authors: string[],
  publishingCompany?: string
}

interface IbookData {
  id: string
  volumeInfo: {
    title: string,
    categories?: string[],
    publisher?: string,
    authors: string[],
    description: string,
    infoLink: string,
    imageLinks?: {
      thumbnail: string,
    };
    publishedDate: string,
  };
}

export const Home: FC = () => {
  const [query, setQuery] = useState<string>('');
  const [books, setBooks] = useState<Ibook[]>([])

  const handleSearch = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
    e.preventDefault();
    if (!query) {
      alert('please enter a search term');
    }
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
      );
      const bookList: Ibook[] = [];
      data.items.map((item: IbookData) => {
        let bookObj:Ibook = {
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          publishingCompany: item.volumeInfo.publisher
        }
        bookList.push(bookObj);
      })
      setBooks(bookList);
      setQuery('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          name="search"
          value={query}
          type="text"
          placeholder="search for books..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <button type="button" onClick={handleSearch}>
        Search
      </button>
      {books.map((book, i) => (
        <Book
          id={book.id}
          title={book.title}
          authors={book.authors}
          publishingCompany={book.publishingCompany}
          key={i} />
      ))}
    </div>
  );
};

export default Home;
