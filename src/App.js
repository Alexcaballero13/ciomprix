import './App.css';
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/Home page/HomePage'


function App() {
  return (
    <Routes>
      <Route path='/Home' element={<HomePage />} />
    </Routes>
  );
}

export default App;
