import * as chai from 'chai';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
const expect = chai.expect;
import * as express from 'express';
import * as sinon from 'sinon';
import { CarModel } from './car.model';

describe('CarsController', () => {
    let carsController: CarsController;
    let carsService: CarsService;

    beforeEach(() => {
        carsService = {} as CarsService;
        carsController = new CarsController(carsService);
    });
    describe('GET:/cars', () => {
        it('expect cars list', () => {
            let request: express.Request;
            let response: express.Response = {} as express.Response;
            let next: express.NextFunction;
            let carsList: CarModel[] = [];
            let carsServiceGetCarsStub = sinon
                .stub()
                .returns(carsList);
            carsService.getCars = carsServiceGetCarsStub;
            let responseJsonSpy = sinon.spy();
            response.json = responseJsonSpy;

            carsController.getCars(request, response, next);

            expect(carsServiceGetCarsStub.called).is.true;
            expect(responseJsonSpy.calledWith(carsList)).is.true;
        });
    });

    describe('POST:/cars', () => {
        it('expect post car', () => {
            let request: express.Request = {} as express.Request;
            let response: express.Response = {} as express.Response;
            let next: express.NextFunction;
            let car: CarModel = {} as CarModel;
            let carsServiceAddCarStub = sinon.stub().returns(car);
            carsService.addCar = carsServiceAddCarStub;
            let responseJsonSpy = sinon.spy();
            response.json = responseJsonSpy;
            request.body = {};

            carsController.postCar(request, response, next);

            expect(carsServiceAddCarStub.calledWith(request.body)).is
                .true;
            expect(responseJsonSpy.calledWith(car)).is.true;
        });
    });
});
