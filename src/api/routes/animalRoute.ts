import express from 'express';
import {putAnimal, deleteAnimal, getAnimal, getAnimals, postAnimal, getAnimalsByBox, getBySpecies } from '../controllers/animalController';
const router = express.Router();

router.route('/').post(postAnimal).get(getAnimals);

router.route('/location').get(getAnimalsByBox);

router.route('/species/:species').get(getBySpecies);

router.route('/:id').get(getAnimal).put(putAnimal).delete(deleteAnimal);

export default router;
