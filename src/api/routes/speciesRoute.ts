import express from 'express';
import { getSpecies, postSpecies, putSpecies } from "../controllers/speciesController";
import { addImageToSpecies } from '../../middlewares';

const router = express.Router();

router.route('/').post(postSpecies, addImageToSpecies).get(getSpecies);

router.route('/:id').get(getSpecies).put(putSpecies).delete(getSpecies);

export default router;
