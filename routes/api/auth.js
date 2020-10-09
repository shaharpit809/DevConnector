import { Router } from 'express';
const router = Router();
import auth from '../../middleware/auth';
import { sign } from 'jsonwebtoken';
import { get } from 'config';
import { compare } from 'bcryptjs';
import { check, validationResult } from 'express-validator';

import { findById, findOne } from '../../models/User';

// @route   GET api/auth
// @desc    Test route
// @access  public

router.get('/', auth, async (req, res) => {
  try {
    const user = await findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  public

router.post(
  '/',
  [
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Please enter a valid password').exists(),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials.' }] });
      }

      const isMatch = await compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials.' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      sign(
        payload,
        get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

export default router;
