import { ProductContext } from '@/services/hooks/useProducts';
import styles from './styles.module.scss';
import { useContext } from 'react';

interface FilterBoxProps {
    onSetFilter:any;
}

export function FilterBox({ onSetFilter }:FilterBoxProps) {
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
        <div className={`${styles.filterBox}`}>
                        <div className={`d-flex flex-column gap-3 ${styles.foodOptionsBox}`}>
                            <div onClick={searchSushiFood} className={`d-flex align-items-center gap-3 
                                ${styles.option}`}>
                                <img src="/images/sushi.png" alt="option" />
                                <h4>Sushi</h4>
                            </div>
                            <div onClick={searchSeaFood} className={`d-flex align-items-center gap-3 
                                ${styles.option}`}>
                                <img src="/images/seaFood.png" alt="option" />
                                <h4>Frutos do mar</h4>
                            </div>
                            <div onClick={searchMeatFood} className={`d-flex align-items-center gap-3 
                                ${styles.option}`}>
                                <img src="/images/meat.png" alt="option" />
                                <h4>Carne</h4>
                            </div>
                            <div onClick={searchNoodleFood} className={`d-flex align-items-center gap-3 
                                ${styles.option}`}>
                                <img src="/images/noodle.png" alt="option" />
                                <h4>Macarrão</h4>
                            </div>
                            <div onClick={searchBrazilianFood} className={`d-flex align-items-center gap-3 
                                ${styles.option}`}>
                                <img src="/images/brazilian.png" alt="option" />
                                <h4>Brasileira</h4>
                            </div>
                            <div onClick={searchSaladFood} className={`d-flex align-items-center gap-3 
                                ${styles.option}`}>
                                <img src="/images/salad.png" alt="option" />
                                <h4>Salada</h4>
                            </div>
                            <div onClick={searchDessertFood} className={`d-flex align-items-center gap-3 
                                ${styles.option}`}>
                                <img src="/images/dessert.png" alt="option" />
                                <h4>Sobremesa</h4>
                            </div>
                            <div className={styles.option} onClick={cleanSearch}><h6>Limpar</h6></div>
                        </div>
                        <div className={`d-flex gap-2 flex-column justify-content-center align-items-center
                            ${styles.chefBox}`}
                        >
                                <div><img src="/images/generalChef.png" alt="chefImage" /></div>
                                <h4 className='text-center'>Stephan Buckridge</h4>
                                <h6>Chef Geral</h6>
                                <p className='text-center'>
                                    Descubra a excelência da culinária 
                                    japonesa. Sabores únicos e artísticos.
                                </p>
                        </div>
                    </div>
    )
}