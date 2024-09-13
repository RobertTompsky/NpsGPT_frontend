import React from 'react';
import styles from './UploadLabel.module.scss'

interface IUploadLabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
    title: string
    file: File | Blob | undefined
}

export const UploadLabel: React.FC<IUploadLabel> = ({
    title,
    file,
    htmlFor
}) => {
    const fileName = (file as File || Blob)?.name
    return (
        <label
            htmlFor={htmlFor}
            className={styles.uploadLabel}>
            <div className={styles.uploadLabel_info}>
                {file ? fileName : 'Файл не выбран'}
            </div>
            <div className={styles.uploadLabel_btn}>{title}</div>
        </label>
    );
};