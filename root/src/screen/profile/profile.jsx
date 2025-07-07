import React, { useEffect, useState } from 'react';
import { FiEdit, FiCalendar, FiMail, FiUser, FiMapPin, FiChevronDown } from 'react-icons/fi';
import { FaCamera } from 'react-icons/fa';
import './profile.css';
import { API_ENDPOINTS } from '../../constants/api_constants';
import httpService from '../../services/api_service';
import { storageService } from '../../services/storage_services';

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    email: "",
    gender: "",
    fullName: "",
    username: "",
    address: "",
    profilePhoto: "",
    birthDate: ""
    });


    const [loading,setLoading] = useState(false);


    useEffect(()=>{

      getUserProfile()
   
    },[])

    const getUserProfile = async (e)=>{
      try{
       setLoading(true);
       const req = {
        userId : storageService.get("user")._id
       }
       const res = await httpService.get(API_ENDPOINTS.AUTH.GET_PROFILE,req)
        setLoading(false);
        const response = res.data;
        if(response.status){

          const profile = {
            email: response.data.email ?? "",
            gender: response.data.gender ?? "",
            fullName: response.data.gender ?? "",
            username: response.data.username ?? "",
            address: response.data.address ?? "",
            profilePhoto: response.data.profilePhoto ?? "",
            birthDate: response.data.birthDate ?? ""
          }

         setProfile(profile)

         console.log
        }else{
         showErrorToast(response.message)
        }
   
      }catch(err){
       console.log("loginERROR == " ,err)
       setLoading(false);
   
      } finally {
         setLoading(false);
       }
   
   
    }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile(prev => ({ ...prev, profilePhoto: event.target.result }));
        console.log("photo",event.target.result)
      };
      reader.readAsDataURL(e.target.files[0]);
      
    }
  };

  return (
    <div className="profile-edit-container">
      <div className="profile-header">
        <div className="avatar-upload">
          <div className="avatar-wrapper">
            <img src={profile.profilePhoto ?? "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"} alt="Profile" /> 
            <label className="camera-icon">
              <FaCamera />
              <input type="file" onChange={handlePhotoChange} accept="image/*" />
            </label> 
          </div>
          <div className="username-section">
            <h2>{profile.username || profile.email}</h2>
            <button className="change-photo-btn">Change Profile Photo</button>
          </div>
        </div>
      </div>

      <form className="profile-form">
        <div className="form-group">
          <label>
            <FiUser className="input-icon" />
            <span>Full Name</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label>
            <FiUser className="input-icon" />
            <span>Username</span>
          </label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            placeholder="Choose a username"
          />
        </div>

        <div className="form-group">
          <label>
            <FiMail className="input-icon" />
            <span>Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled
            className="disabled-input"
          />
        </div>

        <div className="form-group">
          <label>
            <FiUser className="input-icon" />
            <span>Gender</span>
          </label>
          <div className="select-wrapper">
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <FiChevronDown className="select-arrow" />
          </div>
        </div>

        <div className="form-group">
          <label>
            <FiCalendar className="input-icon" />
            <span>Birth Date</span>
          </label>
          <input
            type="date"
            name="birthDate"
            value={profile.birthDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <FiMapPin className="input-icon" />
            <span>Address</span>
          </label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Enter your address"
            rows="3"
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            <FiEdit className="submit-icon" />
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;