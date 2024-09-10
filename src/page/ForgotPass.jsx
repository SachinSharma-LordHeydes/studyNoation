import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../services/operations/authOperation';

function ForgotPass() {
  const [email, setEmail] = useState('');

  const dispatch=useDispatch();
  const status =useSelector((state)=>state.auth.status);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email))
    console.log("Reset PAssword Status => ",status)
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {
        status===null?(
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Reset Your Password</h2>
            <p className="text-gray-600 text-center mb-6">Enter your email address and we will send you an Link to reset your password if exist.</p>
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              >
                Send OTP
              </button>
            </form>
          </div>
        ):
        (
          status?(
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Reset Your Password</h2>
              <p className="text-gray-600 text-center mb-6">Reset Password has been successfully sent please check your mail</p>
            </div>
          ):
          (
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Reset Your Password</h2>
              <p className="text-gray-600 text-center mb-6">User with this email doesnt exists  please Login frist</p>
            </div>
          )
        )
      }
    </div>
  );
}

export default ForgotPass;










