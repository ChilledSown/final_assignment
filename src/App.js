import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Login from './pages/Login';
import { useState } from 'react';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home' 
import PageNotFound from './pages/PageNotFound';
function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/admin-dashboard' element={<AdminDashboard></AdminDashboard>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/*' element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
