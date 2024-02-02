"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./src/app"));
app_1.default.set('port', process.env.PORT);
app_1.default.listen(app_1.default.get('port'));
// console.log(`server run in http://localhost:${app.get('port')}`)
//# sourceMappingURL=index.js.map