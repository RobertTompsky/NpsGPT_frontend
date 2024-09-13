import React from 'react';
import styles from './Feedback.module.scss'
import { combineClassNames } from '@/shared/lib/utils';

interface IFeedback {
    type: 'success' | 'error'
    message: string
}

export const Feedback: React.FC<IFeedback> = ({ type, message }) => {
    
    const feedbackClass = combineClassNames(
        styles.feedback,
        styles[type]
    )

    return (
        <span className={feedbackClass}>
            {message}
        </span>
    );
};