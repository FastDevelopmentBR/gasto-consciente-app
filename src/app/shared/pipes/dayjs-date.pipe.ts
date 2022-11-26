import { Pipe, PipeTransform } from "@angular/core";

import * as dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br')

@Pipe({ name: 'dayjsDate' })
export class DayJSDatePipe implements PipeTransform {
    constructor() { }

    transform(value: string, format: string) {
        return dayjs(value).format(format);
    }
}