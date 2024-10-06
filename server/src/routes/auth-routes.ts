import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body; //extract the username and password from the request body

  const user = await User.findOne({ where: { username } }); //find the user in the db with the given username

  if (!user) {
    return res.status(404).json({ message: 'User not found' }); //send a 404 status if the user is not found
  }

  const validPassword = await bcrypt.compare(password, user.password); //compare the provided password with the stored hashed password

  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid password' }); //send a 401 status if the password is invalid
  }

  const secretKey = process.env.JWT_SECRET_KEY || ''; //get the secret key from the environment variable
  const token = jwt.sign({ username }, secretKey, {expiresIn: '1h'}); //create a JWT token for the authenticated user
  
  return res.json({ token }); //send the token as a response
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
