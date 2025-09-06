import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helpText,
  icon,
  rightIcon,
  type = 'text',
  size = 'md',
  variant = 'default',
  fullWidth = true,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const baseClasses = 'border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 bg-surface';
  
  const variants = {
    default: 'border-border focus:border-primary focus:ring-primary/20',
    success: 'border-success focus:border-success focus:ring-success/20',
    error: 'border-danger focus:border-danger focus:ring-danger/20'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-4 py-3 text-base'
  };
  
  const inputVariant = error ? 'error' : variant;
  
  const classes = `
    ${baseClasses}
    ${variants[inputVariant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${icon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
    ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-textSecondary mb-2">
          {label}
          {props.required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-textMuted">{icon}</span>
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={classes}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className="text-textMuted">{rightIcon}</span>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-danger flex items-center gap-1">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="mt-2 text-sm text-textMuted">{helpText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;