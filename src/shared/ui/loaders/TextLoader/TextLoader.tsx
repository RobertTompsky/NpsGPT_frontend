import React from 'react';
import styles from './TextLoader.module.scss'

interface ITextLoader {
    text: string
}

export const TextLoader: React.FC<ITextLoader> = ({text}) => {
    return (
        <span className={styles.textLoader}>
            {text}
        </span>
    );
};
