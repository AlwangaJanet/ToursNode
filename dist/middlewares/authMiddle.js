"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserOrAdmin = exports.isAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function verifyToken(req, res, next) {
    var _a;
    try {
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Forbidden' });
        }
        const decodedData = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.info = decodedData;
        next();
    }
    catch (error) {
        return res.status(500).json({ message: 'Invalid Token' });
    }
}
exports.verifyToken = verifyToken;
function isAdmin(req, res, next) {
    var _a;
    if ((_a = req.info) === null || _a === void 0 ? void 0 : _a.isAdmin) {
        next();
    }
    else {
        res.status(403).json({ message: 'Admin access required' });
    }
}
exports.isAdmin = isAdmin;
function isUserOrAdmin(req, res, next) {
    var _a, _b;
    if (((_a = req.info) === null || _a === void 0 ? void 0 : _a.id) === req.params.id || ((_b = req.info) === null || _b === void 0 ? void 0 : _b.isAdmin)) {
        next();
    }
    else {
        res.status(403).json({ message: 'Access denied' });
    }
}
exports.isUserOrAdmin = isUserOrAdmin;
