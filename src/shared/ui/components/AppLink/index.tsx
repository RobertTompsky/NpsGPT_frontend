import styles from './styles.module.scss'
import { Link, LinkProps } from 'react-router-dom';

export const AppLink = (props: LinkProps) => {
    return (
        <Link
            className={styles.link}
            {...props}
        />
    );
};