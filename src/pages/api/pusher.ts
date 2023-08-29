import { NextApiRequest, NextApiResponse } from 'next';
import Pusher from 'pusher';

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'POST') {
    const message = req.body.mensagem;

    // Configurar o Pusher com suas credenciais
    const pusher = new Pusher({
      appId: '1659148',
      key: 'ca4c948ed4ada474279d',
      secret: 'c189fdaaba9313336f23',
      cluster: 'mt1', // Substitua pelo seu cluster
      useTLS: true,
    });

    // Trigger de um evento para o canal "chat"
    pusher.trigger('chat', 'hello', {
      message,
    });

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
};
