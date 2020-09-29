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
  res.redirect('/');
};

const getProducts = async (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
  try {
    const products = await Product.fetchAll();
    res.render('admin/products', {
      prods: products,
      pageTitle: 'ADMIN PRODUCTS',
      path: '/admin/products',
    });
  } catch (err) {
    console.log(err);
  }
};
const getEditProduct = async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
  try {
    const prodId: string = req.params.productId;
    const edit = req.query.edit;
    if (edit === 'false') res.redirect('/');
    const prod = await Product.fetchOne(prodId);
    if (prod.length == 0) res.redirect('/');
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: edit,
      product: prod[0],
    });
  } catch (err) {
    console.log(err);
  }
};

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
  getProducts,
  postAddProduct,
  getEditProduct,
  // postEditProduct,
  //   postDeleteProduct,
};
