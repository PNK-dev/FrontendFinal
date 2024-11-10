import { Alumnos } from "./alumnos";
import { Cursos } from "./cursos";


export class Notas {
    id: number;
    nota1: number;
    nota2: number;
    nota3: number;
    promedio: number;
    cursos: Cursos;
    alumnos: Alumnos;
    constructor(
        id:number,
        nota1:number,
        nota2:number,
        nota3:number,
        promedio:number,
        cursos: Cursos = new Cursos(),
        alumnos: Alumnos = new Alumnos()
    ){
        this.id = id;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
        this.promedio = promedio;
        this.cursos = cursos;
        this.alumnos = alumnos;
    }
}
