import { useContext, createContext, ReactNode, useState, useEffect, FormEvent } from 'react';
import Pusher from 'pusher-js';
import { setCookie } from 'nookies';
import { OrdersContext } from './useOrders';
import { Order } from '../../types/Order';

type ChatContextData = {
    newMessage:string;
    setNewMessage:any;
    message:[] | any;
    setMessage:any;
    sendMessage:(e:FormEvent) => void;
    chat:boolean;
    setChat:any;
    handleOpenChat:(name:string) => void;
    userName:orderUserData[];
}

type ChatProviderProps = {
    children: ReactNode;
}

type orderUserData = {
  data:Order;
}

export const ChatContext = createContext(
    {} as ChatContextData);

export function ChatProvider({children}:ChatProviderProps) {
    const [message, setMessage] = useState<[] | any>([]);
    const [userName, setUserName] = useState<orderUserData[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [chat, setChat ] = useState(false);

    const { orders } = useContext(OrdersContext);

    useEffect(() => {
        // Configurar o cliente Pusher com suas credenciais
        const pusher = new Pusher('ca4c948ed4ada474279d', {
          cluster: 'mt1', // Substitua pelo seu cluster
        });
    
        // Subscrever o canal de chat
        const channel = pusher.subscribe('chat');
    
        // Ouça por eventos de nova mensagem
        channel.bind('hello', (data:any) => {
            setMessage([...message, data.message]);
            setCookie(undefined, 'message-token', JSON.stringify(data.message), {
                maxAge: 60 * 60 * 2 // 2 hours
            });
        });
    
        return () => {
          pusher.unbind('chat');
          pusher.unsubscribe('chat');
        };
      }, [message]);  

       function sendMessage (e:FormEvent) {
        e.preventDefault();
            
          // Enviar a mensagem para o servidor Pusher
          fetch('/api/pusher', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({message:newMessage}),
          });
      
          // Limpar o campo de entrada
          setNewMessage('');
      };

      function handleOpenChat(name:string) {
        if(orders !== undefined) {
          
          const orderUserName = orders.find(order => order.name === name);

          const orderNameItem:orderUserData = {
            data:orderUserName!
          }

          const newOrderUserName = [...userName, orderNameItem];
          setUserName(newOrderUserName);
        } else {
          console.log('Tivemos um erro', name)
        }
        setChat(true);
      }
      

    return (
        <ChatContext.Provider value={{
            newMessage, 
            setNewMessage,
            message,
            setMessage,
            sendMessage,
            chat,
            setChat,
            handleOpenChat,
            userName}}>
            {children}
        </ChatContext.Provider>
    )
}

export function useChat() {
    const context = useContext(ChatContext);

    return context;
}