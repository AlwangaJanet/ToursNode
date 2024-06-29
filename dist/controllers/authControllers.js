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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const databaseHelpers_1 = require("../databaseHelpers");
const dotenv_1 = __importDefault(require("dotenv"));
const helpers_1 = require("../helpers");
const nodemailer_1 = require("../nodemailer");
dotenv_1.default.config();
const dbHelper = new databaseHelpers_1.DbHelper();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = helpers_1.registerSchema.validate(req.body);
        if (error) {
            console.error('Validation error:', error.details[0].message);
            return res.status(400).json({ error: error.details[0].message });
        }
        const { name, email, password, isAdmin } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = {
            id: (0, uuid_1.v4)(),
            name,
            email,
            password: hashedPassword,
            isAdmin,
            isDeleted: 0,
            isEmailSent: 0,
        };
        console.log('User data to insert:', user);
        yield dbHelper.exec('addUser', {
            id: user.id,
            name: user.name,
            Email: user.email,
            password: user.password,
            isAdmin: user.isAdmin,
            isDeleted: user.isDeleted,
            isEmailSent: user.isEmailSent,
        });
        yield (0, nodemailer_1.sendRegisterEmail)(user);
        res.status(201).json({ message: 'User successfully registered...' });
    }
    catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield dbHelper.get('getUserByEmail', { email });
        if (!user) {
            return res.status(404).json({ message: 'User not found...' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required.' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials!!' });
        }
        const token = jsonwebtoken_1.default.sign({ Sub: user.id, Name: user.name, isAdmin: user.isAdmin }, process.env.SECRET, { expiresIn: '2h' });
        res.json({ token });
    }
    catch (err) {
        console.error('Error during user login:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield dbHelper.getAll('getUsers');
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield dbHelper.get('getUser', { id: req.params.id });
        if (!user)
            return res.status(404).json({ message: 'User not found....' });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, isAdmin } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield dbHelper.exec('updateUser', { id: req.params.id, name, email, password: hashedPassword, isAdmin });
        res.json({ message: 'User successfully updated...' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbHelper.exec('deleteUser', { id: req.params.id });
        res.json({ message: 'User deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.deleteUser = deleteUser;
