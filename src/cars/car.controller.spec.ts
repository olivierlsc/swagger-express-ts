import * as chai from 'chai';
import { CarController } from './car.controller';
import { CarsService } from './cars.service';
const expect = chai.expect;
import * as express from 'express';
import * as sinon from 'sinon';
import { CarModel } from './car.model';

describe('CarController', () => {
    let carController: CarController;
    let carService: CarsService;

    beforeEach(() => {
        carService = {} as CarsService;
        carController = new CarController(carService);
    });

    describe('getCar', () => {
        it('expect car', () => {
            const request: express.Request = null;
            const response: express.Response = {} as express.Response;
            const next: express.NextFunction = null;
            const id: string = '1';
            const car: CarModel = {} as CarModel;
            const carsServiceGetCarByIdStub = sinon.stub().returns(car);
            carService.getCarById = carsServiceGetCarByIdStub;
            const responseJsonSpy = sinon.spy();
            response.json = responseJsonSpy;

            carController.getCar(id, request, response, next);

            expect(carsServiceGetCarByIdStub.called).is.true;
            expect(responseJsonSpy.calledWith(car)).is.true;
        });
    });
});
