import express from 'express';
import { postCategory } from '../controllers/categoryController';

const router = express.Router();

router.route('/').post(postCategory);

export default router;
