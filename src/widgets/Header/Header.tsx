import React from 'react';
import styles from './Header.module.scss'
import { Container } from '@/shared/ui/layout';
import { AppLink } from '@/shared/ui/components';
import { RoutePaths } from '@/shared/lib/config';

export const Header = () => {
    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.header_content}>
                    <h2 className={styles.header_title}>NpsGPT</h2>
                    <nav className={styles.header_nav}>
                        <AppLink
                            to={RoutePaths.main}
                            children="Чат"
                            fontSize='medium' />
                        <AppLink
                            to={RoutePaths.database}
                            children='База данных'
                            fontSize='medium'
                        />
                    </nav>
                </div>
            </Container>
        </div>
    );
};

