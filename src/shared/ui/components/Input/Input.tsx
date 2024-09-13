import React from 'react';
import styles from './Input.module.scss'
import { combineClassNames } from '@/shared/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    inputSize?: 'small' | "medium" | 'large'
}

export const Input: React.FC<InputProps> = ({
    value,
    placeholder,
    name,
    inputSize = 'medium',
    onChange,
    ...rest
}) => {
    const inputClass = combineClassNames(
        styles.input,
        styles[inputSize]
    );
    return (
        <input
            className={inputClass}
            value={value}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            {...rest}
        />
    );
};