import { RxJsonSchema } from 'rxdb';

interface BaseMessage {
  id: string;
  received: number;
  channel: string;
  sender?: string;
}

interface TextMessage {
  type: 'text'
  message: string;
}

interface ErrorMessage {
  type: 'error'
  message: string;
}

interface AddMemberMessage {
  type: 'add-member'
  fingerprint: string;
}

interface RemoveMemberMessage {
  type: 'remove-member'
  fingerprint: string;
}

type Message = (TextMessage | ErrorMessage | AddMemberMessage | RemoveMemberMessage) & BaseMessage

const schema: RxJsonSchema<Message> = {
  title: 'Message',
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    type: {
      type: 'string',
    },
    received: {
      type: 'number',
    },
    channel: {
      type: 'string',
    },
    sender: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
    fingerprint: {
      type: 'string',
    },
  }
};

export default schema;
