import {render, screen} from '@testing-library/react';
import { MostSaledDishes } from '.';
import { ProductContext } from '../../services/hooks/useProducts';

describe('MostSaledDishes components', () => {
    it('products data renders correctly and render text when product have 2 amount', () => {
        const products:any = [{
            name: 'Item 1',
            image: '/path/to/image1.jpg',
            amount: 2,
            details:'Lorem ipsum is simply dummy',
            price: 10.99,
        }]

       const mockProducts = {
        products: products,
        CreateProducts:jest.fn(),
        DeleteProduct:jest.fn()
       }
       
        render(
            <ProductContext.Provider value={mockProducts}>
                <MostSaledDishes />
            </ProductContext.Provider>)
       
       expect(screen.getByText('Item 1')).toBeInTheDocument();
       expect(screen.getByText('Lorem ipsum is simply dummy')).toBeInTheDocument();
       expect(screen.getByText('Porção com 2 únidades')).toBeInTheDocument();
       expect(screen.getByText('Adicionar ao carrinho')).toBeInTheDocument();
    })

    it('products data renders correctly and render text when product have 1 amount', () => {
        const products:any = [{
            name: 'Item 1',
            image: '/path/to/image1.jpg',
            amount: 1,
            details:'Lorem ipsum is simply dummy',
            price: 10.99,
        }]

       const mockProducts = {
        products: products,
        CreateProducts:jest.fn(),
        DeleteProduct:jest.fn()
       }
       
        render(
            <ProductContext.Provider value={mockProducts}>
                <MostSaledDishes />
            </ProductContext.Provider>)
       
       expect(screen.getByText('Item 1')).toBeInTheDocument();
       expect(screen.getByText('Lorem ipsum is simply dummy')).toBeInTheDocument();
       expect(screen.getByText('1 Porção')).toBeInTheDocument();
       expect(screen.getByText('Adicionar ao carrinho')).toBeInTheDocument();
    })
})