import Product from '../models/product';
import express from 'express';
// import { User } from '../models/user';

const getAddProduct = (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.render('admin/edit-product', {
    pageTitle: 'ADD PRODUCTS',
    path: '/admin/add-product',
    editing: false,
  });
};

const postAddProduct = (req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const prod = new Product(title, price, description, imageUrl);
  prod.save();
  res.redirect('/admin/add-product');
};

// const getProducts = (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
//   Product.find({ where: { userid: 1 } })
//     .then(products => {
//       res.render('admin/products', {
//         prods: products,
//         pageTitle: 'ADMIN PRODUCTS',
//         path: '/admin/products',
//       });
//     })
//     .catch(console.log);
// };

// const getEditProduct = (req: express.Request, res: express.Response, _next: express.NextFunction) => {
//   const prodId = +req.params.productId;
//   const edit = req.query.edit;
//   if (edit === 'false') res.redirect('/');
//   Product.findOne({ id: +prodId })
//     .then(prod => {
//       if (!prod) res.redirect('/');
//       res.render('admin/edit-product', {
//         pageTitle: 'Edit Product',
//         path: '/admin/edit-product',
//         editing: edit,
//         product: prod,
//       });
//     })
//     .catch(console.log);
// };

// const postEditProduct = (req: express.Request, res: express.Response, _next: express.NextFunction) => {
//   const prodId: number = +req.body.productId;
//   if (typeof prodId === 'number') {
//     Product.update(
//       { id: prodId },
//       {
//         title: req.body.title,
//         imageUrl: req.body.imageUrl,
//         price: req.body.price,
//         description: req.body.description,
//       }
//     );
//     setTimeout(() => {
//       res.redirect('/admin/products');
//     }, 500);
//   }
// };

// const postDeleteProduct = (req: express.Request, res: express.Response, _next: express.NextFunction) => {
//   const prodId: number = +req.body.productId;
//   if (typeof prodId === 'number') {
//     Product.delete({ id: prodId });
//     setTimeout(() => {
//       res.redirect('/admin/products');
//     }, 500);
//   }
// };

export default module.exports = {
  getAddProduct,
  //   getProducts,
  postAddProduct,
  //   getEditProduct,
  //   postEditProduct,
  //   postDeleteProduct,
};
