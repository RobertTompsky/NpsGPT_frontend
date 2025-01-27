import styles from './styles.module.scss'
import { combineClassNames } from '@/shared/lib/utils';

interface IFeedback {
    type: 'success' | 'error'
    message: string
}

export const Feedback = ({ type, message }: IFeedback) => {
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