import React from 'react';

interface QuiltLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const QuiltLogo: React.FC<QuiltLogoProps> = ({ 
  className = "", 
  size = 'md',
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src="/lovable-uploads/435ab2f1-6a97-4cb6-872d-306c62bcb5b6.png" 
        alt="Quilt Logo" 
        className={`${sizeClasses[size]} w-auto`}
      />
    </div>
  );
};

export default QuiltLogo;