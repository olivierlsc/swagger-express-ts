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
            const cars = carsService.getCars();

            expect(cars).exist;
        });
    });

    describe('addCar', () => {
        it('expect new car', () => {
            const newCar: CarModel = {} as CarModel;
            const lengthBeforeAddCar = carsService.getCars().length;

            const car = carsService.addCar(newCar);

            expect(car).exist;
            const lengthAfterAddCar = carsService.getCars().length;
            expect(lengthBeforeAddCar < lengthAfterAddCar).is.true;
        });
    });

    describe('getCarById', () => {
        it('expect car by id', () => {
            const car = carsService.getCarById('1');

            expect(car).exist;
        });
    });
});
