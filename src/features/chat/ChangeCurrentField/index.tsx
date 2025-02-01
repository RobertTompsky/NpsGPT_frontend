import { FIELDS } from '@/entities/ai/lib';
import { 
    changeCurrentField, 
    IChat,
    IChatType, 
    selectActiveChatByType 
} from '@/entities/ai/model';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Select } from '@/shared/ui/components';

export const ChangeCurrentField = ({ chatType }: { chatType: IChatType }) => {
    const dispatch = useAppDispatch()

    const chat = useAppSelector((state) => selectActiveChatByType(state, chatType))
    const field = chat?.currentField

    return (
        <Select
            defaultOptionTitle='Выбрать поле'
            options={FIELDS.map(({title, value}) => ({ 
                title, 
                value
            }))}
            value={field}
            onChange={(e) => {
                const currentField = e.target.value as IChat['currentField']
                dispatch(changeCurrentField({
                    chatType,
                    currentField
                }))
            }}
        />
    );
};