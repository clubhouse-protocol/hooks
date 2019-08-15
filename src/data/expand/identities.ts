import { Identity } from 'clubhouse-protocol';
import { DBType } from "../createDB";

const expandIdentites = async (
  db: DBType,
) => {
  const identitityData = await db.identities.find().exec();
  const result = await Promise.all(identitityData.map(async (data) => {
    const identity = await Identity.open(data.key);
    return {
      id: data.id,
      name: data.name,
      identity,
    }
  }));
  return result;
};

export default expandIdentites;
