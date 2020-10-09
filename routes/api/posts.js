import { Router } from 'express';
const router = Router();

// @route   GET api/posts
// @desc    Test route
// @access  public

router.get('/', (req, res) => res.send('POsts route'));

export default router;
