export class Movimentation {
    id?: number;
    title: string;
    type: number = 1; // 0 = Entrada, 1 = Saída
    value: number;
    movimentation_date: string = new Date().toDateString();
}