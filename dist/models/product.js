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
                const result = db.collection('products').insertOne(this);
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
                const updateProd = yield db.collection('products').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                    $set: {
                        title: this.title,
                        price: this.price,
                        description: this.description,
                        imageUrl: this.imageUrl,
                    },
                });
                console.log(updateProd);
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
                const product = yield db
                    .collection('products')
                    .find({ _id: new mongodb_1.ObjectId(id) })
                    .toArray();
                return product;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
}
exports.default = module.exports = Product;
//# sourceMappingURL=product.js.map