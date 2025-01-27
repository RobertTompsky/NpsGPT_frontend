import { FIELDS } from '@/entities/chat/lib';
import { 
    changeCurrentField, 
    IChatCurrentField, 
    IChatType, 
    selectActiveChatByType 
} from '@/entities/chat/model';
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
                const currentField = e.target.value as IChatCurrentField
                dispatch(changeCurrentField({
                    chatType,
                    currentField
                }))
            }}
        />
    );
};