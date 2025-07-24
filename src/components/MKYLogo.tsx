import React from 'react';

interface MKYLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

const MKYLogo: React.FC<MKYLogoProps> = ({ 
  className = "", 
  variant = 'full',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  if (variant === 'text') {
    return (
      <div className={`font-bold text-mky-navy ${className}`}>
        <span className="text-mky-navy">MKY</span>
        <span className="text-muted-foreground ml-1">Global Forwarding</span>
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div className={`${sizeClasses[size]} aspect-square bg-mky-navy text-white rounded flex items-center justify-center font-bold ${className}`}>
        MKY
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} aspect-square bg-mky-navy text-white rounded flex items-center justify-center font-bold text-sm`}>
        MKY
      </div>
      <span className="font-bold text-mky-navy">Global Forwarding</span>
    </div>
  );
};

export default MKYLogo;