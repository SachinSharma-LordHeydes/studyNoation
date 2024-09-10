import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import Login from './page/Login';
import SignUp from './page/SignUp';
import Navbar from './components/common/Navbar';
import VerifyOtp from './page/VerifyOtp';
import ForgotPass from './page/ForgotPass';
import ResetPassword from './page/ResetPassword';
import RequestPasswordReset from './page/RequestPasswordReset';
import About from './page/About';
import Contact from './page/Contact';
import Profile from './page/Profile';
import ProfileSettings from './components/profile/ProfileSettings';
import DashboardLayout from './components/layouts/DashboardLayout';
import AddCourses from './page/AddCourses';

function App() {
  return (
    <div className='bg-richblack-900 min-h-screen pb-20 font-inter'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<SignUp />} />
        <Route path='/Verifyotp' element={<VerifyOtp />} />
        <Route path='/Forgotpassword' element={<ForgotPass />} />
        <Route path='/auth/updatePassword/:id' element={<ResetPassword />} />
        <Route path='/Resetpassword' element={<RequestPasswordReset />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        
        {/* Dashboard routes */}
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route path='my-profile' element={<Profile />} />
          <Route path='settings' element={<ProfileSettings />} />
          <Route path='add-course' element={<AddCourses/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;