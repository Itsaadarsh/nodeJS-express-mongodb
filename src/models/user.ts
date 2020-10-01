import { ObjectId } from 'mongodb';
import { getDb } from '../index';
import { CART, PRODUCTS } from '../controllers/interface/shop';

class User {
  static userid: string;
  static cartItems: CART;
  constructor(public name: string, public email: string, public cart: CART) {}

  async save() {
    try {
      const db = await getDb;
      const user = db.collection('users').insertOne(this);
      User.userid = await (await user).ops[0]._id;
      User.cartItems = await (await user).ops[0].cart;
    } catch (err) {
      console.log(err);
    }
  }

  static async cartCheck(product: PRODUCTS) {
    const updateCart: CART = { items: [] };
    const db = await getDb;
    await db
      .collection('users')
      .updateOne({ _id: new ObjectId(User.userid) }, { $set: { cart: { items: [{ ...product, qty: 1 }] } } });
    User.cartItems = updateCart;
  }

  static async addToCart(product: PRODUCTS) {
    if (User.cartItems.items.length == 0) {
      User.cartCheck(product);
    } else {
      User.cartItems.items.forEach(async i => {
        if (i?._id?.toString() === product?._id?.toString()) {
          i!.qty += 1;
          const db = await getDb;
          await db
            .collection('users')

            .updateOne({ _id: new ObjectId(User.userid) }, { $set: { cart: { items: [{ qty: i?.qty }] } } });
          User.cartItems = { items: [{ ...product, qty: i!.qty }] };
        } else {
          User.cartCheck(product);
        }
      });
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
