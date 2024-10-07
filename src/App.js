import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
    <div className={`bg-richblack-900 min-h-screen font-inter `}>
      <div className={`transition-all duration-500`}>
        <Navbar />
        <div className="pb-20">
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
              <Route path='add-course' element={<AddCourses/>} />
            </Route>
          </Routes>
        </div>
      </div>
      
      {/* <div>
        {modalState && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            <div className="relative w-full h-full max-w-2xl p-4 mx-auto">
            {modalState && (
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto ">
                <div className="relative w-full h-full max-w-2xl p-4 mx-auto">
                  <AddLectureModal></AddLectureModal>
                </div>
              </div>
              )}
            </div>
          </div>
        )}
      </div> */}

      {/* <div>
        {changeSectionNameModalState && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            <div className="relative w-full h-full max-w-2xl p-4 mx-auto">
            {changeSectionNameModalState && (
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto ">
                <div className="relative w-full h-full max-w-2xl p-4 mx-auto">
                  <ChangeSectionNameModal></ChangeSectionNameModal>
                </div>
              </div>
              )}
            </div>
          </div>
        )}
      </div> */}


    </div>
  );
}

export default App;