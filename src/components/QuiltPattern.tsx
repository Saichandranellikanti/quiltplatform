import React from 'react';

interface QuiltPatternProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'subtle' | 'colorful' | 'outline';
}

const QuiltPattern: React.FC<QuiltPatternProps> = ({ 
  className = "", 
  size = 'md',
  variant = 'colorful'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12', 
    lg: 'w-20 h-20'
  };

  const getColors = () => {
    switch (variant) {
      case 'subtle':
        return [
          'bg-muted/50',
          'bg-muted/30',
          'bg-muted/70',
          'bg-muted/40'
        ];
      case 'outline':
        return [
          'border-2 border-quilt-orange bg-transparent',
          'border-2 border-quilt-turquoise bg-transparent',
          'border-2 border-quilt-navy bg-transparent',
          'border-2 border-quilt-green bg-transparent'
        ];
      default:
        return [
          'bg-quilt-orange',
          'bg-quilt-turquoise',
          'bg-quilt-navy',
          'bg-quilt-green'
        ];
    }
  };

  const colors = getColors();

  return (
    <div className={`grid grid-cols-2 gap-1 ${sizeClasses[size]} ${className}`}>
      {colors.map((color, index) => (
        <div 
          key={index}
          className={`${color} rounded-sm`}
        />
      ))}
    </div>
  );
};

export default QuiltPattern;