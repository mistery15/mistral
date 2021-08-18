import React, { FC, MouseEvent } from 'react';

interface ButtonProps {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void,
    size?: 'normal' | 'large',
    color?: 'orange' | 'transparent',
    className?: string,
    type?: 'reset' | 'button' | 'submit',
    border?: 'rounded-border' | 'normal-border',
    disabled?: boolean,
    testId?: string
}

const Button: FC<ButtonProps> = ({ testId, disabled, onClick, children, size = 'normal', color = 'orange', className = '', type = "button", border = "rounded-border" }) => {
    return (
        <button data-testid={testId} disabled={disabled} type={type} className={`Button ${size} ${color} ${className} ${border}`} onClick={onClick}>
            {children}
        </button>
    );
}

export { Button };