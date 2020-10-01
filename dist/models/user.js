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
class User {
    constructor(name, email, cart) {
        this.name = name;
        this.email = email;
        this.cart = cart;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield index_1.getDb;
                const user = db.collection('users').insertOne(this);
                User.userid = yield (yield user).ops[0]._id;
                User.cartItems = yield (yield user).ops[0].cart;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    static cartCheck(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateCart = { items: [] };
            const db = yield index_1.getDb;
            yield db
                .collection('users')
                .updateOne({ _id: new mongodb_1.ObjectId(User.userid) }, { $set: { cart: { items: [Object.assign(Object.assign({}, product), { qty: 1 })] } } });
            User.cartItems = updateCart;
        });
    }
    static addToCart(product) {
        return __awaiter(this, void 0, void 0, function* () {
            if (User.cartItems.items.length == 0) {
                User.cartCheck(product);
            }
            else {
                User.cartItems.items.forEach((i) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    if (((_a = i === null || i === void 0 ? void 0 : i._id) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = product === null || product === void 0 ? void 0 : product._id) === null || _b === void 0 ? void 0 : _b.toString())) {
                        i.qty += 1;
                        const db = yield index_1.getDb;
                        yield db
                            .collection('users')
                            .updateOne({ _id: new mongodb_1.ObjectId(User.userid) }, { $set: { cart: { items: [{ qty: i === null || i === void 0 ? void 0 : i.qty }] } } });
                        User.cartItems = { items: [Object.assign(Object.assign({}, product), { qty: i.qty })] };
                    }
                    else {
                        User.cartCheck(product);
                    }
                }));
            }
        });
    }
    static findByID(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield index_1.getDb;
                const user = db.collection('users').findOne({ _id: new mongodb_1.ObjectId(userID) });
                return user;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        });
    }
}
exports.default = module.exports = User;
//# sourceMappingURL=user.js.map