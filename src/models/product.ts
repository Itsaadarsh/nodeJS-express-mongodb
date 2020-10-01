import { ObjectId } from 'mongodb';
import { getDb } from '../index';
import { PRODUCTS } from '../controllers/interface/shop';

class Product {
  constructor(
    public title: string,
    public price: number,
    public description: string,
    public imageUrl: string,
    public userId: string
  ) {}

  async save() {
    try {
      const db = await getDb;
      db.collection('products').insertOne(this);
    } catch (err) {
      console.log(err);
    }
  }

  async update(id: string) {
    try {
      const db = await getDb;
      db.collection('products').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: this,
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  static async adminFetchAll(id: string) {
    try {
      const db = await getDb;
      const products: Array<PRODUCTS> = await db
        .collection('products')
        .find({ userId: new ObjectId(id) })
        .toArray();
      return products;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async fetchAll() {
    try {
      const db = await getDb;
      const products: Array<PRODUCTS> = await db.collection('products').find().toArray();
      return products;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async fetchOne(id: string) {
    try {
      const db = await getDb;
      const product: PRODUCTS = await db.collection('products').findOne({ _id: new ObjectId(id) })!;
      return product;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  static async delete(id: string) {
    try {
      const db = await getDb;
      db.collection('products').deleteOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
    }
  }
}

export default module.exports = Product;
