import * as RxDB from 'rxdb';
import identitySchema from './schemas/identity';
import channelSchema from './schemas/channel';
import messageSchema from './schemas/message';
import { RxJsonSchema } from 'rxdb';

type GetSchemaType<T> = T extends RxJsonSchema<infer U> ? U : never;

const create = async (adapter: string) => {
  const db = await RxDB.create({
    name: 'clubhouseprotocol',
    adapter,
    ignoreDuplicate: true,
  });


  const identities = await db.collection<GetSchemaType<typeof identitySchema>>({
    name: 'identities',
    schema: identitySchema,
  });

  const channels = await db.collection<GetSchemaType<typeof channelSchema>>({
    name: 'channels',
    schema: channelSchema,
  });

  const messages = await db.collection<GetSchemaType<typeof messageSchema>>({
    name: 'messages',
    schema: messageSchema,
  });

  return {
    db,
    identities,
    channels,
    messages,
  };
}

type GetPromiseType<T> = T extends Promise<infer U> ? U : never;
type DBType = GetPromiseType<ReturnType<typeof create>>;

export {
  DBType,
}

export default create;
