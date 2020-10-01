import Product from '../models/product';
import express from 'express';
import User from '../models/user';

export const getHome = async (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
  try {
    const products = await Product.fetchAll();
    res.render('shop/index', {
      prods: products,
      pageTitle: 'SHOP',
      path: '/',
    });
  } catch (err) {
    console.log(err);
  }
};

const getProducts = async (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
  try {
    const products = await Product.fetchAll();
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'ALL PRODUCTS',
      path: '/products',
    });
  } catch (err) {
    console.log(err);
  }
};

const getProduct = async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const prodID: string = req.params.productId;
  const prod = await Product.fetchOne(prodID);
  if (prod) {
    res.render('shop/product-detail', {
      product: prod,
      pageTitle: prod!.title,
      path: '/products',
    });
  } else {
    res.redirect(`/${prodID}`);
    return;
  }
};

// const getCart = (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
//   const product: CartItems[] = [];
//   CartItem.find({ relations: ['prodid'] })
//     .then(citem => {
//       citem.forEach(item => {
//         product.push({ id: item.id, title: item.prodid.title, cartItem: { quantity: item.quantity } });
//       });
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your Cart',
//         products: product,
//       });
//     })
//     .catch(console.log);
// };

const postCart = async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const prodID: string = req.body.productId;
  const product = Product.fetchOne(prodID);
  User.addToCart(await product);
  res.redirect('/');
};

// const postDeleteCart = (req: express.Request, res: express.Response, _next: express.NextFunction) => {
//   const prodId: number = +req.body.productId;
//   CartItem.delete({ id: prodId });
//   setTimeout(() => {
//     res.redirect('/cart');
//   }, 300);
// };

// const getOrders = (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
//   const orders: OrderItems[] = [];
//   OrderItem.find({ relations: ['orderid', 'prodid'], order: { id: 'ASC' } })
//     .then(ord => {
//       ord.forEach(singleOrd => {
//         orders.push({
//           id: singleOrd.id,
//           products: [{ title: singleOrd.prodTitle, qty: singleOrd.quantity }],
//         });
//       });
//       res.render('shop/orders', {
//         path: '/orders',
//         pageTitle: 'Your Orders',
//         orders: orders,
//       });
//     })
//     .catch(console.log);
// };

// const postOrder = (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
//   User.find({ select: ['id'] })
//     .then(userId => {
//       const userID = userId[userId.length - 1];
//       const order = new Order();
//       order.userid = userID;
//       order.save();

//       setTimeout(() => {
//         Order.find({ relations: ['userid'], where: { userid: userID }, order: { id: 'DESC' }, take: 1 })
//           .then(ord => {
//             CartItem.find({ relations: ['cartid', 'prodid'], where: { cartid: userID } })
//               .then(cItem => {
//                 cItem.forEach(oItem => {
//                   const orderItem = new OrderItem();
//                   orderItem.quantity = oItem.quantity;
//                   orderItem.prodTitle = oItem.prodid.title;
//                   orderItem.orderid = ord[0];
//                   orderItem.prodid = oItem.prodid;
//                   orderItem.save();
//                   CartItem.delete({ cartid: userID });
//                 });
//                 setTimeout(() => {
//                   res.redirect('/orders');
//                 }, 300);
//               })
//               .catch(console.log);
//           })
//           .catch(console.log);
//       }, 700);
//     })
//     .catch(console.log);
// };

export default module.exports = {
  getHome,
  getProducts,
  //   getCart,
  //   getOrders,
  //   postOrder,
  getProduct,
  postCart,
  //   postDeleteCart,
};
