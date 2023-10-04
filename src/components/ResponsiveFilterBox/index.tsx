import { ProductContext } from '../../services/hooks/useProducts';
import { cleanSearch, searchBrazilianFood, searchDessertFood, searchMeatFood, searchNoodleFood, searchSaladFood, searchSeaFood, searchSushiFood } from '../FilterBox/FilterFunctions';
import styles from './styles.module.scss';
import { useContext } from 'react'

interface ResponsiveFilterBoxProps {
    onSetFilter:any;
    onOpenResponsiveFilterBox:boolean
}

export function ResponsiveFilterBox({ onSetFilter, onOpenResponsiveFilterBox }:ResponsiveFilterBoxProps) {
    const { products } = useContext(ProductContext);

    return (
        <>
        {onOpenResponsiveFilterBox && (
            <div className={`mt-4 mb-2 ${styles.responsiveFilterBox}`}>
                <div className='d-flex m-auto gap-3 wrap'>
                    <div onClick={() => searchSushiFood(products, onSetFilter)} 
                        className={`d-flex align-items-center ${styles.option}`}>
                        <img src="/images/sushi.png" alt="option" />
                        <h6>Sushi</h6>
                    </div>
                    <div onClick={() => searchSeaFood(products, onSetFilter)} 
                        className={`d-flex gap-2 align-items-center ${styles.option}`}>
                        <img src="/images/seafood.png" alt="option" />
                        <h6>Frutos do mar</h6>
                    </div>
                    <div onClick={() => searchMeatFood(products, onSetFilter)} 
                        className={`d-flex align-items-center ${styles.option}`}>
                        <img src="/images/meat.png" alt="option" />
                        <h6>Carne</h6>
                    </div>
                    <div onClick={() => searchNoodleFood(products, onSetFilter)} 
                        className={`d-flex align-items-center ${styles.option}`}>
                        <img src="/images/noodle.png" alt="option" />
                        <h6>Macarrão</h6>
                    </div>
                    <div onClick={() => searchBrazilianFood(products, onSetFilter)} 
                        className={`d-flex align-items-center ${styles.option}`}>
                        <img src="/images/brazilian.png" alt="option" />
                        <h6>Brasileira</h6>
                    </div>
                    <div onClick={() => searchSaladFood(products, onSetFilter)} 
                        className={`d-flex gap-2 align-items-center ${styles.option}`}>
                        <img src="/images/salad.png" alt="option" />
                        <h6>Salada</h6>
                    </div>
                    <div onClick={() => searchDessertFood(products, onSetFilter)} 
                        className={`d-flex gap-2 align-items-center ${styles.option}`}>
                        <img src="/images/dessert.png" alt="option" />
                        <h6>Sobremesa</h6>
                    </div>
                    <div onClick={() => cleanSearch(products, onSetFilter)} 
                        className={`d-flex align-items-center ${styles.option}`}>
                        <h6 className={styles.clean}>Limpar</h6>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}