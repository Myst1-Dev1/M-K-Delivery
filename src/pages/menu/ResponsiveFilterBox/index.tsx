import { ProductContext } from '@/services/hooks/useProducts';
import styles from './styles.module.scss';
import { useContext } from 'react'

interface ResponsiveFilterBoxProps {
    onSetFilter:any;
    onOpenResponsiveFilterBox:boolean
}

export function ResponsiveFilterBox({ onSetFilter, onOpenResponsiveFilterBox }:ResponsiveFilterBoxProps) {
    const { products } = useContext(ProductContext);

    function searchSushiFood() {
        const sushiProducts = products.filter(product => product.type === 'Sushi');
        
        onSetFilter(sushiProducts);
     }
 
     function searchSeaFood() {
         const sushiProducts = products.filter(product => product.type === 'Frutos do mar');
         
         onSetFilter(sushiProducts);
     }
 
     function searchMeatFood() {
         const sushiProducts = products.filter(product => product.type === 'Carne');
         
         onSetFilter(sushiProducts);
     }
 
     function searchNoodleFood() {
         const sushiProducts = products.filter(product => product.type === 'Macarrão');
         
         onSetFilter(sushiProducts);
     }
 
     function searchBrazilianFood() {
         const sushiProducts = products.filter(product => product.type === 'Brasileira');
         
         onSetFilter(sushiProducts);
     }
 
     function searchSaladFood() {
         const sushiProducts = products.filter(product => product.type === 'Salada');
         
         onSetFilter(sushiProducts);
     }
 
     function searchDessertFood() {
         const sushiProducts = products.filter(product => product.type === 'Sobremesa');
         
         onSetFilter(sushiProducts);
     }
 
     function cleanSearch() {
        onSetFilter(products);
     }

    return (
        <>
        {onOpenResponsiveFilterBox && (
            <div className={`mt-4 mb-2 ${styles.responsiveFilterBox}`}>
                <div className='d-flex m-auto gap-3 wrap'>
                    <div onClick={searchSushiFood} className={`d-flex align-items-center ${styles.option}`}>
                        <img src="/images/sushi.png" alt="option" />
                        <h6>Sushi</h6>
                    </div>
                    <div onClick={searchSeaFood} className={`d-flex gap-2 align-items-center ${styles.option}`}>
                        <img src="/images/seafood.png" alt="option" />
                        <h6>Frutos do mar</h6>
                    </div>
                    <div onClick={searchMeatFood} className={`d-flex align-items-center ${styles.option}`}>
                        <img src="/images/meat.png" alt="option" />
                        <h6>Carne</h6>
                    </div>
                    <div onClick={searchNoodleFood} className={`d-flex align-items-center ${styles.option}`}>
                        <img src="/images/noodle.png" alt="option" />
                        <h6>Macarrão</h6>
                    </div>
                    <div onClick={searchBrazilianFood} className={`d-flex align-items-center ${styles.option}`}>
                        <img src="/images/brazilian.png" alt="option" />
                        <h6>Brasileira</h6>
                    </div>
                    <div onClick={searchSaladFood} className={`d-flex gap-2 align-items-center ${styles.option}`}>
                        <img src="/images/salad.png" alt="option" />
                        <h6>Salada</h6>
                    </div>
                    <div onClick={searchDessertFood} className={`d-flex gap-2 align-items-center ${styles.option}`}>
                        <img src="/images/dessert.png" alt="option" />
                        <h6>Sobremesa</h6>
                    </div>
                    <div onClick={cleanSearch} className={`d-flex align-items-center ${styles.option}`}>
                        <h6 className={styles.clean}>Limpar</h6>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}