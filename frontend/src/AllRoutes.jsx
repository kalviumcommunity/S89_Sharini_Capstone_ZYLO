import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Lumeno from './Components/Lumeno';
import UserProfile from './Components/UserProfile';
import Chat from './Components/Chat';
import MemoryList from './Components/MemoryList';
import MemoryForm from './Components/MemoryForm';
import SyneraAI from './Components/SyneraAI';


const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/lumeno' element={<Lumeno />} />
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/chat/:userId' element={<Chat/>} />
        <Route path='/vibe' element={<MemoryList />} />
        <Route path='/vibeForm' element={<MemoryForm />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/synera' element={<SyneraAI />} />
        <Route path='/userProfile' element={<UserProfile/>}/>
    </Routes>
  )
}

export default AllRoutes
