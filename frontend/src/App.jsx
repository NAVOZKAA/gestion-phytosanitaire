import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard'
import Cultures from './pages/Cultures'
import Maladies from './pages/Maladies'
import Traitements from './pages/Traitements'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' index element={<Dashboard />} />
          <Route path='/cultures' element={<Cultures />} />
          <Route path='/maladies' element={<Maladies />} />
          <Route path='/traitements' element={<Traitements />} />
        </Route>
      </Routes>
   </BrowserRouter>
  )
}

export default App
