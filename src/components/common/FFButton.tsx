import React from 'react';

interface FFButtonProps {
  text: string;
  disabled?: boolean;
  bgColor?: string;
  className?: string;
  variant?: 'filled' | 'outlined';
  onClick?: () => void;
}

const FFButton: React.FC<FFButtonProps> = ({
  text,
  disabled = false,
  variant = 'filled',
  bgColor = '#007880',
  className = '',
  onClick
}) => {

  // Define style based on disabled state and variant
  const style = {
    backgroundColor: disabled ? '#CCCCCC' : (variant === 'filled' ? bgColor : 'transparent'),
  };
  const disabledStyles = 'cursor-not-allowed';

  return (
    <button
      className={`py-3.5 px-8 my-3 w-full rounded-3xl text-white font-bold text-sm ${disabled ? disabledStyles : ''} ${className}`}
      disabled={disabled}
      style={style}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FFButton;
