import { Car } from '../../interfaces/CarInterface';

export default interface ICarService {
  create(car: Car): Promise<Car>;
  read(): Promise<Car[]>;
  readOne(id: string): Promise<Car | null>;
  update(id: string, car: Car): Promise<Car | null>;
  delete(id: string): Promise<Car | null>;
}
