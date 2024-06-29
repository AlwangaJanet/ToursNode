"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const tourRoutes_1 = __importDefault(require("./routes/tourRoutes"));
const hotelRoutes_1 = __importDefault(require("./routes/hotelRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)(); //  initialize the application
app.use((0, express_1.json)()); //add a body to the requests
app.use((0, cors_1.default)());
// add all the middlewares and urls
app.use('/auth', authRoutes_1.default);
app.use('/users', usersRoutes_1.default);
app.use('/tours', tourRoutes_1.default);
app.use('/hotels', hotelRoutes_1.default);
// start the application
app.listen(4000, () => {
    console.log('Server Running..');
});
