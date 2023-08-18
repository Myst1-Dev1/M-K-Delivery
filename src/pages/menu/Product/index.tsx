import { UpdateProductModal } from '../../../components/UpdateProductModal';
import { Products } from '../../../types/Product';
import { ProductBox } from '../../../components/ProductBox';

interface ProductBoxProps {
    onCurrentItems:Products[];
    onSetIsNewUpdateModalOpen:any;
    isNewUpdateModalOpen:boolean;
    onRequestClose:() => void;
    onSetSelectedProductId:any;
    onSelectedProductId:any;
}

export function Product({ onCurrentItems, onSetIsNewUpdateModalOpen 
, isNewUpdateModalOpen, onRequestClose, onSetSelectedProductId, onSelectedProductId
}:ProductBoxProps) {
    return (
        <div className='d-flex wrap gap-5 mt-2'>
            {onCurrentItems && onCurrentItems.length === 0 ? <p>Sem resultados para sua pesquisa 😢</p> : ''}
            {onCurrentItems && Array.isArray(onCurrentItems) && onCurrentItems.map(item => {
                return (
                        <div key={item._id} className='row'>
                            <ProductBox
                                onSetIsNewUpdateModalOpen= {onSetIsNewUpdateModalOpen}
                                onSetSelectedProductId={onSetSelectedProductId}
                                key={item._id}
                                id={item._id}
                                image={item.image}
                                name={item.name}
                                details={item.details}
                                amount={item.amount}
                                price={item.price}
                            />
                            {onSelectedProductId && onSelectedProductId === item._id && (
                                <UpdateProductModal
                                    dataItem={item}
                                    id={item._id}
                                    isOpen = {isNewUpdateModalOpen}
                                    onRequestClose= {onRequestClose}
                                />
                            )}
                        </div>
                )
            })}
        </div>
    )
}