import { render, screen, fireEvent } from '@testing-library/react'
import "@testing-library/jest-dom";
import { Cart } from '.';
import { CartContext, useCart } from '../../services/hooks/useCart';
import React from 'react';
import { mocked } from 'jest-mock';

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
});

jest.mock('../../services/hooks/useCart');

const setShowOverlay = jest.fn();

const renderComponent = () => {
    render(
        <Cart onSetShowOverlay={setShowOverlay} />
    )
}

describe('Header component', () => {
    
    it('Cart renders correctly', () => {
        renderComponent();

        expect(screen.getByText('Limpar carrinho')).toBeInTheDocument();
        expect(screen.getByText('Subtotal')).toBeInTheDocument();
        expect(screen.getByText('Total(BRL)')).toBeInTheDocument();
        expect(screen.getByText('Seguir para o pagamento')).toBeInTheDocument();
    })

    it('should call the close cart button', () => {
        renderComponent();

        const setOpenCartMock = jest.fn();
        const useCartMocked = mocked(useCart);
        useCartMocked.mockReturnValue({
            setOpenCart:setOpenCartMock,
        } as any)

        const openCartButton = screen.getByTestId('close-cart');

        fireEvent.click(openCartButton);
        
        expect(setOpenCartMock).not.toBe(true);
        expect(setShowOverlay).not.toBe(true);
    });

    it('render text when cart have items', () => {
        const cartMock = [
            {
              product: {
                name: 'Item 1',
                image: '/path/to/image1.jpg',
                amount: 2,
                price: 10.99,
              },
              quantity: 3,
            },
        ];

        const mockUseCart:any = {
            cart:cartMock,
        }

        render(
            <CartContext.Provider value={mockUseCart}>
                <Cart onSetShowOverlay={setShowOverlay} />
            </CartContext.Provider>
        )

        expect(screen.getByText('Carrinho de Compras')).toBeInTheDocument();
    })

    it('render text when cart no have items', () => {
        const cartMock:any = [];

        const mockUseCart:any = {
            cart:cartMock,
        }

        render(
            <CartContext.Provider value={mockUseCart}>
                <Cart onSetShowOverlay={setShowOverlay} />
            </CartContext.Provider>
        )
        expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument(); 
    })

    it('render data when cart have items', () => {

        const cartMock = [
            {
              product: {
                name: 'Item 1',
                image: '/path/to/image1.jpg',
                amount: 2,
                price: 10.99,
              },
              quantity: 3,
            },
        ];

        const mockUseCart:any = {
            cart:cartMock,
        }

        render(
            <CartContext.Provider value={mockUseCart}>
                <Cart onSetShowOverlay={setShowOverlay} />
            </CartContext.Provider>
        )
        expect(screen.getByText('Item 1')).toBeInTheDocument(); 
    })
})