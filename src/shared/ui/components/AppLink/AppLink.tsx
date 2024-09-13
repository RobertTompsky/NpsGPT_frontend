import React from 'react';
import styles from './AppLink.module.scss'
import { Link, LinkProps } from 'react-router-dom';
import { combineClassNames } from '@/shared/lib/utils';

interface IAppLink extends LinkProps {
    fontSize: 'small' | 'medium' | 'large'
}

export const AppLink: React.FC<IAppLink> = ({
    fontSize = 'medium',
    to,
    children,
    ...rest
}) => {
    const linkClass = combineClassNames(
        styles.link,
        styles[fontSize]
    )

    return (
        <Link
            to={to}
            className={linkClass}
            children={children}
            {...rest}
        />
    );
};