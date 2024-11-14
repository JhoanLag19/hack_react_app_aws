import React from 'react'
import { UserList } from './components/UserList'
import { UserForm } from './components/UserForm'
import { UserSearch } from './components/UserSearch'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserList/>}/>
        <Route path='/add' element={<UserForm/>}/>
        <Route path='/edit/:id' element={<UserForm/>}/>
        <Route path='/search' element={<UserSearch/>}/>
      </Routes>
    </Router>
  )
}