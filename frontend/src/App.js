
import './App.css';

import HomePage from './components/homepage/HomePage.js';
import ErrorPage from './components/errorpage/ErrorPage.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/signup/SignUp.js';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='SignUp' element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
