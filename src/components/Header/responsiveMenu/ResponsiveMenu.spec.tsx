import { render, screen, fireEvent } from '@testing-library/react'
import "@testing-library/jest-dom";
import { ResponsiveMenu } from '.';
import { useCart } from '../../../services/hooks/useCart';
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

jest.mock('../../../services/hooks/useCart');

const setResponsiveMenu = jest.fn();
const setShowOverlay = jest.fn();

const renderComponent = () => {
    render(
        <ResponsiveMenu onSetResponsiveMenu={setResponsiveMenu} onSetShowOverlay={setShowOverlay} />
    )
}

describe('ResponsiveMenu components', () => {

    it('renders correctly', () => {

        renderComponent();

        expect(screen.getByText('Início')).toBeInTheDocument();
        expect(screen.getByText('Menu')).toBeInTheDocument();
        expect(screen.getByText('Sobre')).toBeInTheDocument();
        expect(screen.getByText('Contato')).toBeInTheDocument();
    })

    it('should call the open cart button', () => {
        renderComponent();
        
        const setOpenCartMock = jest.fn();
        const useCartMocked = mocked(useCart);
        useCartMocked.mockReturnValue({
            setOpenCart:setOpenCartMock,
        } as any)

        const openCartButton = screen.getByTestId('cart-button');

        fireEvent.click(openCartButton);
        
        expect(setOpenCartMock).not.toBe(false);

    });

    it('render value when cart no have items', () => {
        renderComponent();

        const cartMocked = mocked(useCart);
        const cartValueMock:any = []
        
        cartMocked.mockReturnValue({
            cart:cartValueMock
        } as any)

        expect(cartValueMock).toHaveLength(0);
    })

    it('render value when cart have items', () => {
        renderComponent();

        const cartMocked = mocked(useCart);
        const cartValueMock:any = [{}]
        
        cartMocked.mockReturnValue({
            cart:cartValueMock
        } as any)

        expect(cartValueMock).toHaveLength(1);
    })
})