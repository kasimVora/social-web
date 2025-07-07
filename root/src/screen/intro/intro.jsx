import React, { useState } from 'react';
import './intro.css';
import { useNavigate } from 'react-router-dom';

const IntroScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  const slides = [
    {
      icon: '💬',
      title: 'Connect with Friends',
      description: 'Chat and share moments with people who matter to you'
    },
    {
      icon: '📷',
      title: 'Share Your Story',
      description: 'Post photos and videos to your profile'
    },
    {
      icon: '🔍',
      title: 'Discover New Content',
      description: 'Explore what others are sharing around the world'
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="intro-container">
      <div className="intro-header">
        <span className="logo">SocialApp</span>
      </div>

      <div className="slide-container">
        <button 
          className="nav-arrow left-arrow" 
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          <span className="arrow-icon">←</span>
        </button>

        <div className="slide-content">
          <div className="icon-circle">
            <span className="slide-icon">{slides[currentSlide].icon}</span>
          </div>
          <h2>{slides[currentSlide].title}</h2>
          <p>{slides[currentSlide].description}</p>
        </div>

        <button 
          className="nav-arrow right-arrow" 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
        >
          <span className="arrow-icon">→</span>
        </button>
      </div>

      <div className="indicators">
        {slides.map((_, index) => (
          <div 
            key={index} 
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      <div className="auth-buttons">
        <button className="auth-btn login-btn" onClick={()=>{
            navigate("login")
        }}>
          <span className="btn-icon">🔑</span>
          <span className="btn-text">Login</span>
        </button>
        <button className="auth-btn register-btn" onClick={()=>{
            navigate("register")
        }}>
          <span className="btn-icon">✍️</span>
          <span className="btn-text">Register</span>
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;