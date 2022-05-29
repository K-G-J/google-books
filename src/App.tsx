import { FC } from 'react';
import { ReadingList } from './pages/ReadingList';
import {Home} from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';

const App: FC = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/readinglist" element={<ReadingList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
