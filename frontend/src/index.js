import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {HelmetProvider} from 'react-helmet-async';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import PrivateRoute from './components/PrivateRoute.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx'
import LanguageScreen from './screens/LanguageScreen.jsx';
import DisplayExercise from './screens/DisplayExercise.jsx';
import QuizScreen from './screens/QuizScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' index={true} element={<HomeScreen />} />
      <Route path='/login' index={true} element={<LoginScreen />} />
      <Route path='/register' index={true} element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute/>} >
      <Route path='/select-language' index={true} element={<LanguageScreen />} />    
      <Route path='/language/:lang' index={true} element={<DisplayExercise />} />    
      <Route path='/quiz/:id' index={true} element={<QuizScreen />} />          
      <Route path='/profile' index={true} element={<ProfileScreen />} />          
      </Route>




      


    </Route>

    
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
