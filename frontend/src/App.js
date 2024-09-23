
import './App.css';

import useAuth from './hooks/useAuth.js';

import HomePage from './components/homepage/HomePage.js';
import ErrorPage from './components/errorpage/ErrorPage.js';
import { Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/signup/SignUp.js';
import Login from './components/signup/Login.js';
import FormsPage from './components/forms/FormsPage.js';
import ResponseCard from './components/responses/Responses.js';
import Layout from './components/layout/Layout.js';
import RequireAuth from './components/RequireAuth/RequireAuth.js';
import PersistLogin from './components/persistlogin/PersistLogin.js';
import LoadingPage from "./components/loadingpage/LoadingPage";
import CreateForms from "./components/forms/CreateForms.js"



function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='loading' element={<LoadingPage />} />
          <Route path='/CreateForms' element={<CreateForms />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Login' element={<Login />} />
          <Route element={<PersistLogin />}>
            <Route path='/' element={<HomePage />} />
            <Route element={<RequireAuth />}>

              <Route path='/FormsPage' element={<FormsPage />} />
              <Route path="/Responses" element={<ResponseCard />} />

            </Route>
          </Route>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
