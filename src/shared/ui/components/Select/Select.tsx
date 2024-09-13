import React from 'react';
import styles from './Select.module.scss'
import { combineClassNames } from '@/shared/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: {
        value: string | number,
        title: string | number
    }[],
    defaultOptionTitle: string
    selectSize?: 'small' | 'medium' | 'large'
}

export const Select: React.FC<SelectProps> = ({
    options,
    defaultOptionTitle,
    value,
    name,
    selectSize = 'medium',
    ...rest
}) => {
    const selectClass = combineClassNames(
        styles.select,
        styles[selectSize]
    );

    return (
        <select
            value={value || ''}
            name={name}
            className={selectClass}
            {...rest}>
            <option
                disabled
                value={''}
                className={styles.select_option}>
                {defaultOptionTitle}
            </option>
            {options.map((option, index?) => (
                <option
                    key={index}
                    value={option.value}
                    className={styles.select_option}>
                    {option.title}
                </option>
            ))}
        </select>
    );
};