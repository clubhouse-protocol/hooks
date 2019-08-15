import context from '../context';
import { useContext, useState, useEffect } from 'react';
import useChannel from './useChannel';

const useMessages = (channelId: string) => {
  const {
    db,
  } = useContext(context);
  const { identity, channel } = useChannel(channelId);
  const [messages, setMessages] = useState();

  useEffect(() => {
    if (!db) return;

    const subscriptions = db.messages.find().$.subscribe((elements) => {
      setMessages(elements);
    });

    return () => {
      subscriptions.unsubscribe();
    };
  }, [db, channelId]);

  return {
    channel,
    identity,
    messages,
  }
}

export default useMessages;