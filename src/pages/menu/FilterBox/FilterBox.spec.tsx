import {render, screen} from '@testing-library/react';
import { FilterBox } from './FilterBox';
import { cleanSearch, searchSushiFood } from './FilterFunctions';

const setFilter = jest.fn();

describe('FilterBox Component', () => {
    it('renders correctly', () => {
        render(<FilterBox onSetFilter={setFilter} />)

        expect(screen.getByText('Sushi')).toBeInTheDocument();
        expect(screen.getByText('Stephan Buckridge')).toBeInTheDocument();
        expect(screen.getByText('Proprietário')).toBeInTheDocument();
    })

    it('render product by type after filter', () => {
        render(<FilterBox onSetFilter={setFilter} />)
        
        const data:any = [{
            name: 'Item 1',
            image: '/path/to/image1.jpg',
            amount: 1,
            details:'Lorem ipsum is simply dummy',
            type:'Sushi',
            price: 10.99,
        }]

        searchSushiFood(data, setFilter)

        expect(setFilter).toHaveBeenCalledWith(
            [{
                name: 'Item 1',
                image: '/path/to/image1.jpg',
                amount: 1,
                details:'Lorem ipsum is simply dummy',
                type:'Sushi',
                price: 10.99,
            }]
        );
    })

    it('clean filter and render all products', () => {
        render(<FilterBox onSetFilter={setFilter} />)
        
        const data:any = [{
            name: 'Item 1',
            image: '/path/to/image1.jpg',
            amount: 1,
            details:'Lorem ipsum is simply dummy',
            type:'Sushi',
            price: 10.99,   
        },
        {
            name: 'Item 2',
            image: '/path/to/image2.jpg',
            amount: 1,
            details:'John ipsum is simply dummy',
            type:'Carne',
            price: 12.99,        
        }
        ]

        cleanSearch(data, setFilter)

        expect(setFilter).toHaveBeenCalledWith(
            [{
                name: 'Item 1',
                image: '/path/to/image1.jpg',
                amount: 1,
                details:'Lorem ipsum is simply dummy',
                type:'Sushi',
                price: 10.99,   
            },
            {
                name: 'Item 2',
                image: '/path/to/image2.jpg',
                amount: 1,
                details:'John ipsum is simply dummy',
                type:'Carne',
                price: 12.99,        
            }
            ]
        )
    })
})