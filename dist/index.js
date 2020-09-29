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
exports.getDb = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const shop_1 = __importDefault(require("./routes/shop"));
const admin_1 = __importDefault(require("./routes/admin"));
const mongodb_1 = require("mongodb");
const app = express_1.default();
app.set('view engine', 'ejs');
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('dist'));
app.use('/admin', admin_1.default.router);
app.use(shop_1.default);
function connectionDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield mongodb_1.MongoClient.connect('mongodb+srv://aadi:rootadmin@cluster0.b7dxw.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true });
            console.log('Connected to Database');
            const db = client.db();
            app.listen(8080), console.log('Listening at 8080');
            return db;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
}
exports.getDb = connectionDB();
//# sourceMappingURL=index.js.map