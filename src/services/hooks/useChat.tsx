import { useContext, createContext, ReactNode, useState, useEffect, FormEvent } from 'react';
import Pusher from 'pusher-js';
import { setCookie } from 'nookies';

type ChatContextData = {
    newMessage:string;
    setNewMessage:any;
    message:[] | any;
    setMessage:any;
    sendMessage:(e:FormEvent) => void;
}

type ChatProviderProps = {
    children: ReactNode;
}

export const ChatContext = createContext(
    {} as ChatContextData);

export function ChatProvider({children}:ChatProviderProps) {
    const [message, setMessage] = useState<[] | any>([]);
    const [newMessage, setNewMessage] = useState('');

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
          body: JSON.stringify({ mensagem: newMessage }),
        });
    
        // Limpar o campo de entrada
        setNewMessage('');
      };

    return (
        <ChatContext.Provider value={{
            newMessage, 
            setNewMessage,
            message,
            setMessage,
            sendMessage}}>
            {children}
        </ChatContext.Provider>
    )
}

export function useChat() {
    const context = useContext(ChatContext);

    return context;
}