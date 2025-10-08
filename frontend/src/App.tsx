import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Auth/Login/LoginPage'
import Layout from './components/Layout/Layout'
import RegisterPage from './pages/Auth/Register/RegisterPage'
import ProfilePage from './pages/Profile/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
      </Routes>
    </ BrowserRouter>
  )
}

export default App
