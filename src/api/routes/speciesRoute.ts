import express from 'express';
import { getSpecies, postSpecies, putSpecies } from "../controllers/speciesController";

const router = express.Router();

router.route('/').post(postSpecies).get(getSpecies);

router.route('/:id').get(getSpecies).put(putSpecies).delete(getSpecies);

export default router;
