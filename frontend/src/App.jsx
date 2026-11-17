import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard'
import Cultures from './pages/Cultures'
import Maladies from './pages/Maladies'
import Traitements from './pages/Traitements'
import Applications from './pages/Applications'
import Historiques from './pages/Historiques'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MainLayout from './layouts/MainLayout'
import Alertes from './pages/Alertes'
import Login from './pages/Login'
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [applications, setApplications] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
          <Route path='/' index element={<Dashboard />} />
          <Route path='/cultures' element={<Cultures />} />
          <Route path='/maladies' element={<Maladies />} />
          <Route path='/traitements' element={<Traitements />} />
          <Route path='/applications' element={<Applications applications={applications} setApplications={setApplications} />} />
          <Route path='/historiques' element={<Historiques applications={applications} />} />
          <Route path='/alertes' element={<Alertes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
