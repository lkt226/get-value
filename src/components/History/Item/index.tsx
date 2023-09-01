import { HistoryItemType } from '../../../redux/history/slice';
import css from './item.module.scss';

import { setAllInputs } from '../../../redux/calcule/slice';
import { useDispatch } from 'react-redux';

interface Props {
    item: HistoryItemType;
}

const money = (value: number) => {
    return value.toLocaleString('pt-br', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
}

const HistoryItem = ({ item }: Props) => {
    const dispatch = useDispatch();

    const handleSelectHistory = () => {
        console.log(item);
        dispatch(setAllInputs(item));
    }

    return (
        <div className={css['history-item']} onClick={handleSelectHistory}>
            <p>Funcionários: <span>{item.employees}</span></p>
            <p>Base: <span>{money(item.result.base_value)}</span></p>
            <p>Tempo estimado: <span>{item.estimated_time} horas</span></p>
            <p>Adicionais: <span>{money(item.result.fixed_value)}</span></p>
            <p>Margem de lucro: <span>{item.profit_margin}%</span></p>
            <b><p>Resultado: <span>{money(item.result.total)}</span></p></b>
        </div>
    )
}

export default HistoryItem;