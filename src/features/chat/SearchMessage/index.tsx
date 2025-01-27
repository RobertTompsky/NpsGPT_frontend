import { searchMessage } from '@/entities/chat/model';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Input } from '@/shared/ui/components';

export const SearchMessage = () => {
    const dispatch = useAppDispatch()

    return (
        <Input
            placeholder='Поиск сообщения...'
            onChange={(e) => dispatch(searchMessage(e.target.value))}
        />
    );
};
