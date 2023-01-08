import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

import { SQLite, SQLiteDatabaseConfig, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';

import { environment } from '../../../environments/environment';

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

                        // Insere dados fakes ao rodar um build que não seja de produção.
                        if (!environment.production) {
                            this.getFakeData();
                        }
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
            this.sqlitePorter.importSqlToDb(this.storage, data)
                .then(() => {
                    this.isReady.next(true)
                    this.updateRepository('movimentations');
                })
                .catch(error => console.error(error));
        });
    }

    updateRepository(tableName) {
        this.getAll(tableName)
            .then(data => this[tableName].next(data))
    }

    getAll(tableName) {
        let query = `SELECT * FROM ${tableName}`

        return this.storage.executeSql(query, [])
            .then(res => {
                let items: any[] = [];

                if (res.rows.length > 0)
                    for (var i = 0; i < res.rows.length; i++) {
                        let item = res.rows.item(i)
                        items.push(item);
                    }
                return items
            });
    }

    getById(tableName: string, id: number): Promise<Object> {
        let query = `SELECT * FROM ${tableName} WHERE id = ?`
        return this.storage.executeSql(query, [id])
            .then(res => res.rows.item(0));
    }

    create(tableName: string, data: Object) {
        let collumns = Object.keys(data)
        let values = Object.values(data)
        let query = `INSERT INTO ${tableName} (${collumns.join(', ')}) VALUES (${Array(collumns.length).fill('?').join(',')})`
        return this.storage.executeSql(query, values)
            .then(() => this.updateRepository(tableName))
    }

    update(tableName: string, id: number, data) {
        let collumns = Object.keys(data)
        let values = Object.values(data)
        let query = `UPDATE ${tableName} SET ${collumns.map(data => data + '= ?').join(', ')} WHERE id = ${id}`
        return this.storage.executeSql(query, values)
            .then(() => this.updateRepository(tableName))
    }

    delete(tableName: string, id: number) {
        let query = `DELETE FROM ${tableName} WHERE id = ?`
        return this.storage.executeSql(query, [id])
            .then(() => this.updateRepository(tableName))
    }

    clearTable(tableName: string) {
        let query = `DELETE FROM ${tableName}`
        return this.storage.executeSql(query, [])
            .then(() => this[tableName].next([]))
    }

    // importJSONToDB() {
    //     this.sqlite.create(this.databaseConfig)
    //         .then((db: any) => {
    //             let dbInstance = db._objectInstance;

    // let sql = 'CREATE TABLE Artist ([Id] PRIMARY KEY, [Title]);' +
    //     'INSERT INTO Artist(Id,Title) VALUES ("1","Fred");';

    //             let json = {
    //                 "structure": {
    //                     "tables": {
    //                         "Movimentations": "([id] PRIMARY KEY, [title], [value])"
    //                     }
    //                 }
    //             }

    //             this.sqlitePorter.importJsonToDb(dbInstance, json)
    //                 .then(() => console.log('SQLite - Imported.'))
    //                 .catch(e => console.error(e));
    //         });
    // }

    // exportDBToJSON() {
    //     this.sqlite.create(this.databaseConfig)
    //         .then((db: any) => {
    //             let dbInstance = db._objectInstance;

    //             this.sqlitePorter.exportDbToJson(dbInstance)
    //                 .then((data) => console.log(`SQLite - Exported.\n ${JSON.stringify(data)}`))
    //                 .catch(e => console.log(e));
    //         }).catch(e => console.log(e));
    // }
}


