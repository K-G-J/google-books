import { FC, useEffect, useState } from 'react'
import { Ibook } from '../pages/Home'
import { loadBooks } from '../utils/loadBooks'

export const ReadingList: FC = () => {

  const [savedBooks, setSavedBooks] = useState<Ibook[]>([]); 

  useEffect(() => {
    let savedArr = loadBooks()
    setSavedBooks(savedArr)
  }, [])

  const handleRemove = (id: string) => {
    let newArr: Ibook[] = savedBooks.filter(book => book.id !== id)
    localStorage.setItem('books', JSON.stringify(newArr))
    setSavedBooks(newArr)
  }
  
  return (
    <div>
      {!savedBooks && <div>Reading list empty, search for some new books!</div>}
      {savedBooks && savedBooks.map((book, i) => (
        <div key={i}>
          <h2>{book.title}</h2>
          <div>
            Authors:
            {book.authors.map((author, i) => (
              <p key={i}>{author}</p>
            ))}
          </div>
          <p>{book.publishingCompany}</p>
          <div>
            <button type="button" onClick={() => handleRemove(book.id)}>
              Remove From Reading List
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}