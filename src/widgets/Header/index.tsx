import styles from './styles.module.scss'
import { Container } from '@/shared/ui/layout';
import { AppLink } from '@/shared/ui/components';
import { RoutePaths } from '@/app/config';

export const Header = () => {
    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.header_content}>
                    <h2 className={styles.header_title}>FlexGPT</h2>
                    <nav className={styles.header_nav}>
                        <AppLink
                            to={RoutePaths.main}
                            children="Чат"
                        />
                        <AppLink
                            to={RoutePaths.database}
                            children='База данных'
                        />
                    </nav>
                </div>
            </Container>
        </div>
    );
};

