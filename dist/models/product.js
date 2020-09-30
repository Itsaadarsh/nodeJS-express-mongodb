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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const index_1 = require("../index");
class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield index_1.getDb;
                db.collection('products').insertOne(this);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield index_1.getDb;
                db.collection('products').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                    $set: this,
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield index_1.getDb;
                const products = yield db.collection('products').find().toArray();
                return products;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    static fetchOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield index_1.getDb;
                const product = yield db.collection('products').findOne({ _id: new mongodb_1.ObjectId(id) });
                return product;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield index_1.getDb;
                db.collection('products').deleteOne({ _id: new mongodb_1.ObjectId(id) });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.default = module.exports = Product;
//# sourceMappingURL=product.js.map