import { Ibook } from '../pages/Home'

const loadBooks = (): Ibook[] => {
  // @ts-ignore
  return JSON.parse(localStorage.getItem('books')) ?? [];
}
export { loadBooks }