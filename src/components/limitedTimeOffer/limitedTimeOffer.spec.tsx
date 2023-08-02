import {act, render , screen, waitFor} from '@testing-library/react';
import { LimitedTimeOffer } from '.';

jest.useFakeTimers();

describe('limitedTimeOffer Component', () => {
    it('renders correctly', () => {
        render(<LimitedTimeOffer />)

        expect(screen.getByText('Oferta por Tempo limitado')).toBeInTheDocument();
        expect(screen.getByText('Rodizio de Japa com 35% de Desconto')).toBeInTheDocument();
        expect(screen.getByText('Dias')).toBeInTheDocument();
        expect(screen.getByText('Horas')).toBeInTheDocument();
        expect(screen.getByText('Minutos')).toBeInTheDocument();
        expect(screen.getByText('Segundos')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    })

    it('renders timeOut offer', async () => {
        render(<LimitedTimeOffer />);

        const days:any = screen.getByTestId('days');
        const hours:any = screen.getByTestId('hours');
        const minutes:any = screen.getByTestId('minutes');
        const seconds:any = screen.getByTestId('seconds');

        expect(days).toHaveTextContent('0');
        expect(hours).toHaveTextContent('0');
        expect(minutes).toHaveTextContent('0');
        expect(seconds).toHaveTextContent('0');

        act(() => {
            jest.advanceTimersByTime(1); // antes era 1000 oq fazia dias horas minutos e sec mudarem
        })

        expect(days).toHaveTextContent('0');
        expect(hours).toHaveTextContent('0');
        expect(minutes).toHaveTextContent('0');
        expect(seconds).toHaveTextContent('0');
    })
})