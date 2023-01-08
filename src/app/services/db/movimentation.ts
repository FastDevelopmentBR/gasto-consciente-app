import * as dayjs from 'dayjs';

export class Movimentation {
    id?: number;
    title: string;
    type: number = 1; // 0 = Entrada, 1 = Saída
    value: number;
    movimentation_date: string = dayjs().format('YYYY-MM-DD');
}