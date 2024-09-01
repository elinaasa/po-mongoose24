import express from 'express';
import {
  deleteSpecies,
  getSingleSpecies,
  getSpecies,
  postSpecies,
  putSpecies,
  getSpeciesByArea,
} from '../controllers/speciesController';
import {addImageToSpecies} from '../../middlewares';

const router = express.Router();

router.route('/').post(addImageToSpecies, postSpecies).get(getSpecies);

router
  .route('/:id')
  .get(getSingleSpecies)
  .put(putSpecies)
  .delete(deleteSpecies)
  .post(getSpeciesByArea);

export default router;
