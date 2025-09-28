import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Chatbot from './Pages/Chatbot'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Map from './Pages/Map'
import{ BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import AboutUs from './Pages/About'
import HowToUse from './Pages/HowToUse'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/chatbot' element={<Chatbot/>}/>
      <Route path='/map' element={<Map/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/howToUse' element={<HowToUse/>}/>
    </Routes>
    </BrowserRouter>
   
  </StrictMode>
)