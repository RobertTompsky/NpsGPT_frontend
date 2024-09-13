import React from 'react';
import styles from './PageWrapper.module.scss'

interface IPageWrapper {
    children: React.ReactNode
}

export const PageWrapper: React.FC<IPageWrapper> = ({children}) => {
    return (
        <div className={styles.pageWrapper}>
            {children}
        </div>
    );
};