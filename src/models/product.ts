import { ObjectId } from 'mongodb';
import { getDb } from '../index';

interface PRODUCTS {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

class Product {
  constructor(
    public title: string,
    public price: number,
    public description: string,
    public imageUrl: string
  ) {}

  async save() {
    try {
      const db = await getDb;
      const result = db.collection('products').insertOne(this);
    } catch (err) {
      console.log(err);
    }
  }

  async update(id: string) {
    try {
      const db = await getDb;
      const updateProd = await db.collection('products').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title: this.title,
            price: this.price,
            description: this.description,
            imageUrl: this.imageUrl,
          },
        }
      );
      console.log(updateProd);
    } catch (err) {
      console.log(err);
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
      const product: Array<PRODUCTS> = await db
        .collection('products')
        .find({ _id: new ObjectId(id) })
        .toArray()!;
      return product;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default module.exports = Product;
