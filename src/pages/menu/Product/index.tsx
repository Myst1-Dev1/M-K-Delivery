import { Products } from '../../../types/Product';
import { ProductBox } from '@/components/ProductBox';

interface ProductBoxProps {
    onCurrentItems:Products[];
}

export function Product({ onCurrentItems }:ProductBoxProps) {
    return (
        <div className='d-flex wrap gap-5 mt-2'>
            {onCurrentItems && onCurrentItems.length === 0 ? <p>Sem resultados para sua pesquisa 😢</p> : ''}
            {onCurrentItems && Array.isArray(onCurrentItems) && onCurrentItems.map(item => {
                return (
                        <div className='row'>
                            <ProductBox
                                key={item._id}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                details={item.details}
                                amount={item.amount}
                                price={item.price}
                            />
                        </div>
                )
            })}
        </div>
    )
}