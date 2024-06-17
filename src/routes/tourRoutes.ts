import { Router } from 'express'
import { addTour, getTours, getTour, updateTour, deleteTour } from '../controllers/tourControllers'
import { verifyToken, isAdmin } from '../middlewares/authMiddle'

const tourRouter = Router();

tourRouter.post ('/', verifyToken, isAdmin, addTour)
tourRouter.get('/', verifyToken, getTours)
tourRouter.get('/:id', verifyToken, getTour)
tourRouter.put('/:id', verifyToken, isAdmin, updateTour)
tourRouter.delete('/:id', verifyToken, isAdmin, deleteTour)

export default tourRouter