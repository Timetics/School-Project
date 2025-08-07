import React from 'react';

const BackgroundImage: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Using a Pexels stock photo of students */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
        }}
      />
      
      {/* Overlay with even more transparent red-to-purple gradient, top-left to bottom-right */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e52d27]/30 to-[#b312ff]/30" />

      {/* Slightly stronger dark overlay for glassy effect */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};

export default BackgroundImage;