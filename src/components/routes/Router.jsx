import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import First from '../../pages/first/First'
import Home from '../../pages/home/Home'
import Mark from '../../pages/mark/Mark'

const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<First />} />
        <Route path='/quiz' element={<Home />} />
        <Route path='/:mark' element={<Mark />} />
    </Routes>
      
    </BrowserRouter>
  )
}

export default Router
