import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Navigate after fade out completes
    const navTimer = setTimeout(() => {
      navigate('/auth');
    }, 2800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 transition-opacity duration-800 ${
        fadeOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{ transition: 'all 0.8s ease-in-out' }}
    >
      <div
        className={`transform transition-all duration-1000 ${
          fadeOut ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse"></div>
            
            {/* Logo circle */}
            <div className="relative w-32 h-32 rounded-full bg-white shadow-2xl flex items-center justify-center">
              <span className="text-6xl font-bold font-outfit text-primary">N</span>
            </div>
          </div>
          
          {/* App name */}
          <h1 className="text-4xl font-bold font-outfit text-white tracking-tight">
            Needify
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Splash;
