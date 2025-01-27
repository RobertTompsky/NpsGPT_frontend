import { LabelHTMLAttributes } from 'react';
import styles from './styles.module.scss'

interface IUploadLabel extends LabelHTMLAttributes<HTMLLabelElement> {
    title: string
    file: File | Blob | undefined
}

export const UploadLabel = ({
    title,
    file,
    ...rest
}: IUploadLabel) => {
    const fileName = (file as File || Blob)?.name

    return (
        <label
            className={styles.uploadLabel}
            {...rest}
        >
            <div className={styles.uploadLabel_info}>
                {file ? fileName : 'Файл не выбран'}
            </div>
            <div className={styles.uploadLabel_btn}>{title}</div>
        </label>
    );
};