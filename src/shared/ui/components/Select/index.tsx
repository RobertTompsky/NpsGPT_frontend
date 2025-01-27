import { SelectHTMLAttributes } from 'react';
import styles from './styles.module.scss'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: {
        value: string | number,
        title: string | number
    }[],
    defaultOptionTitle: string
}

export const Select = ({
    options,
    defaultOptionTitle,
    value,
    ...rest
}: SelectProps) => {
    return (
        <select
            value={value || ''}
            className={styles.select}
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