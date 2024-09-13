import { Container, PageWrapper } from '@/shared/ui/layout';
import { ChatWidget } from '@/widgets';
import React from 'react';

export const Main = () => {
    return (
        <PageWrapper>
            <Container>
                <ChatWidget chatType='chatbot'/>
            </Container>
        </PageWrapper>
    );
};

