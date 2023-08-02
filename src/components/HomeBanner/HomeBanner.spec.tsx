import {render, screen} from '@testing-library/react';
import { HomeBanner } from '.';

describe('HomeBanner Component', () => {
    it('renders correctly', () => {
        render(<HomeBanner />)

        expect(screen.getByText('Experimente o Nosso Delicioso Menu')).toBeInTheDocument();
        expect(screen.getByTestId('p')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    })
})