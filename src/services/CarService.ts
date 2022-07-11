import { Car, CarSchema } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';
import GenericService, { ServiceError } from '.';
import GenericModel from '../models/GenericModel';

export default class CarService extends GenericService<Car> {
  constructor(model: GenericModel<Car> = new CarModel()) {
    super(model);
  }

  create = async (car: Car): Promise<Car | ServiceError | null> => {
    const parsed = CarSchema.safeParse(car);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(car);
  };

  readOne = async (id: string): Promise<Car |/*  ServiceError | */ null> =>
    this.model.readOne(id);

  read = async (): Promise<Car[]> => this.model.read();

  update = async (id: string, car: Car): Promise<Car | ServiceError | null> => {
    const parsed = CarSchema.safeParse(car);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.update(id, car);
  };

  delete = async (id: string): Promise<Car |/*  ServiceError | */ null> =>
    this.model.delete(id);
}