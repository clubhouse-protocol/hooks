import { RxJsonSchema } from 'rxdb';

interface Identity {
  id: string;
  name: string;
  key: string;
}

const schema: RxJsonSchema<Identity> = {
  title: 'Identity',
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
    key: {
      type: 'string',
    },
  },
  required: ['id', 'name', 'key'],
};

export default schema;
