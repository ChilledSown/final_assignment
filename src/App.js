import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Login from './pages/Login';
import { useState } from 'react';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home' 
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import Setting from './pages/Setting';
function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/admin-dashboard' element={<AdminDashboard></AdminDashboard>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/setting' element={<Setting></Setting>}></Route>
        <Route path='/*' element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
