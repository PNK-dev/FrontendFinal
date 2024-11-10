import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NotasService } from '../../service/notas.service';
import { CursosService } from '../../service/cursos.service';
import { AlumnosService } from '../../service/alumnos.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Notas } from '../../model/notas';
import { Cursos } from '../../model/cursos';
import { Alumnos } from '../../model/alumnos';
import { HomeComponent } from '../home/home.component';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [
    HomeComponent,
    DropdownModule,
    TableModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
  ],
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css'],
})
export class NotasComponent {
  notas: Notas[] = [];
  cursos: Cursos[] = [];
  alumnos: Alumnos[] = [];
  cargando: boolean = false;
  titulo: string = '';
  opc: string = '';
  op = 0;
  nota = new Notas(0, 0, 0, 0, 0, new Cursos(), new Alumnos());
  nota1Temp = 0;
  nota2Temp = 0;
  nota3Temp = 0;
  visible: boolean = false;
  isDeleteInProgress: boolean = false;
  cursoTemp: Cursos = new Cursos();
  alumnoTemp: Alumnos = new Alumnos();
  totalRecords: number = 0;

  constructor(
    private notasService: NotasService,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.listarNotas();
    this.cargarCursosYAlumnos();
  }
  get promedio(): number {
    return (this.nota1Temp + this.nota2Temp + this.nota3Temp) / 3;
  }
  
  listarNotas() {
    this.notasService.getNotas().subscribe({
      next: (data) => {
        console.log(data);
        this.notas = data;
        this.totalRecords = data.length;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la lista de notas',
        });
      },
    });
  }

  cargarCursosYAlumnos() {
    this.cursosService.getCursos().subscribe(cursos => this.cursos = cursos);
    this.alumnosService.getAlumnos().subscribe(alumnos => this.alumnos = alumnos);
  }

  showDialogCreate() {
    this.titulo = 'Crear Nota';
    this.opc = 'Guardar';
    this.op = 0;
    this.nota1Temp = 0;
    this.nota2Temp = 0;
    this.nota3Temp = 0;
    this.cursoTemp = new Cursos();
    this.alumnoTemp = new Alumnos();
    this.visible = true;
    this.nota = new Notas(0, 0, 0, 0, 0, new Cursos(), new Alumnos());
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Nota';
    this.opc = 'Editar';
    this.notasService.getNotasById(id).subscribe((data) => {
      this.nota = data;
      this.nota1Temp = this.nota.nota1;
      this.nota2Temp = this.nota.nota2;
      this.nota3Temp = this.nota.nota3;
      this.op = 1;
    });
    this.visible = true;
  }

  confirmDeleteNotas(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar esta nota?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteNotas(id);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Has cancelado la operación',
        });
      },
    });
  }

  deleteNotas(id: number) {
    this.notasService.deleteNotas(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'La nota ha sido eliminada exitosamente',
        });
        this.listarNotas();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la nota',
        });
      },
    });
  }

  addNotas(): void {
    this.nota.nota1 = this.nota1Temp;
    this.nota.nota2 = this.nota2Temp;
    this.nota.nota3 = this.nota3Temp;
    this.nota.promedio = this.promedio; // Calcula el promedio
  
    this.nota.cursos = this.cursoTemp;
    this.nota.alumnos = this.alumnoTemp;
  
    this.notasService.createNotas(this.nota).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Nota Registrada',
        });
        this.listarNotas();
        this.op = 0;
        this.visible = false;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar la nota',
        });
      },
    });
    this.visible = false;
  }
  

  confirmSaveNotas() {
    this.confirmationService.confirm({
      message:
        this.op === 0
          ? '¿Estás seguro de que deseas agregar esta nota?'
          : '¿Estás seguro de que deseas editar esta nota?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.opcion();
      },
    });
  }

  editNotas() {
    this.nota.nota1 = this.nota1Temp;
    this.nota.nota2 = this.nota2Temp;
    this.nota.nota3 = this.nota3Temp;
    this.nota.cursos = this.cursoTemp;
    this.nota.alumnos = this.alumnoTemp;

    this.notasService.updateNotas(this.nota, this.nota.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Nota Editada',
        });
        this.listarNotas();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar la nota',
        });
      },
    });
    this.visible = false;
  }

  opcion(): void {
    if (this.op == 0) {
      this.addNotas();
      this.limpiar();
    } else if (this.op == 1) {
      this.editNotas();
      this.limpiar();
    } else {
      this.limpiar();
    }
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.nota = new Notas(0, 0, 0, 0, 0, new Cursos(), new Alumnos());
    this.nota1Temp = 0;
    this.nota2Temp = 0;
    this.nota3Temp = 0;
    this.cursoTemp = new Cursos();
    this.alumnoTemp = new Alumnos();
  }
}
