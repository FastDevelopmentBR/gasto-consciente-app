import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';
import { Movimentation } from './movimentation';

@Injectable({
    providedIn: 'root'
})
export class MovimentationsRepositoryService {

    constructor(private databaseService: DatabaseService) { }

    fetchMovimentations() {
        return this.databaseService.movimentations.asObservable();
    }

    getMovimentations(): Observable<Movimentation[]> {
        return this.databaseService.movimentations.asObservable();
    }

    getMovimentation(id: number): Promise<Movimentation> {
        return this.databaseService.getById('movimentations', id)
            .then((data: Movimentation) => data);
    }

    addMovimentation(data: Movimentation) {
        return this.databaseService.create('movimentations', data)
    }

    updateMovimentation(id: number, data: Movimentation) {
        return this.databaseService.update('movimentations', id, data)
    }

    deleteMovimentation(id: number) {
        this.databaseService.delete('movimentations', id)
    }

    clearMovimentations() {
        this.databaseService.clearTable('movimentations')
    }
}
