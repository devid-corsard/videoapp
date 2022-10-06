import { Router } from 'express';
import { signin, signup } from '../controllers/auth.js';

/** Create user or sign in with name and password */
const router = Router();

/**CREATE A USER */
router.post('/signup', signup);

/**SIGN IN */
router.post('/signin', signin);

/**GOOGLE AUTH */
// router.post('/google', google);

export default router;