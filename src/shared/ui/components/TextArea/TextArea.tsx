import React from 'react';
import styles from './TextArea.module.scss'
import { combineClassNames } from '@/shared/lib/utils';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    textAreaSize?: 'small' | 'medium' | 'large'
}

export const TextArea: React.FC<TextAreaProps> = ({
    value,
    onChange,
    onKeyDown,
    name,
    placeholder,
    textAreaSize = 'medium'
}) => {
    const textAreaClass = combineClassNames(
        styles.textArea,
        styles[textAreaSize]
    );

    return (
        <textarea
            className={textAreaClass}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            name={name}
            placeholder={placeholder}
        />
    );
};