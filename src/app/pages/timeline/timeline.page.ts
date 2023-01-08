import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActionSheetController, Platform } from '@ionic/angular';

import { Observable } from 'rxjs';

import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br')
dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)

import { DatabaseService } from '../../services/db/database.service';
import { MovimentationsRepositoryService } from '../../services/db/movimentations-repository.service';
import { Movimentation } from '../../services/db/movimentation';

interface Month {
    date: string
    title: string
    locked: boolean
    movimentations: Movimentation[]
    total: number
    accumulated: number
}


@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.page.html',
    styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
    start: string
    end: string

    // public loadObservable: Observable<boolean> = new Observable((subscriber) => subscriber.next(false));
    // public loaded = false;
    months: Month[] = []
    movimentations: Movimentation[] = []

    constructor(
        // public actionSheetController: ActionSheetController,
        // private router: Router,
        public platform: Platform,
        private databaseService: DatabaseService,
        private movimentationsRepository: MovimentationsRepositoryService) {
        this.start = dayjs('2023-01').toISOString()
        this.end = dayjs('2023-12').toISOString()
    }

    ngOnInit() {
        this.databaseService.dbState().subscribe((res) => {
            if (res) {
                this.getMonths()
            }
        });
    }

    getMonths() {
        // this.loadObservable = new Observable((subscriber) => subscriber.next(false));
        let start = dayjs(this.start).startOf('month')
        let end = dayjs(this.end).endOf('month')
        let diff = end.diff(this.start, 'month')

        let selectedMonth = start
        let months: Month[] = []

        for (let i = 0; i <= diff; i++) {
            months.push({
                date: selectedMonth.format('YYYYMM'),
                title: selectedMonth.format('MMMM YYYY'),
                locked: false,
                movimentations: [],
                total: 0,
                accumulated: 0
            })

            selectedMonth = selectedMonth.add(1, 'month')
        }

        this.months = months

        this.movimentationsRepository.fetchMovimentations().subscribe({
            next: (movimentations) => {
                console.log('lista de movimentações')
                console.log(movimentations)

                movimentations.sort((prev, next) => {
                    let after = dayjs(prev.movimentation_date).isSameOrAfter(next.movimentation_date, 'date')
                    return (after) ? 1 : -1
                })

                let accumulated = 0

                this.months.forEach(month => {
                    let selectedMonth = dayjs(month.date)

                    const monthMovimentations = movimentations.filter(movimentation =>
                        dayjs(movimentation.movimentation_date).isBetween(selectedMonth.startOf('month'), selectedMonth.endOf('month'), 'day', '[]')
                    )

                    const total = monthMovimentations.reduce(
                        (balance: number, movimentation: Movimentation) =>
                            balance + (
                                movimentation.type === 0
                                    ? movimentation.value
                                    : -Math.abs(movimentation.value)
                            ), 0)

                    accumulated += total

                    month.movimentations = monthMovimentations
                    month.total = total
                    month.accumulated = accumulated
                });

                // this.loadObservable = new Observable((subscriber) => subscriber.next(true));
            },
            error: (err) => {
                console.log(err)
            },
        })
    }

    getFormattedDate(date: string): string {
        return dayjs(date).format('DD')
    }
}