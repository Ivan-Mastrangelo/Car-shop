import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { Request, Response } from 'express';

describe('Testar a controller', () => {

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
  
  const req = {} as any;
  const res = {} as Response;

  const carService = new CarService();
  
  describe('testar método create', () => {
    
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = carMock;
      sinon.stub(carService, 'create').resolves(carMock);
    })

    after(() => {
      (carService.create as SinonStub).restore();
    })
    it('Em caso de sucesso', async () => {
      const carController = new CarController(carService);
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.equal(true);
    })
  })

  describe('testar método read', () => {
    
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = [carMock];
      sinon.stub(carService, 'read').resolves([carMock]);
    })

    after(() => {
      (carService.read as SinonStub).restore();
    })
    it('Em caso de sucesso', async () => {
      const carController = new CarController(carService);
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.equal(true);
    })
  })

  describe('testar método readOne', () => {
    
    before(() => {
      req.params = { id: '1abcdef123abcdef12345678' } as any;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = carMock;
      sinon.stub(carService, 'readOne').resolves(carMock);
    })

    after(() => {
      (carService.readOne as SinonStub).restore();
    })
    it('Em caso de sucesso', async () => {
      const carController = new CarController(carService);
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.equal(true);
    })
  })


  describe('testar método update', () => {
    
    before(() => {
      req.params = { id: '1abcdef123abcdef12345678' } as any;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = carMock;
      sinon.stub(carService, 'update').resolves(carMock);
    })

    after(() => {
      (carService.update as SinonStub).restore();
    })
    it('Em caso de sucesso', async () => {
      const carController = new CarController(carService);
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.equal(true);
    })
  })

  describe('testar método delete', () => {
    
    before(() => {
      req.params = { id: '1abcdef123abcdef12345678' } as any;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = carMock;
      sinon.stub(carService, 'delete').resolves(carMock);
    })

    after(() => {
      (carService.delete as SinonStub).restore();
    })
    it('Em caso de sucesso', async () => {
      const carController = new CarController(carService);
      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.equal(true);
    })
  })
})



// template para criação dos testes de cobertura da camada de controller


// import * as sinon from 'sinon';
// import chai from 'chai';
// import chaiHttp = require('chai-http');


// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Sua descrição', () => {

//   before(async () => {
//     sinon
//       .stub()
//       .resolves();
//   });

//   after(()=>{
//     ().restore();
//   })

//   it('', async () => {});

// });