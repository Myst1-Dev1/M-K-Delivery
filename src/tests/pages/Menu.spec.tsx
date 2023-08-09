import { AuthContext } from '../../contexts/AuthContext';
import Menu, { getStaticProps } from '../../pages/menu';
import {render, screen} from '@testing-library/react';

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
});

const data = [{
    _id:'1',
    name: 'Item 1',
    image: '/path/to/image1.jpg',
    amount: 1,
    details:'Lorem ipsum is simply dummy',
    type:'Sushi',
    price: 10.99,
}]

describe('Menu page', () => {
    it('renders correctly', () => {
        render(<Menu data={data}/>)

        expect(screen.getByText('Menu')).toBeInTheDocument(); 
    })

    it('render create new product button when user is admin', () => {
        const user = {
            firstname: 'John',
            lastname: 'Doe',
            isAdmin:true
          };
      
          const mockAuthContext:any = {
            isAuthenticated: true,
            user: user,
          };

          render(
          <AuthContext.Provider value={mockAuthContext}>
            <Menu data={data} />
          </AuthContext.Provider>)

          expect(screen.getByText('Criar novo produto')).toBeInTheDocument();
    })

    it('Not render create new product button when user not is admin', () => {
        const user = {
            firstname: 'John',
            lastname: 'Doe',
            isAdmin:false
          };
      
          const mockAuthContext:any = {
            isAuthenticated: false,
            user: user,
          };

          render(
          <AuthContext.Provider value={mockAuthContext}>
            <Menu data={data} />
          </AuthContext.Provider>)

          // Diferente do getByText com query eu consigo verificar se algo não está no documento
          const createNewProductButton = screen.queryByTestId('create-new-product-button');
          expect(createNewProductButton).toBeNull();
    })

    it('render static props data', async () => {
      render(<Menu data={data} />)

      const response = [{
        _id:1,
        name:'Teste',
        image:'/path/to/image2.png',
        amount:1,
        details:'John impsum',
        type:'Carne',
        price:12.45
      }]

      const result = await getStaticProps({});

      expect(result).toEqual(
        expect.objectContaining(response)
      )
    })
})