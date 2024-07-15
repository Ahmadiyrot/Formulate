
import './App.css';

import HomePage from './components/homepage/HomePage.js';
import ErrorPage from './components/errorpage/ErrorPage.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/signup/SignUp.js';
import Login from './components/signup/Login.js';
import Forms from './components/forms/Forms.js';
import ResponseCard from './components/responses/Responses.js';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Forms' element={<Forms />} />
          <Route path="/Responses" element={<ResponseCard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
