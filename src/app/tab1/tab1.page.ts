import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import { DatabaseService } from '../services/db/database.service';
import { Movimentation } from '../services/db/movimentation';
import { MovimentationsRepositoryService } from '../services/db/movimentations-repository.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    movimentations: Movimentation[] = []
    movimentation: Movimentation = undefined

    constructor(public platform: Platform,
        private databaseService: DatabaseService,
        private movimentationsRepository: MovimentationsRepositoryService
    ) { }

    ngOnInit() {
        this.databaseService.dbState().subscribe((res) => {
            if (res) {
                this.movimentationsRepository.getMovimentations()
                    .subscribe(data => this.movimentations = data)

                this.movimentationsRepository.getMovimentation(1)
                    .then(data => this.movimentation = data)
            }
        });
    }

    addMovimentation() {
        let movimentation = new Movimentation()
        movimentation.title = 'teste'
        movimentation.value = 10
        this.movimentationsRepository.addMovimentation(movimentation)
    }

    updateMovimentation(id: number) {
        this.movimentationsRepository.getMovimentation(id).then(data => {
            let movimentation = data
            movimentation.value = data.value + 1
            this.movimentationsRepository.updateMovimentation(id, movimentation)
        })
    }

    deleteMovimentation(id: number) {
        this.movimentationsRepository.deleteMovimentation(id)
    }
}
