import Home from '../../pages';
import {render, screen} from '@testing-library/react';

describe('Home page', () => {
    it('renders correctly', () => {
        render(<Home />)

        expect(screen.getByText('Explore Nosso Menu Tradicional')).toBeInTheDocument;
        expect(screen.getByText('Visite Nosso Restaurante Hoje')).toBeInTheDocument();
        expect(screen.getByText('Aberto 7 Dias por Semana')).toBeInTheDocument();
        
        expect(screen.getByText('Endereço')).toBeInTheDocument();
        expect(screen.getByText('Telefones')).toBeInTheDocument();
        expect(screen.getByText('Emails')).toBeInTheDocument();

        expect(screen.getByTestId('button')).toBeInTheDocument();
    })
})