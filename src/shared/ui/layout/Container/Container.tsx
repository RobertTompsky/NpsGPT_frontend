import React from 'react';
import styles from './Container.module.scss'
import { combineClassNames } from '@/shared/lib/utils';

interface ContainerProps {
    children: React.ReactNode;
    centeredChildren?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ 
    children, 
    centeredChildren 
}) => {
    const containerClass = combineClassNames(
        styles.container,
        centeredChildren ? styles.centeredChildren : ''
    );

    return (
        <div className={containerClass}>
            {children}
        </div>
    );
};
