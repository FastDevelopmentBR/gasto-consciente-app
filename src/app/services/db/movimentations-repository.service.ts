import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';
import { Movimentation } from './movimentation';

@Injectable({
    providedIn: 'root'
})
export class MovimentationsRepositoryService {

    constructor(private databaseService: DatabaseService) { }

    getMovimentations(): Observable<Movimentation[]> {
        return this.databaseService.movimentations.asObservable();
    }

    getMovimentation(id: number): Promise<Movimentation> {
        return this.databaseService.findOneById('movimentations', id)
            .then((data: Movimentation) => data);
    }

    addMovimentation(data: Movimentation) {
        return this.databaseService.create('movimentations', data)
            .then(() => this.databaseService.updateRepository('movimentations'));
    }

}
