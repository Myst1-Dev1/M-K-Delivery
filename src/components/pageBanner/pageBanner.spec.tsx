import {render, screen} from '@testing-library/react';
import { PageBanner } from '.';

describe('pageBanner Components', () => {
    it('renders correctly', () => {
        render(<PageBanner children />)

        const h1 = screen.getByTestId('h1');

        expect(h1).toBeInTheDocument();
    })
})