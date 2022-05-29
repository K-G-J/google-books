import axios from 'axios';
import { FC, useState } from 'react';

interface Ibook {
  title: string,
  author: string,
  publishingCompany: string
}

export const Home: FC = () => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
    e.preventDefault();
    if (!query) {
      alert('please enter a search term');
    }
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
      );
      console.log(data);
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
    </div>
  );
};
