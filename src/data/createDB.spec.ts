import createDB, { DBType } from './createDB';

describe('data', () => {
  describe('createDB', () => {
    let db:DBType;

    beforeEach(async () => {
      db = await createDB('memory');
    });

    afterEach(async () => {
      await db.db.remove();
    })

    it('should be able to create db', async () => {
      expect(db.db).toBeDefined();
      expect(db.identities).toBeDefined();
      expect(db.channels).toBeDefined();
      expect(db.messages).toBeDefined();
    });

    it('should be able to insert identity', async () => {
      const items1 = await db.identities.find().exec();
      expect(items1.length).toBe(0);
      await db.identities.insert({
        id: 'my-id',
        key: 'my-key',
        name: 'myname',
      });
      const items2 = await db.identities.find().exec();
      expect(items2.length).toBe(1);
    });
  });
});
