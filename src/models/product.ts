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

// @Entity()
// export class Product extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column('varchar', { nullable: false, length: 100 })
//   title: string;

//   @Column('numeric', { nullable: false })
//   price: number;

//   @Column('text', { nullable: false })
//   imageUrl: string;

//   @Column('varchar', { nullable: false, length: 255 })
//   description: string;

//   @OneToMany(() => CartItem, cItem => cItem.prodid)
//   cItem: CartItem[];

//   @OneToMany(() => OrderItem, oItem => oItem.prodid)
//   oItem: OrderItem[];

//   @ManyToOne(() => User, user => user.prodId, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
//   @JoinColumn({ referencedColumnName: 'id', name: 'userid' })
//   userid: User;
// }

export default module.exports = Product;
