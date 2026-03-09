import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimeDetails } from './pages/AnimeDetails';
import './App.css';
import { MyLists } from './pages/MyLists';
import { Home } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/minhas-listas" element={<MyLists />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;