import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss'
import { combineClassNames } from '@/shared/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'delete' | 'approve';
    btnSize?: 'small' | 'medium' | 'large'
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'default',
    btnSize = 'medium',
    children,
    ...rest
}) => {
    const buttonClass = combineClassNames(
        styles.button,
        styles[variant],
        styles[btnSize]
    );

    return (
        <button
            className={buttonClass}
            {...rest}>
            {children}
        </button>
    );
};