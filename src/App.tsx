import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Favorites from './pages/favorites';
import Movies from './pages/movies';
import Welcome from './pages/welcome';
import Navbar from './componant/navbar';
import Footer from './componant/footer';




function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow container-fluid bg-dark">
          <Navbar />
          <Routes> 
            <Route path="/" element={<Welcome />} />
            <Route path="/movie/:id" element={<Movies />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
