import { injectable } from 'inversify';
import 'reflect-metadata';
import { CarModel } from './car.model';
import * as _ from 'lodash';

@injectable()
export class CarsService {
    private carsList: CarModel[] = [
        {
            id: '1',
            name: 'Car 1',
            description: 'Description Car 1',
            version: '1.0.0',
            author: {
                id: '1',
                name: ['John DOE'],
            },
        } as CarModel,
        {
            id: '2',
            name: 'Car 2',
            description: 'Description Car 2',
            version: '2.0.0',
            author: {
                id: '1',
                name: ['John DOE'],
            },
        } as CarModel,
    ];

    public getCars(): CarModel[] {
        return this.carsList;
    }

    public addCar(car: CarModel): CarModel {
        this.carsList.push(car);
        return car;
    }

    public getCarById(id: string): CarModel {
        return _.find(this.carsList, (car: CarModel) => {
            return _.isEqual(car.id, id);
        });
    }
}
