import {fireEvent, render, screen} from '@testing-library/react';
import { ProductModal } from '.';
import { ProductContext, useProducts } from '../../services/hooks/useProducts';
import { mocked } from 'jest-mock';

jest.mock('../../services/hooks/useProducts');

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                reload: jest.fn()
            }
        }
    }
});

const RequestClose = jest.fn();

describe('ProductModal Component', () => {
    it('Render correctly', () => {
        render(<ProductModal isOpen onRequestClose={RequestClose} />)

        expect(screen.getByText('Cadastrar produto')).toBeInTheDocument();
        expect(screen.getByText('Enviar arquivo')).toBeInTheDocument();
        expect(screen.getByText('Nome')).toBeInTheDocument();
        expect(screen.getByText('Detalhes')).toBeInTheDocument();
        expect(screen.getByText('Preço')).toBeInTheDocument();
        expect(screen.getByText('Quantidade')).toBeInTheDocument();
        expect(screen.getByText('Tipo')).toBeInTheDocument();

        expect(screen.getByPlaceholderText('Hot Roll')).toBeInTheDocument();
        expect(screen.getByTestId('select')).toBeInTheDocument();
        expect(screen.getAllByRole('option')).toHaveLength(7);
        expect(screen.getByRole('button')).toBeInTheDocument();

    })

    it('create new product function render correcly', async () => {
        const createProductsMock = jest.fn();

        const data = [{
            name: 'Item 1',
            image: '/path/to/image1.jpg',
            amount: 1,
            type:'Sushi',
            details:'Lorem ipsum is simply dummy',
            price: 10.99,
        }]

       const mockProducts = {
        products: [],
        CreateProducts:createProductsMock,
        DeleteProduct:jest.fn()
       }

        render(
        <ProductContext.Provider value={mockProducts}>
            <ProductModal isOpen onRequestClose={RequestClose} />
        </ProductContext.Provider>
        )

        const createProductsMocked = mocked(useProducts);
        createProductsMocked.mockReturnValueOnce({
            CreateProducts:createProductsMock
        } as any)

        const submitButton = screen.getByTestId('submit-button');
        const createProduct = createProductsMock(data);

        fireEvent.click(submitButton);

        expect(await createProduct).toBe(undefined);
        fireEvent(window, new Event('beforeunload'));
    })
})