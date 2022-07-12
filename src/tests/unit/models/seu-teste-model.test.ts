import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import{ Model } from 'mongoose';
import CarModel from '../../../models/CarModel';

describe('Testar a Model', () => {
  const carMock = {
    status: true,
    model: 'Spacefox',
    year: 2010,
    color: 'Black',
    buyValue: 25.000,
    doorsQty: 4,
    seatsQty: 5,
    _id: '1abcdef123abcdef12345678'
  }
  describe('testar método create', () => {

    before(() => {
      sinon.stub(Model, 'create').resolves(carMock);
    })

    after(() => {
      (Model.create as SinonStub).restore();
    })

    it('Em caso de sucesso', async () => {
      const carModel = new CarModel();
      const result = await carModel.create(carMock);
      expect(result).to.be.deep.equal(carMock);
    })
  })

  describe('testar método read', () => {

    before(() => {
      sinon.stub(Model, 'find').resolves([carMock]);
    })

    after(() => {
      (Model.find as SinonStub).restore();
    })

    it('em caso de sucesso', async () => {
      const carModel = new CarModel();
      const result = await carModel.read();
      expect(result).to.be.deep.equal([carMock]);
    })
  })

  describe('testar o método readOne', () => {

    before(() => {
      sinon.stub(Model, 'findById').resolves(carMock);
    })

    after(() => {
      (Model.findById as SinonStub).restore();
    })

    it('em caso de sucesso', async () => {
      const carModel = new CarModel();
      const result = await carModel.readOne('1abcdef123abcdef12345678');
      expect(result).to.be.equal(carMock);
    })
  })

  describe('Testar método update', () => {

    before(() => {
      sinon.stub(Model, 'findOneAndUpdate').resolves(carMock);
    })

    after(() => {
      (Model.findOneAndUpdate as SinonStub).restore();
    })
    it('em caso de sucesso', async () => {
      const carModel = new CarModel();
      const result = await carModel.update('1abcdef123abcdef12345678', carMock);
      expect(result).to.be.equal(carMock);
    })
  })
  describe('Testar o método delete', () => {
    before(() => {
      sinon.stub(Model, 'findOneAndDelete').resolves(carMock);
    })

    after(() => {
      (Model.findOneAndDelete as SinonStub).restore();
    })
    it('em caso de sucesso', async () => {
      const carModel = new CarModel();
      const result = await carModel.delete('1abcdef123abcdef12345678');
      expect(result).to.be.equal(carMock);
    })
  })
})