import React from 'react';
import styles from './styles.module.scss'

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.pageWrapper}>
            {children}
        </div>
    );
};