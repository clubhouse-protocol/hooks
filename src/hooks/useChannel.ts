import context from '../context';
import { useContext } from 'react';

const useChannel = (id: string) => {
  const {
    channels = [],
    identities = [],
  } = useContext(context);

  const channel = channels.find(i => i.id === id);
  if (!channel) {
    return {}
  }
  const identity = identities.find(i => i.id === channel.identity);
  if (!identity) {
    return {}
  }

  return {
    channel,
    identity,
  };
};

export default useChannel;