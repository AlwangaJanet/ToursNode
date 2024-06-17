import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Payload } from '../models/authModels'

dotenv.config()

export interface ExtendedRequest extends Request {
  info?: Payload
}

export function verifyToken(req: ExtendedRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Forbidden' })
    }

    const decodedData = jwt.verify(token, process.env.SECRET as string) as Payload
    req.info = decodedData
    next()
  } catch (error) {
    return res.status(500).json({ message: 'Invalid Token' })
  }
}

export function isAdmin(req: ExtendedRequest, res: Response, next: NextFunction) {
  if (req.info?.isAdmin) {
    next()
  } else {
    res.status(403).json({ message: 'Admin access required' })
  }
}

export function isUserOrAdmin(req: ExtendedRequest, res: Response, next: NextFunction) {
  if (req.info?.id === req.params.id || req.info?.isAdmin) {
    next()
  } else {
    res.status(403).json({ message: 'Access denied' })
  }
}