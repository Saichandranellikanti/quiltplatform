import React from 'react';

interface QuiltLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'full' | 'icon' | 'text';
}

const QuiltLogo: React.FC<QuiltLogoProps> = ({ 
  className = "", 
  size = 'md',
  showText = true,
  variant = 'full'
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  if (variant === 'icon') {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="grid grid-cols-2 gap-1">
          <div className="w-3 h-3 bg-quilt-orange rounded-sm"></div>
          <div className="w-3 h-3 bg-quilt-turquoise rounded-sm"></div>
          <div className="w-3 h-3 bg-quilt-navy rounded-sm"></div>
          <div className="w-3 h-3 bg-quilt-green rounded-sm"></div>
        </div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="grid grid-cols-2 gap-1">
          <div className="w-4 h-4 bg-quilt-orange rounded-sm"></div>
          <div className="w-4 h-4 bg-quilt-turquoise rounded-sm"></div>
          <div className="w-4 h-4 bg-quilt-navy rounded-sm"></div>
          <div className="w-4 h-4 bg-quilt-green rounded-sm"></div>
        </div>
        <span className="text-2xl font-bold text-foreground">Quilt</span>
      </div>
    );
  }

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