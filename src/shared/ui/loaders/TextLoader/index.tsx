import styles from './styles.module.scss'

export const TextLoader = ({text}: { text: string }) => {
    return (
        <span className={styles.textLoader}>
            {text}
        </span>
    );
};
