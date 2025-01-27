import { FormHTMLAttributes } from 'react';
import styles from './styles.module.scss'
import { combineClassNames } from '@/shared/lib/utils';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    title: string
    width?: string
    margin?: string
}

export const Form = ({
    children,
    title,
    onSubmit,
    width,
    margin = 'auto'
}: FormProps) => {
    const formClass = combineClassNames(
        styles.form,
        styles[width as keyof typeof styles],
        styles[margin as keyof typeof styles]
    );

    return (
        <form
            style={{ width, margin }}
            className={formClass}
            onSubmit={onSubmit}>
            <h2 className={styles.form_title}>
                {title}
            </h2>
            {children}
        </form>
    );
};