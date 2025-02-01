import { useAgentStore } from '../../model';
import styles from './styles.module.scss'

export const Summary = () => {
    const { agents, currentAgentId } = useAgentStore()
    const summary = agents.find(a => a.id === currentAgentId)?.summary

    return (
        <nav className={styles.summary}>
            <h2>Сводка</h2>
            <ol>
                {summary && summary.length > 0
                    ?
                    <>
                        {summary?.map((point, index) =>
                            <li key={index}>
                                {point}
                            </li>
                        )}
                    </>
                    :
                    <li>Пока ничего нет</li>
                }
            </ol>
        </nav>
    );
};
