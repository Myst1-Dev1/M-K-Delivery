import { render, screen, fireEvent } from '@testing-library/react'
import "@testing-library/jest-dom";
import { Header } from '.';
import { AuthContext } from '../../contexts/AuthContext';
import { useCart } from '../../services/hooks/useCart';
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

jest.mock('../../contexts/AuthContext');
jest.mock('../../services/hooks/useCart');

const renderComponent = () => {
    render(
        <Header />
    )
}

describe('Header component', () => {
    
    it('renders correctly', () => {
        renderComponent();

        expect(screen.getByText('Início')).toBeInTheDocument();
        expect(screen.getByText('Menu')).toBeInTheDocument();
        expect(screen.getByText('Sobre')).toBeInTheDocument();
        expect(screen.getByText('Contato')).toBeInTheDocument();
    });

    it('render user data when authenticated is true', () => {

        const user = {
            firstname: 'John',
            lastname: 'Doe',
          };
      
          const mockAuthContext = {
            isAuthenticated: true,
            signIn: jest.fn(),
            signUp: jest.fn(),
            handleLogout: jest.fn(),
            user: user,
          };

          render(
            <AuthContext.Provider value={mockAuthContext}>
                <Header />
            </AuthContext.Provider>
          )

          expect(screen.getByText('John')).toBeInTheDocument();
          expect(screen.getByText('Doe')).toBeInTheDocument();
          expect(screen.getByTestId('logoutIcon')).toBeInTheDocument()
    });

    it('render with user is not authenticated', () => {

        const mockAuthContext = {
            isAuthenticated: false,
            signIn: jest.fn(),
            signUp: jest.fn(),
            handleLogout: jest.fn(),
            user: null,
          };

          render(
            <AuthContext.Provider value={mockAuthContext}>
                <Header />
            </AuthContext.Provider>
          )

        expect(screen.getByText('Conta')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Registro')).toBeInTheDocument();
        
    });

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

    it('should scroll event when fixedHeader is true', () => {
        renderComponent();

        const header = screen.getByTestId('header');

        fireEvent.scroll(window, {target: { scrollY:20 }});

        expect(header).toHaveClass('fixedHeader');
    })

    it('not should scroll event when fixedHeader is false', () => {
        renderComponent();

        const header = screen.getByTestId('header');

        fireEvent.scroll(window, {target: { scrollY:0 }});

        expect(header).toHaveClass('header');
    })
})