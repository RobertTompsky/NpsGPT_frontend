import { searchMessage } from '@/entities/ai/model';
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
