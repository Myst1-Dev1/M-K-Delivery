import {fireEvent, render, screen} from '@testing-library/react';

import { AuthContext } from '../../contexts/AuthContext';
import { CartContext, useCart } from '../../services/hooks/useCart';
import { Product } from '.';

jest.mock('../../../contexts/AuthContext');
jest.mock('../../../services/hooks/useCart');
jest.mock('../../../services/hooks/useProducts');

const onCurrentItems = [
    { 
        _id: '1', 
        name: 'Produto 1', 
        image: 'imagem1.jpg', 
        details: 'Detalhes 1',
        type:'Sushi', 
        amount: 1, 
        price: 9.99 },
    ];

    const onSetIsNewUpdateModalOpen = jest.fn()
    const onRequestClose = jest.fn()
    const onSetSelectedProductId = jest.fn()
    const onSelectedProductId = jest.fn()

describe('ProductBox component', () => {
    it('no render text when have products', () => {
       render(<Product onCurrentItems={onCurrentItems} 
        isNewUpdateModalOpen 
        onRequestClose={onRequestClose}
        onSelectedProductId={onSelectedProductId}
        onSetIsNewUpdateModalOpen={onSetIsNewUpdateModalOpen}
        onSetSelectedProductId={onSetSelectedProductId}
        />)

       expect(screen.queryByText('Sem resultados para sua pesquisa 😢')).toBeNull();
    })

    it('render text when no have products', () => {
        const currentItems:any = []

         render(<Product onCurrentItems={onCurrentItems} 
            isNewUpdateModalOpen 
            onRequestClose={onRequestClose}
            onSelectedProductId={onSelectedProductId}
            onSetIsNewUpdateModalOpen={onSetIsNewUpdateModalOpen}
            onSetSelectedProductId={onSetSelectedProductId}
        />)
 
        expect(screen.queryByText('Sem resultados para sua pesquisa 😢')).toBeInTheDocument();
     })

    it('render data products', () => {
        render(<Product onCurrentItems={onCurrentItems} 
            isNewUpdateModalOpen 
            onRequestClose={onRequestClose}
            onSelectedProductId={onSelectedProductId}
            onSetIsNewUpdateModalOpen={onSetIsNewUpdateModalOpen}
            onSetSelectedProductId={onSetSelectedProductId}
            />)

       expect(screen.getByText('Produto 1')).toBeInTheDocument();
       expect(screen.getByText('Detalhes 1')).toBeInTheDocument();
       expect(screen.getByText('1 Porção')).toBeInTheDocument();
       expect(screen.getByText('Adicionar ao carrinho')).toBeInTheDocument();
    })

    it('render trash when user is admin', () => {
        const user = {
            firstname: 'John',
            lastname: 'Doe',
            isAdmin:true
          };
      
          const mockAuthContext:any = {
            isAuthenticated: true,
            user: user,
          };
       
        render(
            <AuthContext.Provider value={mockAuthContext}>
                <Product onCurrentItems={onCurrentItems} 
                    isNewUpdateModalOpen 
                    onRequestClose={onRequestClose}
                    onSelectedProductId={onSelectedProductId}
                    onSetIsNewUpdateModalOpen={onSetIsNewUpdateModalOpen}
                    onSetSelectedProductId={onSetSelectedProductId}
            />
            </AuthContext.Provider>
        )

        const removeProductButton = screen.getByTestId('removeProduct');

        expect(removeProductButton).toBeInTheDocument();
    })

    it('no render trash when user not is an admin', () => {
        const user = {
            firstname: 'Jane',
            lastname: 'Doe',
            isAdmin:false
          };
      
          const mockAuthContext:any = {
            isAuthenticated: true,
            user: user,
          };
       
        render(
            <AuthContext.Provider value={mockAuthContext}>
                <Product onCurrentItems={onCurrentItems} 
                    isNewUpdateModalOpen 
                    onRequestClose={onRequestClose}
                    onSelectedProductId={onSelectedProductId}
                    onSetIsNewUpdateModalOpen={onSetIsNewUpdateModalOpen}
                    onSetSelectedProductId={onSetSelectedProductId}
            />
            </AuthContext.Provider>
        )

        const removeProductButton = screen.queryByTestId('removeProduct');

        expect(removeProductButton).toBeNull();
    })

    it('should call add cart button', () => {
        const addToCart = jest.fn();

        const mockUseCart:any = {
            handleAddToCart:addToCart, 
        }

        render(
            <CartContext.Provider value={mockUseCart}>
                <Product onCurrentItems={onCurrentItems} 
                    isNewUpdateModalOpen 
                    onRequestClose={onRequestClose}
                    onSelectedProductId={onSelectedProductId}
                    onSetIsNewUpdateModalOpen={onSetIsNewUpdateModalOpen}
                    onSetSelectedProductId={onSetSelectedProductId}
                />
            </CartContext.Provider>
        )

        const addCartButton = screen.getByTestId('addCartButton');

        fireEvent.click(addCartButton);

        expect(addToCart).toHaveBeenCalledWith('1');
    })
})