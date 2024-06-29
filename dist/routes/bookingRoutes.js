"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingControllers_1 = require("../controllers/bookingControllers");
const authMiddle_1 = require("../middlewares/authMiddle");
const bookingRouter = (0, express_1.Router)();
bookingRouter.post('/', authMiddle_1.verifyToken, bookingControllers_1.addBooking);
bookingRouter.get('/', authMiddle_1.verifyToken, authMiddle_1.isAdmin, bookingControllers_1.getBookings);
bookingRouter.get('/:id', authMiddle_1.verifyToken, authMiddle_1.isUserOrAdmin, bookingControllers_1.getBooking);
bookingRouter.put('/:id', authMiddle_1.verifyToken, authMiddle_1.isUserOrAdmin, bookingControllers_1.updateBooking);
bookingRouter.delete('/:id', authMiddle_1.verifyToken, authMiddle_1.isUserOrAdmin, bookingControllers_1.cancelBooking);
exports.default = bookingRouter;
