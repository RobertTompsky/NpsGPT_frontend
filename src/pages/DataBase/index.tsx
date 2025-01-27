import { Container, PageWrapper } from '@/shared/ui/layout';
import { ChatWidget } from '@/widgets';
import { AddDocFeature } from '@/features/doc';

export const DataBase = () => {
    return (
        <PageWrapper>
            <Container flexDirection='row' gap='20px'>
                <ChatWidget chatType='qa' />
                <AddDocFeature />
            </Container>
        </PageWrapper>
    );
};
