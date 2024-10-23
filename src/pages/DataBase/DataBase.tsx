import { Container, PageWrapper } from '@/shared/ui/layout';
import { ChatWidget } from '@/widgets';
import React from 'react';
import styles from './DataBase.module.scss'
import { AddDocFeature } from '@/features/doc';

export const DataBase = () => {
    return (
        <PageWrapper>
            <Container>
                <div className={styles.group}>
                    <ChatWidget chatType='qa' />
                    <AddDocFeature />
                </div>
            </Container>
        </PageWrapper>
    );
};
