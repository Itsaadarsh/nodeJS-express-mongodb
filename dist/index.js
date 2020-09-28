"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./utils/db"));
const app = express_1.default();
app.set('view engine', 'ejs');
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static('dist'));
app.get('/', (_req, res, _next) => {
    res.send(`<h1>Hey Mofos</h1>`);
});
db_1.default((client) => {
    console.log(client);
    app.listen(8080), console.log('Listening at 8080');
});
//# sourceMappingURL=index.js.map