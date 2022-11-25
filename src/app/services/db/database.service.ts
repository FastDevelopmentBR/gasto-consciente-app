import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { SQLite, SQLiteDatabaseConfig, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    databaseConfig: SQLiteDatabaseConfig = {
        name: 'gastoconsciente.db',
        location: 'default'
    }

    storage: SQLiteObject;
    isReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    movimentations = new BehaviorSubject([]);

    constructor(
        private platform: Platform,
        private httpClient: HttpClient,
        private sqlite: SQLite,
        private sqlitePorter: SQLitePorter,
    ) {
        this.platform.ready().then((readySource) => {
            if (readySource == 'cordova') {
                this.sqlite
                    .create(this.databaseConfig)
                    .then((db: SQLiteObject) => {
                        this.storage = db;
                        this.getFakeData();
                        this.updateRepository('movimentations');
                    });
            }
        });
    }

    dbState() {
        return this.isReady.asObservable();
    }

    // Render fake data
    getFakeData() {
        this.httpClient.get(
            'assets/dump.sql',
            { responseType: 'text' }
        ).subscribe(data => {
            this.clearTable('movimentations') // TODO: Remover Após desenvolvimento.
            this.sqlitePorter.importSqlToDb(this.storage, data)
                .then(() => this.isReady.next(true))
                .catch(error => console.error(error));
        });
    }

    updateRepository(tableName) {
        let query = `SELECT * FROM ${tableName}`

        return this.storage
            .executeSql(query, []).then(res => {
                let items: any[] = [];

                if (res.rows.length > 0)
                    for (var i = 0; i < res.rows.length; i++) {
                        let item = res.rows.item(i)
                        items.push(item);
                    }

                this[tableName].next(items);
            });
    }

    findOneById(tableName: string, id: number): Promise<Object> {
        let query = `SELECT * FROM ${tableName} WHERE id = ?`

        return this.storage
            .executeSql(query, [id])
            .then(res => res.rows.item(0));
    }

    create(tableName: string, data: Object) {
        let collumns = Object.keys(data)
        let values = Object.values(data)
        let query = `INSERT INTO ${tableName} (${collumns.join(', ')}) VALUES (${Array(collumns.length).fill('?').join(',')})`
        return this.storage.executeSql(query, values)
    }

    update(tableName: string, id: number, data) {
        let collumns = Object.keys(data)
        let values = Object.values(data)
        let query = `UPDATE ${tableName} SET ${collumns.map(data => data + '= ?').join(', ')} WHERE id = ${id}`
        return this.storage.executeSql(query, values)
    }

    delete(tableName: string, id: number) {
        let query = `DELETE FROM ${tableName} WHERE id = ?`
        return this.storage.executeSql(query, [id])
    }

    clearTable(tableName: string) {
        let query = `DELETE FROM ${tableName}`
        return this.storage.executeSql(query, [])
    }
}
