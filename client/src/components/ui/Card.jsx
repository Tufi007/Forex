import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  padding = 'md',
  className = '',
  headerClassName = '',
  contentClassName = '',
  hover = false,
  ...props
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const baseClasses = `
    bg-surface border border-border rounded-xl shadow-soft transition-all duration-200
    ${hover ? 'hover:shadow-medium hover:border-primary/30' : ''}
    ${className}
  `.trim();

  return (
    <div className={baseClasses} {...props}>
      {(title || subtitle || headerAction) && (
        <div className={`flex items-center justify-between border-b border-border pb-4 mb-6 ${headerClassName}`}>
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-text">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-textMuted mt-1">{subtitle}</p>
            )}
          </div>
          {headerAction && (
            <div className="flex items-center gap-2">
              {headerAction}
            </div>
          )}
        </div>
      )}
      
      <div className={`${paddingClasses[padding]} ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

// Card sub-components
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`border-b border-border pb-4 mb-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`border-t border-border pt-4 mt-6 ${className}`} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;