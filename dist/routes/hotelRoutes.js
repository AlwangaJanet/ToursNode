"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotelControllers_1 = require("../controllers/hotelControllers");
const authMiddle_1 = require("../middlewares/authMiddle");
const hotelRouter = (0, express_1.Router)();
hotelRouter.post('/', authMiddle_1.verifyToken, authMiddle_1.isAdmin, hotelControllers_1.addHotel);
hotelRouter.get('/', authMiddle_1.verifyToken, hotelControllers_1.getHotels);
hotelRouter.get('/:id', authMiddle_1.verifyToken, hotelControllers_1.getHotel);
hotelRouter.put('/:id', authMiddle_1.verifyToken, authMiddle_1.isAdmin, hotelControllers_1.updateHotel);
hotelRouter.delete('/:id', authMiddle_1.verifyToken, authMiddle_1.isAdmin, hotelControllers_1.deleteHotel);
exports.default = hotelRouter;
