import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if the user exists
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { username: user.username }, 
      process.env.JWT_SECRET_KEY as string, 
      { expiresIn: '1h' }
    );

    // Respond with the token
    res.status(200).json({ token, message: 'Login successful.' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
return;
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
