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
exports.getHome = void 0;
const product_1 = __importDefault(require("../models/product"));
exports.getHome = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.fetchAll();
        res.render('shop/index', {
            prods: products,
            pageTitle: 'SHOP',
            path: '/',
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getProducts = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.fetchAll();
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'ALL PRODUCTS',
            path: '/products',
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getProduct = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const prodID = req.params.productId;
    const prod = yield product_1.default.fetchOne(prodID);
    res.render('shop/product-detail', {
        product: prod[0],
        pageTitle: prod[0].title,
        path: '/products',
    });
});
exports.default = module.exports = {
    getHome: exports.getHome,
    getProducts,
    getProduct,
};
//# sourceMappingURL=shop.js.map