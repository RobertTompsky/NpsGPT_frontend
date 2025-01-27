import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss'
import { combineClassNames } from '@/shared/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'delete' | 'approve';
}

export const Button = ({
    variant = 'default',
    children,
    ...rest
}: ButtonProps) => {
    const buttonClass = combineClassNames(
        styles.button,
        styles[variant]
    );

    return (
        <button
            className={buttonClass}
            {...rest}>
            {children}
        </button>
    );
};