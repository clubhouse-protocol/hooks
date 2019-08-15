import React, { FunctionComponent, useState, Context, useEffect, ReactNode } from 'react';
import context from './context';
import createDB, { DBType } from './data/createDB';
import expandIdentites from './data/expand/identities';
import expandChannels from './data/expand/channels';
import Transporter from 'clubhouse-protocol/build/babel/Transporter';
import { Identity, Channel } from 'clubhouse-protocol';
import uuid from 'uuid/v4';

const ContextProvider = context.Provider;

type ContextType = typeof context extends Context<infer U> ? U : never;
type IdentityType = ContextType['identities'];
type ChannelType = ContextType['channels'];
type ErrorType = ContextType['error'];
type CreateChannelType = ContextType['createChannel'];

interface Props {
  adapter: string;
  children: ReactNode;
  transporter: Transporter;
  loader?: ReactNode;
  onReady: (context: ContextType) => any;
}

const Provider: FunctionComponent<Props> = ({
  children,
  transporter,
  loader = null,
  adapter,
  onReady,
}) => {
  const [loading, setLoading] = useState(true);
  const [db, setDB] = useState<DBType | undefined>();
  const [identities, setIdentities] = useState<IdentityType>();
  const [channels, setChannels] = useState<ChannelType>();
  const [error, setError] = useState<ErrorType>();

  const createChannel: CreateChannelType = async (identityId, name) => {
    if (!db || !identities) {
      throw Error('db not ready');
    }
    const identity = identities.find(i => i.id === identityId);
    if (!identity) {
      throw new Error('Identity not found');
    }
    const id = uuid();
    const key = await Channel.create(identity.identity, []);
    const channel = await Channel.load(identity.identity, key, transporter);
    await db.channels.insert({
      id,
      name,
      identity: identityId,
      key,
      restoreKey: key,
    });
    setChannels([
      ...(channels || []),
      {
        id,
        name,
        identity: identityId,
        channel,
      }
    ]);
  };

  const createIdentity = async (name: string) => {
    if (!db) {
      throw Error('db not ready');
    }
    const id = uuid();
    const key = await Identity.create({ name: 'John Doe', email: 'john.doe@example.com' });
    const identity = await Identity.open(key);
    setIdentities([
      ...(identities || []),
      {
        id,
        identity,
        name,
      },
    ]);
    await db.identities.insert({
      id,
      name,
      key,
    });
  };

  const contextValues: ContextType = {
    db,
    error,
    identities,
    channels,
    createChannel,
    createIdentity,
  };

  useEffect(() => {
    createDB(adapter)
      .then(async nDB => {
        setDB(nDB);
        const nIdentities = await expandIdentites(nDB);
        setIdentities(nIdentities);
        const nChannels = await expandChannels(nDB, nIdentities, transporter);
        setChannels(nChannels);
        setLoading(false);
        if (onReady) {
          onReady(contextValues);
        }
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  });

  

  return (
    <ContextProvider value={contextValues}>
      {loading ? loader : children}
    </ContextProvider>
  )
};

export default Provider;