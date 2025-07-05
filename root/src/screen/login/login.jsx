import React, { useState } from 'react';
import './Login.css'; // Reuse or create this CSS file
import httpService from '../../services/api_service';
import { API_ENDPOINTS } from '../../constants/api_constants';

const Login = () => {

 const [loading,setLoading] = useState(false);
 const [userData,setUserData] = useState({
  email:"",
  password:""
 });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    // if (errors[name]) {
    //   setErrors(prev => ({
    //     ...prev,
    //     [name]: ''
    //   }));
    // }
  };


 const loginUser = async (e)=>{
 e.preventDefault();
   try{
    setLoading(true);
    const res = await httpService.post(API_ENDPOINTS.AUTH.LOGIN,userData)
     setLoading(false);
    console.log(res)

   }catch(err){
    console.log("loginERROR == " ,err)
    setLoading(false);

   } finally {
      setLoading(false);
    }


 }


  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-logo">Instagram</h1>
        
        <form className="login-form" onSubmit={loginUser}>
          <input
            type="email"
            name='email'
            placeholder="Email or Username"
            onChange={handleInputChange}
            value={userData.email}
            className="login-input"
          />
          
          <input
            type="password"
            name='password'
            placeholder="Password"
            onChange={handleInputChange}
            value={userData.password}
            className="login-input"
          />
          
          <button type="submit" className="login-button" disabled={loading}>
           {loading ? "Loading...." : "Log in"}
          </button>
        </form>
        
        <div className="login-divider">
          <span>OR</span>
        </div>
        
        <button className="login-facebook-button" >
          Log in with Facebook
        </button>
        
        <a href="/forgot-password" className="login-forgot-password">
          Forgot password?
        </a>
      </div>
      
      <div className="login-signup-box">
        Don't have an account? <a href="/register">Sign up</a>
      </div>
    </div>
  );
};

export default Login;