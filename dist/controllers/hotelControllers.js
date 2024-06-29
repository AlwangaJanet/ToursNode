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
exports.deleteHotel = exports.updateHotel = exports.getHotel = exports.getHotels = exports.addHotel = void 0;
const uuid_1 = require("uuid");
const databaseHelpers_1 = require("../databaseHelpers");
const dbHelper = new databaseHelpers_1.DbHelper();
const addHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, location, price } = req.body;
        const id = (0, uuid_1.v4)();
        yield dbHelper.exec('addHotel', { id, name, location, price });
        res.status(201).json({ message: 'Hotel added successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.addHotel = addHotel;
const getHotels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotels = yield dbHelper.getAll('getHotels');
        res.json(hotels);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getHotels = getHotels;
const getHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotel = yield dbHelper.get('getHotel', { id: req.params.id });
        if (!hotel)
            return res.status(404).json({ message: 'Hotel not found' });
        res.json(hotel);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getHotel = getHotel;
const updateHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, location, price } = req.body;
        yield dbHelper.exec('updateHotel', { id: req.params.id, name, location, price });
        res.json({ message: 'Hotel updated successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.updateHotel = updateHotel;
const deleteHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbHelper.exec('deleteHotel', { id: req.params.id });
        res.json({ message: 'Hotel deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.deleteHotel = deleteHotel;
