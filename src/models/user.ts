import { ObjectId } from 'mongodb';
import { getDb } from '../index';

class User {
  static userid: string;
  constructor(public name: string, public email: string) {}

  async save() {
    try {
      const db = await getDb;
      const user = db.collection('users').insertOne(this);
      User.userid = await (await user).ops[0]._id;
    } catch (err) {
      console.log(err);
    }
  }

  static async findByID(userID: string) {
    try {
      const db = await getDb;
      const user = db.collection('users').findOne({ _id: new ObjectId(userID) });
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default module.exports = User;
