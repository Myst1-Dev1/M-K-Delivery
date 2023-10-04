import { 
    cleanSearch, 
    searchBrazilianFood, 
    searchDessertFood, 
    searchMeatFood, 
    searchNoodleFood, 
    searchSaladFood, 
    searchSeaFood, 
    searchSushiFood } from './FilterFunctions';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';

interface FilterBoxProps {
    onSetFilter:any;
}

export function FilterBox({ onSetFilter }:FilterBoxProps) {
    const products = useSelector((state:any) => state.productsData.products);

    return (
        <div className={`${styles.filterBox}`}>
            <div className={`d-flex flex-column gap-3 ${styles.foodOptionsBox}`}>
                <div onClick={() => searchSushiFood(products, onSetFilter)} 
                    className={`d-flex align-items-center gap-3 
                    ${styles.option}`}>
                    <img src="/images/sushi.png" alt="option" />
                    <h4>Sushi</h4>
                </div>
                <div onClick={() => searchSeaFood(products, onSetFilter)} 
                    className={`d-flex align-items-center gap-3 
                    ${styles.option}`}>
                    <img src="/images/seaFood.png" alt="option" />
                    <h4>Frutos do mar</h4>
                </div>
                <div onClick={() => searchMeatFood(products, onSetFilter)} 
                    className={`d-flex align-items-center gap-3 
                    ${styles.option}`}>
                    <img src="/images/meat.png" alt="option" />
                    <h4>Carne</h4>
                </div>
                <div onClick={() => searchNoodleFood(products, onSetFilter)} 
                    className={`d-flex align-items-center gap-3 
                    ${styles.option}`}>
                    <img src="/images/noodle.png" alt="option" />
                    <h4>Macarrão</h4>
                </div>
                <div onClick={() => searchBrazilianFood(products, onSetFilter)} 
                    className={`d-flex align-items-center gap-3 
                    ${styles.option}`}>
                    <img src="/images/brazilian.png" alt="option" />
                    <h4>Brasileira</h4>
                </div>
                <div onClick={() => searchSaladFood(products, onSetFilter)} 
                    className={`d-flex align-items-center gap-3 
                    ${styles.option}`}>
                    <img src="/images/salad.png" alt="option" />
                    <h4>Salada</h4>
                </div>
                <div onClick={() => searchDessertFood(products, onSetFilter)} 
                    className={`d-flex align-items-center gap-3 
                    ${styles.option}`}>
                    <img src="/images/dessert.png" alt="option" />
                    <h4>Sobremesa</h4>
                </div>
                <div className={styles.option} onClick={() => cleanSearch(products, onSetFilter)}>
                    <h6>Limpar</h6>
                </div>
            </div>
            <div className={`d-flex gap-2 flex-column justify-content-center align-items-center
                ${styles.chefBox}`}
            >
                    <div><img src="/images/generalChef.png" alt="chefImage" /></div>
                    <h4 className='text-center'>Stephan Buckridge</h4>
                    <h6>Proprietário</h6>
                    <p className='text-center'>
                        Descubra a excelência da culinária 
                        japonesa. Sabores únicos e artísticos.
                    </p>
            </div>
        </div>
    )
}