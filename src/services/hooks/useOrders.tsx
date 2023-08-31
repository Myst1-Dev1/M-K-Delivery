import { createContext, useContext, useState, useEffect ,ReactNode } from 'react';
import { setCookie, parseCookies } from 'nookies';
import { Order } from '../../types/Order';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export const OrdersContext = createContext(
    {} as OrdersContextData);

type OrdersContextData = {
    orders: any;
    handleCreateOrder:(order:Order) => void;
    orderStatus:string;
    setOrderStatus:any;
    handleChangeOrderStatus:(status:string) => void;
}

type OrdersProviderProps = {
    children: ReactNode
}

export function OrdersProvider({children}:OrdersProviderProps) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [orderStatus , setOrderStatus] = useState('');

    const router = useRouter();

    function handleCreateOrder(order:Order) {
        // Atualize o estado com o novo pedido
        setOrders((prevOrders) => [...prevOrders, order]);

        // Salve o pedido nos cookies
        setCookie(null, 'orders-token', JSON.stringify([...orders, order]), {
            maxAge: 30 * 24 * 60 * 60, // Tempo de vida do cookie em segundos (30 dias neste exemplo)
        });
    }

    function handleChangeOrderStatus(status:string) {
        setOrderStatus(status);

        if(status === 'Em progresso') {
            toast.success('Pedido aceito com sucesso', {
                position:toast.POSITION.TOP_RIGHT,
                theme:'colored'
            })
        }

        if(status === 'Concluido') {
            toast.success('Pedido recebido com sucesso', {
                position:toast.POSITION.TOP_RIGHT,
                theme:'colored'
            })
        }
        if(status === 'Recusado') {
            toast.error('Pedido recusado com sucesso', {
                position:toast.POSITION.TOP_RIGHT,
                theme:'colored'
            })
        }

        //router.push('/ordersInProgress');
    }
    
    useEffect(() => {
        const {'orders-token': orderCookie} = parseCookies();
        
        if(orderCookie) {
            setOrders(JSON.parse(orderCookie))
        }

    }, []) 

    return (
        <OrdersContext.Provider value={{
            orders,
            handleCreateOrder,
            orderStatus,
            setOrderStatus,
            handleChangeOrderStatus}}>
            {children}
        </OrdersContext.Provider>
    )
}

export function useOrders() {
    const context = useContext(OrdersContext);

    return context;
}