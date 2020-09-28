"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = __importDefault(require("mongodb"));
const mgDB = mongodb_1.default.MongoClient;
const mongoConnect = (callback) => {
    mgDB
        .connect('mongodb+srv://aadi:rootadmin@cluster0.b7dxw.mongodb.net/<dbname>?retryWrites=true&w=majority')
        .then(client => {
        console.log('Connected to MongoDB');
        callback(client);
    })
        .catch(console.error);
};
exports.default = module.exports = mongoConnect;
//# sourceMappingURL=db.js.map