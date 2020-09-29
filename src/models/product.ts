// import { db } from '../index';
// console.log(db);

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
