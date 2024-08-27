import CustomError from "../../classes/CustomError";
import { Species } from "../../types/Species";
import speciesModel from "../models/speciesModel";
import { Request, Response, NextFunction } from "express";
import { MessageResponse } from "../../types/Messages";

type DBMessageResponse = MessageResponse & {
  data: Species | Species[];
}

const postSpecies = async (
  req: Request<{}, {}, Species>,
  res: Response<DBMessageResponse>,
  next: NextFunction
) => {
  try {
    const newSpecies = new speciesModel(req.body);
    const savedSpecies = await newSpecies.save();

    res.json({
      message: 'Species added successfully',
      data: savedSpecies
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }

}

const getSpecies = async (
  req: Request,
  res: Response<Species[]>,
  next: NextFunction
) => {
  try {
    const species = await speciesModel.find();

    res.json(species);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
}

const getSingleSpecies = async (
  req: Request<{id: string}>,
  res: Response<Species>,
  next: NextFunction
) => {
  try {
    const species = await speciesModel.findById(req.params.id);

    if (!species) {
      return next(new CustomError('Species not found', 404));
    }

    res.json(species);

  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
}

const putSpecies = async (
  req: Request<{id: string}, {}, Species>,
  res: Response<DBMessageResponse>,
  next: NextFunction
) => {
  try {
    const updatedSpecies = await speciesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedSpecies) {
      return next(new CustomError('Species not found', 404));
    }

    res.json({
      message: 'Species updated successfully',
      data: updatedSpecies
    });

  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
}

const deleteSpecies = async (
  req: Request<{id: string}>,
  res: Response<DBMessageResponse>,
  next: NextFunction
) => {
  try {
    const deletedSpecies = await speciesModel.findByIdAndDelete(req.params.id);

    if (!deletedSpecies) {
      return next(new CustomError('Species not found', 404));
    }

    res.json({
      message: 'Species deleted successfully',
      data: deletedSpecies
    });

  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
}

export { postSpecies, getSpecies, putSpecies, deleteSpecies, getSingleSpecies };
