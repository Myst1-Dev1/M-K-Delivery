import { createContext, useContext, useState, useEffect ,ReactNode } from 'react';
import { setCookie, parseCookies } from 'nookies';
import { Order } from '../../types/Order';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export const OrdersContext = createContext(
    {} as OrdersContextData);

type OrdersContextData = {
    orders: Order[];
    handleCreateOrder:(order:Order) => void;
    orderStatus:string;
    setOrderStatus:any;
    handleChangeOrderStatus:(status:string, name:string) => void;
}

type OrdersProviderProps = {
    children: ReactNode
}

type Status = {
    name:Order;
}

export function OrdersProvider({children}:OrdersProviderProps) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [orderStatus , setOrderStatus] = useState('');

    const router = useRouter();

    function handleCreateOrder(order:Order) {
        setOrders((prevOrders) => [...prevOrders, order]);

        // Salve o pedido nos cookies
        setCookie(null, 'orders-token', JSON.stringify([...orders, order]), {
            maxAge: 30 * 24 * 60 * 60, 
        });

        toast.success('Pedido feito com sucesso', {
            position:toast.POSITION.TOP_RIGHT,
            theme:'colored'
        })
    }

    function handleChangeOrderStatus(status:string, name:string) {
        const newOrder = orders.find(order => order.name === name);
        
        if(newOrder) {
            setOrderStatus(status);
            setCookie(null, 'status-token', JSON.stringify(status), {
                maxAge:30 * 24 * 60 * 60,
            })
        } else {
            console.log('tivemos um erro');
        }

        // if(status === 'Em progresso') {
        //     toast.success('Pedido aceito com sucesso', {
        //         position:toast.POSITION.TOP_RIGHT,
        //         theme:'colored'
        //     })
        //     router.push('/ordersInProgress');
        // }

        // if(status === 'Concluido') {
        //     toast.success('Pedido recebido com sucesso', {
        //         position:toast.POSITION.TOP_RIGHT,
        //         theme:'colored'
        //     })
        // }
        // if(status === 'Recusado') {
        //     toast.error('Pedido recusado com sucesso', {
        //         position:toast.POSITION.TOP_RIGHT,
        //         theme:'colored'
        //     })
        // }
        console.log('achei ele', name);
    }
    
    useEffect(() => {
        const {'orders-token': orderCookie} = parseCookies();
        
        if(orderCookie) {
            setOrders(JSON.parse(orderCookie))
        }

    }, [])

    useEffect(() => {
        const {'status-token': statusCookie} = parseCookies();
        
        if(statusCookie) {
            setOrderStatus(JSON.parse(statusCookie))
        }

    }, []) 

    return (
        <OrdersContext.Provider value={{
            orders,
            handleCreateOrder,
            orderStatus,
            setOrderStatus,
            handleChangeOrderStatus
            }}>
            {children}
        </OrdersContext.Provider>
    )
}

export function useOrders() {
    const context = useContext(OrdersContext);

    return context;
}