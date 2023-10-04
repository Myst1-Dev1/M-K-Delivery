import { Products } from "../../types/Product";

export function searchSushiFood(products:Products[], onSetFilter:any) {
    const sushiProducts = products.filter(product => product.type === 'Sushi');
    
    onSetFilter(sushiProducts);
}

export function searchSeaFood(products:Products[], onSetFilter:any) {
    const sushiProducts = products.filter(product => product.type === 'Frutos do mar');
    
    onSetFilter(sushiProducts);
}

export function searchMeatFood(products:Products[], onSetFilter:any) {
    const sushiProducts = products.filter(product => product.type === 'Carne');
    
    onSetFilter(sushiProducts);
}

export function searchNoodleFood(products:Products[], onSetFilter:any) {
    const sushiProducts = products.filter(product => product.type === 'Macarrão');
    
    onSetFilter(sushiProducts);
}

export function searchBrazilianFood(products:Products[], onSetFilter:any) {
    const sushiProducts = products.filter(product => product.type === 'Brasileira');
    
    onSetFilter(sushiProducts);
}

export function searchSaladFood(products:Products[], onSetFilter:any) {
    const sushiProducts = products.filter(product => product.type === 'Salada');
    
    onSetFilter(sushiProducts);
}

export function searchDessertFood(products:Products[], onSetFilter:any) {
    const sushiProducts = products.filter(product => product.type === 'Sobremesa');
    
    onSetFilter(sushiProducts);
}

export function cleanSearch(products:Products[], onSetFilter:any) {
   onSetFilter(products);
}