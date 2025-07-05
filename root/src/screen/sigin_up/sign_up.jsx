import React, { useState } from 'react';
import './sign_up.css'; // Create this CSS file for styling
import httpService from '../../services/api_service';
import { API_ENDPOINTS } from '../../constants/api_constants';

const Register = () => {

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


 const registerUser = async (e)=>{
 e.preventDefault();
   try{
    setLoading(true);
    const res = await httpService.post(API_ENDPOINTS.AUTH.REGISTER,userData)
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
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-logo">Instagram</h1>
        
        <form className="register-form" onSubmit={registerUser}>
          <input
            type="email"
            placeholder="Email"
            name='email'
            value={userData.email}
            className="register-input"
            onChange={handleInputChange}
          />
          
          <input
            type="password"
            placeholder="Password"
            name='password'
            value={userData.password}
            onChange={handleInputChange}
            className="register-input"
          />
        
          <button type="submit" className="register-button" disabled={loading}>
          { loading ? "Loading...." : "Sign Up"}
          </button>
        </form>
        
        <div className="register-divider">
          <span>OR</span>
        </div>
        
        <button className="register-facebook-button">
          Log in with Facebook
        </button>
        
        <div className="register-login-link">
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default Register;