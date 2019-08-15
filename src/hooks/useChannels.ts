import context from '../context';
import { useContext } from 'react';

const useChannels = () => {
  const {
    channels,
    createChannel,
  } = useContext(context);

  return {
    channels: channels || [],
    createChannel,
  };
};

export default useChannels;