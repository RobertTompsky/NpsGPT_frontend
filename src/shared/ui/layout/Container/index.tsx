import React from 'react';
import styles from './styles.module.scss'
import { combineClassNames } from '@/shared/lib/utils';

interface ContainerProps {
    children: React.ReactNode
    flexDirection?: 'row' | 'column';
    gap?: string
}

export const Container = ({ 
    children,
    flexDirection = 'column',
    gap
}: ContainerProps) => {
    const containerClass = combineClassNames(
        styles.container,
        styles[flexDirection as keyof typeof styles],
        styles[gap as keyof typeof styles]
    );

    return (
        <div className={containerClass} style={{ flexDirection, gap }}>
            {children}
        </div>
    );
};
