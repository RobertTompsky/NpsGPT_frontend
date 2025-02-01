import { MEMORY_LENGTH } from '@/entities/ai/lib';
import { IChatType, selectActiveChatByType, changeMemoryLength } from '@/entities/ai/model';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Select } from '@/shared/ui/components';

export const ChangeMemoryLength = ({ chatType }: { chatType: IChatType }) => {
    const dispatch = useAppDispatch()

    const chat = useAppSelector((state) => selectActiveChatByType(state, chatType))
    const memoryLength = chat?.memoryLength

    return (
        <Select
            defaultOptionTitle='Выбрать память'
            options={MEMORY_LENGTH.map(({value, title}) => ({ 
                title, 
                value 
            }))}
            value={memoryLength}
            onChange={(e) => {
                const length = Number(e.target.value)
                dispatch(changeMemoryLength({
                    chatType,
                    length
                }))
            }}
        />
    );
};