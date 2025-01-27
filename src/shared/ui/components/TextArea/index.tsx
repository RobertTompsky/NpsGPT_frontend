import { TextareaHTMLAttributes } from 'react';
import styles from './styles.module.scss'

export const TextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <textarea
            className={styles.textArea}
            {...props}
        />
    );
};