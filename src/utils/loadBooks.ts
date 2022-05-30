import { Ibook } from '../pages/Home'

const loadBooks = ():Ibook[] | [] => {
  // @ts-ignore
  let savedArr = JSON.parse(localStorage.getItem('books'));
  if (!savedArr || !Array.isArray(savedArr)) return [];
  else return savedArr;
}
export { loadBooks }