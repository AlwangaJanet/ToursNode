import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uid } from 'uuid'
import { DbHelper } from '../databaseHelpers'
import dotenv from 'dotenv'
import { User } from '../models/authModels'
import { registerSchema } from '../helpers'
import { sendRegisterEmail } from '../nodemailer'

dotenv.config()

const dbHelper = new DbHelper()

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      console.error('Validation error:', error.details[0].message)
      return res.status(400).json({ error: error.details[0].message })
    }

    const { name, email, password, isAdmin } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    const user: User = {
      id: uid(),
      name,
      email,
      password: hashedPassword,
      isAdmin,
      isDeleted: 0,
      isEmailSent: 0,
    }

    console.log('User data to insert:', user)

    await dbHelper.exec('addUser', {
      id: user.id,
      name: user.name,
      Email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      isDeleted: user.isDeleted,
      isEmailSent: user.isEmailSent,
    })

    await sendRegisterEmail(user)

    res.status(201).json({ message: 'User successfully registered...' })
  } catch (err) {
    console.error('Error during user registration:', err)
    res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' })
  }
}
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await dbHelper.get('getUserByEmail', { email })

    if (!user) {
      return res.status(404).json({ message: 'User not found...' })
    }

    if (!password) {
      return res.status(400).json({ message: 'Password is required.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials!!' })
    }
    const token = jwt.sign(
      { Sub: user.id, Name: user.name, isAdmin: user.isAdmin },
      process.env.SECRET as string,
      { expiresIn: '2h' }
    )
    res.json({ token })
  } catch (err: any) {
    console.error('Error during user login:', err)
    res.status(500).json({ error: err.message || 'Internal Server Error' })
  }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
      const users = await dbHelper.getAll('getUsers');
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  
  export const getUser = async (req: Request, res: Response) => {
    try {
      const user = await dbHelper.get('getUser', { id: req.params.id })
      if (!user) return res.status(404).json({ message: 'User not found....' })
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  
  export const updateUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password, isAdmin } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
  
      await dbHelper.exec('updateUser', { id: req.params.id, name, email, password: hashedPassword, isAdmin })
  
      res.json({ message: 'User successfully updated...' })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      await dbHelper.exec('deleteUser', { id: req.params.id })
      res.json({ message: 'User deleted successfully' })
    } catch (err) {
      res.status(500).json({ error: err })
    }
  }
  