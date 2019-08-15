import { RxJsonSchema } from 'rxdb';

interface Channel {
  id: string;
  name: string;
  key: string;
  identity: string;
  restoreKey: string;
}

const schema: RxJsonSchema<Channel> = {
  title: 'Channel',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    name: {
      type: 'string',
    },
    identity: {
      type: 'string',
    },
    key: {
      type: 'string',
    },
    restoreKey: {
      type: 'string',
    },
  }
};

export default schema;
