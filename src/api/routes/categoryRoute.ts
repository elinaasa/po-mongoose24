import express from 'express';
import { getCategories, postCategory } from '../controllers/categoryController';
import { getCategory, putCategory, deleteCategory } from '../controllers/categoryController';
const router = express.Router();

router.route('/').post(postCategory).get(getCategories);


router.route('/:id').get(getCategory).put(putCategory).delete(deleteCategory);


export default router;
