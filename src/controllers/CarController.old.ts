import { Request, Response, NextFunction } from 'express';
// import CarService from '../services/CarService';
import ICarController from './interfaces/CarControllerInterface';
import ICarService from '../services/interfaces/CarServiceInterface';

export default class CarController implements ICarController {
  private _carService!: ICarService;

  contructor(carService: ICarService) {
    this._carService = carService;
  }

  public async create(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const {
        model, year, color, status, buyValue, doorsQty, seatsQty } = req.body;
      const createCar = await this._carService.create({
        model, year, color, status, buyValue, doorsQty, seatsQty,
      });
      return res.status(201).json(createCar);
    } catch (error) {
      next(error);
    }
  }

  public async read(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const allCars = await this._carService.read();
      return res.status(200).json(allCars);
    } catch (error) {
      next(error);
    }
  }

  public async readOne(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { id } = req.params;
      const car = await this._carService.readOne(id);
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { id } = req.params;
      const {
        model, year, color, status, buyValue, doorsQty, seatsQty } = req.body;
      const updatedCar = await this._carService.update(id, {
        model, year, color, status, buyValue, doorsQty, seatsQty,
      });
      return res.status(201).json(updatedCar);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { id } = req.params;
      const deteletedCar = await this._carService.delete(id);
      return res.status(200).json(deteletedCar);
    } catch (error) {
      next(error);
    }
  }
}