import { MODELS } from '@/entities/ai/lib';
import { changeModel } from '@/entities/ai/model';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Select } from '@/shared/ui/components';

export const ChangeModel = () => {
    const model = useAppSelector(state => state.chatReducer.model)
    const dispatch = useAppDispatch()

    return (
        <Select
            defaultOptionTitle='Выбрать модель'
            options={MODELS.map(({title, value}) => ({ 
                title, 
                value 
            }))}
            value={model}
            onChange={(e) => dispatch(changeModel(e.target.value))}
        />
    );
};