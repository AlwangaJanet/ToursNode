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
exports.cancelBooking = exports.updateBooking = exports.getBooking = exports.getBookings = exports.addBooking = void 0;
const uuid_1 = require("uuid");
const databaseHelpers_1 = require("../databaseHelpers");
const dbHelper = new databaseHelpers_1.DbHelper();
const checkExistence = (table, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const query = `SELECT COUNT(1) as count FROM ${table} WHERE id = @id`;
    const result = yield dbHelper.query(query, { id });
    return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.count) > 0;
});
const addBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, tourId, hotel_Id, bookingDate } = req.body;
        const id = (0, uuid_1.v4)();
        const userExists = yield checkExistence('users1', userId);
        if (!userExists) {
            return res.status(400).json({ error: 'User does not exist' });
        }
        const tourExists = yield checkExistence('Tours', tourId);
        if (!tourExists) {
            return res.status(400).json({ error: 'Tour does not exist' });
        }
        const hotelExists = yield checkExistence('Hotels', hotel_Id);
        if (!hotelExists) {
            return res.status(400).json({ error: 'Hotel does not exist' });
        }
        yield dbHelper.exec('addBooking', { id, userId, tourId, hotel_Id, bookingDate });
        res.status(201).json({ message: 'Booking added successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.addBooking = addBooking;
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield dbHelper.getAll('getBookings');
        res.json(bookings);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getBookings = getBookings;
const getBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield dbHelper.get('getBooking', { id: req.params.id });
        if (!booking)
            return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getBooking = getBooking;
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        yield dbHelper.exec('updateBooking', { id: req.params.id, status });
        res.json({ message: 'Booking updated successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.updateBooking = updateBooking;
const cancelBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbHelper.exec('cancelBooking', { id: req.params.id });
        res.json({ message: 'Booking cancelled successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.cancelBooking = cancelBooking;
