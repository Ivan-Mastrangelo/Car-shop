import { Request, Response } from 'express';
import GenericController, { RequestWithBody, ResponseError } from '.';
import CarService from '../services/CarService';
import { Car } from '../interfaces/CarInterface';
import GenericService from '../services';

export default class CarController extends GenericController<Car> {
  private $route: string;

  constructor(
    service: GenericService<Car> = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError | null>,
  ): Promise<typeof res> => {
    try {
      const createCar = await this.service.create(req.body);

      if (!createCar) {
        return res.status(500).json({ error: this.errors.internal });
      }

      if ('error' in createCar) {
        return res.status(400).json({ error: this.errors.badRequest });
      } 

      return res.status(201).json(createCar);
    } catch (err) {
      return res.status(400).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Car[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const allCars = await this.service.read();
      return res.status(200).json(allCars);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.invalidId });
      }
      const car = await this.service.readOne(id);
      return car ? res.status(200).json(car)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(404).json({ error: this.errors.notFound });
    }
  };

  update = async (req: RequestWithBody<Car>, res: Response<Car
  | ResponseError | null>): Promise<typeof res> => {
    const { id } = req.params;
    try {
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.invalidId });
      }
      const car = await this.service.update(id, req.body);
      if (!car) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      if ('error' in car) {
        return res.status(400).json({ error: this.errors.badRequest });
      }
      return res.status(200).json(car);
    } catch (error) {
      return res.status(404).json({ error: this.errors.notFound });
    }
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;
      if (id.length < 24) {
        return res.status(400).json({ error: this.errors.invalidId });
      }
      const deletedCar = await this.service.delete(id);
      if (!deletedCar) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      if ('error' in deletedCar) return res.status(400).json(deletedCar);
      return res.status(204).json(deletedCar);
    } catch (error) {
      return res.status(404).json({ error: this.errors.notFound });
    }
  };
}