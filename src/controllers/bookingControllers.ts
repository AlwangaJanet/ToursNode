import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import { DbHelper } from '../databaseHelpers';

const dbHelper = new DbHelper();

export const addBooking = async (req: Request, res: Response) => {
  try {
    const { userId, tourId, hotel_Id, bookingDate } = req.body;
    const id = uid();

    await dbHelper.exec('addBooking', { id, userId, tourId, hotel_Id, bookingDate });

    res.status(201).json({ message: 'Booking added successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await dbHelper.getAll('getBookings');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getBooking = async (req: Request, res: Response) => {
  try {
    const booking = await dbHelper.get('getBooking', { id: req.params.id });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    await dbHelper.exec('updateBooking', { id: req.params.id, status });

    res.json({ message: 'Booking updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    await dbHelper.exec('cancelBooking', { id: req.params.id });
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};