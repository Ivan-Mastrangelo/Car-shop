import CarModelMongoose from '../schemas/CarSchema';
import GenericModel from './GenericModel';
import { Car } from '../interfaces/CarInterface';

export default class CarModel extends GenericModel<Car> {
  constructor(model = CarModelMongoose) {
    super(model);
  }
}