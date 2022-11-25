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

    updateMovimentation(id: number, data: Movimentation) {
        return this.databaseService.update('movimentations', id, data)
            .then(() => this.databaseService.updateRepository('movimentations'));
    }

    deleteMovimentation(id: number) {
        this.databaseService.delete('movimentations', id)
            .then(() => this.databaseService.updateRepository('movimentations'));
    }

    clearMovimentations() {
        this.databaseService.clearTable('movimentations')
            .then(() => this.databaseService.updateRepository('movimentations'));
    }
}
