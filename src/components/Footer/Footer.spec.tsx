import {render, screen} from '@testing-library/react';
import { Footer } from '.';

describe('Footer', () => {
    it('renders correctly', () => {
        render(<Footer />)

        expect(screen.getByText('Categórias')).toBeInTheDocument();
        expect(screen.getByText('Serviços')).toBeInTheDocument();
        expect(screen.getByText('Termos de Privacidade')).toBeInTheDocument();
        expect(screen.getByText('Conta')).toBeInTheDocument();

        expect(screen.getByText('© 2023 Todos os direitos reservados Feito com ❤️ por Myst1 Dev'))
        .toBeInTheDocument();
    })
})