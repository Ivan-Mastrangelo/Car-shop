import { Model, isValidObjectId } from 'mongoose';
import { Model as ModelInterface } from '../interfaces/ModelInterface';

export default abstract class GenericModel<T> implements ModelInterface<T> {
  protected _genericMongooseModel: Model<T>;

  constructor(genericMongooseModel: Model<T>) {
    this._genericMongooseModel = genericMongooseModel;
  }

  async create(entity: T): Promise<T> {
    const createEntity = await this._genericMongooseModel.create(entity);
    return createEntity;
  }

  async read(): Promise<T[]> {
    const readAll = await this._genericMongooseModel.find();
    return readAll;
  }

  async readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    const readOne = await this._genericMongooseModel.findById(id);
    return readOne;
  }

  async update(id: string, entity: T): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    const updateOne = await this._genericMongooseModel
      .findOneAndUpdate({ _id: id }, entity, { returnOriginal: false });
    return updateOne;
  }

  async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    const deletedOne = await this._genericMongooseModel
      .findOneAndDelete({ _id: id });
    return deletedOne;
  }
}