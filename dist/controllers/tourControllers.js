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
exports.deleteTour = exports.updateTour = exports.getTour = exports.getTours = exports.addTour = void 0;
const uuid_1 = require("uuid");
const databaseHelpers_1 = require("../databaseHelpers");
const dbHelper = new databaseHelpers_1.DbHelper();
const addTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, duration } = req.body;
        const id = (0, uuid_1.v4)();
        yield dbHelper.exec('addTour', { id, name, description, price, duration });
        res.status(201).json({ message: 'Tour added successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.addTour = addTour;
const getTours = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tours = yield dbHelper.getAll('getTours');
        res.json(tours);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getTours = getTours;
const getTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tour = yield dbHelper.get('getTour', { id: req.params.id });
        if (!tour)
            return res.status(404).json({ message: 'Tour not found' });
        res.json(tour);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getTour = getTour;
const updateTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, duration } = req.body;
        yield dbHelper.exec('updateTour', { id: req.params.id, name, description, price, duration });
        res.json({ message: 'Tour updated successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.updateTour = updateTour;
const deleteTour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbHelper.exec('deleteTour', { id: req.params.id });
        res.json({ message: 'Tour deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.deleteTour = deleteTour;
