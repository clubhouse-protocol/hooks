import context from '../context';
import { useContext } from 'react';

const useIdentities = () => {
  const {
    identities,
    createIdentity,
  } = useContext(context);

  return {
    identities: identities || [],
    createIdentity,
  };
};

export default useIdentities;