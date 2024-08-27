import express from 'express';
import { deleteAnimal, getAnimal, getAnimals, postAnimal } from '../controllers/animalController';
import { putAnimal } from '../controllers/animalController';
const router = express.Router();

router.route('/').post(postAnimal).get(getAnimals);

router.route('/:id').get(getAnimal).put(putAnimal).delete(deleteAnimal);
export default router;
