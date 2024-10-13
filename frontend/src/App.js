
import './App.css';

import useAuth from './hooks/useAuth.js';

import HomePage from './components/homepage/HomePage.js';
import ErrorPage from './components/errorpage/ErrorPage.js';
import { Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/signup/SignUp.js';
import Login from './components/signup/Login.js';
import TabsPage from './components/forms/TabsPage.js';
import ResponseCard from './components/responses/Responses.js';
import Layout from './components/layout/Layout.js';
import RequireAuth from './components/RequireAuth/RequireAuth.js';
import PersistLogin from './components/persistlogin/PersistLogin.js';
import LoadingPage from "./components/loadingpage/LoadingPage";
import AddElements from "./components/forms/AddElements.js"
import CreateForm from "./components/forms/CreateForm.js"
import AnswerForm from './components/forms/AnswerForm.js';
import ViewForm from './components/forms/ViewForm.js';



function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='loading' element={<LoadingPage />} />

          <Route path='error' element={<ErrorPage />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Login' element={<Login />} />
          <Route element={<PersistLogin />}>
            <Route path='/' element={<HomePage />} />
            <Route element={<RequireAuth />}>
              <Route path='/CreateForm' element={<CreateForm />} />
              <Route path='/AddElements/:id' element={<AddElements />} />
              <Route path='/TabsPage' element={<TabsPage />} />
              <Route path="/Responses/:id" element={<ResponseCard />} />
              <Route path="/AnswerForm/:id" element={<AnswerForm />} />
              <Route path="View/:ID" element={<ViewForm />} />


            </Route>
          </Route>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
