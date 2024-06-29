import React from 'react';

interface FFButtonProps {
  text: string;
  loading?: boolean;
  disabled?: boolean;
  bgColor?: string;
  className?: string;
  variant?: 'filled' | 'outlined';
  onClick?: () => void;
}

const FFButton: React.FC<FFButtonProps> = ({
  text,
  loading = false,
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
      className={`py-3.5 px-8 my-3 w-full rounded-3xl font-bold text-sm ${variant === 'filled' ? "text-white" : 'text-teal'} ${disabled ? disabledStyles : ''} ${className}`}
      disabled={disabled}
      style={style}
      onClick={onClick}
    >
    {loading ? (
        <img className='w-6 h-6 mx-auto' src="/icons/spinner-neon.svg" alt="Loading" />
      ) : (
        text
      )}
    </button>
  );
};

export default FFButton;
