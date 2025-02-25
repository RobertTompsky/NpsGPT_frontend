import { useAgentStore } from '../../model';
import styles from './styles.module.scss'

export const UserInfo = () => {
    const { userInfo } = useAgentStore()

    const renderList = (data: string[]) => {
        if (data.length === 0) {
            return <li>Информация отсутствует</li>;
        }
        return data.map((item, index) => <li key={index}>{item}</li>);
    };

    if (!userInfo) {
        return (
            <div className={styles.userInfo}>
                <ol>
                    <li>Информация отсутствует</li>
                </ol>
            </div>
        )
    }

    return (
        <div className={styles.userInfo}>
            <p>Имя</p>
            <ol>
                {userInfo.name ? (
                    <li>
                        {userInfo.name}
                        {userInfo.gender && ` (${userInfo.gender})`}
                    </li>
                ) : (
                    <li>Информация отсутствует</li>
                )}
            </ol>

            <p>Интересы</p>
            <ol>
                {renderList(userInfo.interests)}
            </ol>

            <p>Стиль общения</p>
            <ol>
                {renderList(userInfo.chatPreferences)}
            </ol>
        </div>
    );
};
