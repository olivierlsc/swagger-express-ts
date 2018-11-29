import * as chai from 'chai';
import { CarsService } from './cars.service';
import { CarModel } from './car.model';
const expect = chai.expect;

describe('CarsService', () => {
    let carsService: CarsService;

    beforeEach(() => {
        carsService = new CarsService();
    });

    describe('getCars', () => {
        it('expect cars list', () => {
            let cars = carsService.getCars();

            expect(cars).exist;
        });
    });

    describe('addCar', () => {
        it('expect new car', () => {
            let newCar: CarModel = {} as CarModel;
            let lengthBeforeAddCar = carsService.getCars().length;

            let car = carsService.addCar(newCar);

            expect(car).exist;
            let lengthAfterAddCar = carsService.getCars().length;
            expect(lengthBeforeAddCar < lengthAfterAddCar).is.true;
        });
    });

    describe('getCarById', () => {
        it('expect car by id', () => {
            let car = carsService.getCarById('1');

            expect(car).exist;
        });
    });
});
