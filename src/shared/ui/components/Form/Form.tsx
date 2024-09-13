import React from 'react';
import styles from './Form.module.scss'
import { combineClassNames } from '@/shared/lib/utils';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    title: string
    width?: string
}

export const Form: React.FC<FormProps> = ({
    children,
    title,
    onSubmit,
    width
}) => {
    const formClass = combineClassNames(
        styles.form,
        styles[width as keyof typeof styles]
    );

    return (
        <form
            style={{ width }}
            className={formClass}
            onSubmit={onSubmit}>
            <h2 className={styles.form_title}>
                {title}
            </h2>
            {children}
        </form>
    );
};