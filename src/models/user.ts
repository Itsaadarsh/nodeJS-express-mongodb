import { ObjectId } from 'mongodb';
import { getDb } from '../index';
import { CART, PRODUCTS } from '../controllers/interface/shop';

class User {
  static userid: string;
  constructor(public name: string, public email: string, public cart: CART) {}

  async save() {
    try {
      const db = await getDb;
      const user = db.collection('users').insertOne(this);
      User.userid = await (await user).ops[0]._id;
    } catch (err) {
      console.log(err);
    }
  }

  static async addToCart(product: PRODUCTS) {
    const updateCart: CART = { items: [{ ...product, qty: 1 }] };
    const db = await getDb;
    const updated = db
      .collection('users')
      .updateOne({ _id: new ObjectId(User.userid) }, { $set: { cart: updateCart } });
    return updated;
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
