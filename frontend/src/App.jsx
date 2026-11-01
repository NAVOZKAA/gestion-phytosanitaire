import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard'
import Cultures from './pages/Cultures'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/cultures' element={<Cultures/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
