"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
const user_1 = __importDefault(require("../models/user"));
const getAddProduct = (_req, res, _next) => {
    res.render('admin/edit-product', {
        pageTitle: 'ADD PRODUCTS',
        path: '/admin/add-product',
        editing: false,
    });
};
const postAddProduct = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = +req.body.price;
    const description = req.body.description;
    const prod = new product_1.default(title, price, description, imageUrl, user_1.default.userid);
    yield prod.save();
    setTimeout(() => {
        res.redirect('/');
    }, 600);
});
const getProducts = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.adminFetchAll(user_1.default.userid);
        res.render('admin/products', {
            prods: products,
            pageTitle: 'ADMIN PRODUCTS',
            path: '/admin/products',
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getEditProduct = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prodId = req.params.productId;
        const edit = req.query.edit;
        if (edit === 'true') {
            const prod = yield product_1.default.fetchOne(prodId);
            if (!prod) {
                res.redirect(`/${prodId}`);
                return;
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: edit,
                product: prod,
            });
        }
        else {
            res.redirect('/admin/products');
            return;
        }
    }
    catch (err) {
        console.log(err);
    }
});
const postEditProduct = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prodId = req.body.productId;
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = +req.body.price;
        const description = req.body.description;
        const prod = new product_1.default(title, price, description, imageUrl, user_1.default.userid);
        yield prod.update(prodId);
        res.redirect('/admin/products');
    }
    catch (err) {
        console.log(err);
    }
});
const postDeleteProduct = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const prodId = req.body.productId;
    yield product_1.default.delete(prodId);
    res.redirect('/admin/products');
});
exports.default = module.exports = {
    getAddProduct,
    getProducts,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct,
};
//# sourceMappingURL=admin.js.map