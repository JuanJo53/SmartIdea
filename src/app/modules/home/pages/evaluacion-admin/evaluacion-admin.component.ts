import { Component, OnInit, OnDestroy } from '@angular/core';
import { Card } from '../../../../models/card.model';
import { CardService } from '../../../../services/user_services/card.service';
import { CreateCardComponent } from '../../../components/dialogs/create-card/create-card.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EditCardComponent } from '../../../components/dialogs/edit-card/edit-card.component';
import { WarningDialogComponent } from '../../../components/dialogs/warning-dialog/warning-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreatePreguntaComponent } from 'src/app/modules/components/dialogs/create-pregunta/create-pregunta.component';
import { PreguntaService } from 'src/app/services/user_services/pregunta.service';
import { CreateRespuestaComponent } from 'src/app/modules/components/dialogs/create-respuesta/create-respuesta.component';
import { RespuestaService } from 'src/app/services/user_services/respuesta.service';
import { EvaluacionService } from 'src/app/services/user_services/evaluacion.service';
import { UserService } from 'src/app/services/user_services/user.service';
import { ProjectsService } from 'src/app/services/user_services/projects.service';
import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-evaluacion-admin',
  templateUrl: './evaluacion-admin.component.html',
  styleUrls: ['./evaluacion-admin.component.css'],
})
export class EvaluacionAdminComponent implements OnInit {
  userId: number = parseInt(localStorage.getItem('userId'));
  listPreguntas: any[];
  listRespuestas: any[];
  listEvaluacion: any[];
  listNroEvaluacionFilter: any[];
  listuser: User[];
  proyectId: number;
  constructor(
    private fromBuilder: FormBuilder,
    private preguntaService: PreguntaService,
    private respuestaService: RespuestaService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private evaluacionService: EvaluacionService,
    private service: UserService,
    private servi: ProjectsService,
    public dialog: MatDialog
  ) {
    this.proyectId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.loadlistPreguntas();
    this.loadlistEvaluacion();
  }

  ////
  loadlist() {
    //const id = this.activatedRoute.snapshot.params.id;
    this.service.getAlluserrequest(this.proyectId).subscribe((data) => {
      this.listuser = data;
    });
  }

  loadlistPreguntas() {
    this.preguntaService.getAllPreguntas(this.proyectId).subscribe((data) => {
      this.listPreguntas = data;
      this.loadlistRespuestas();
    });
  }

  loadlistRespuestas() {
    this.respuestaService.getAllRespuestas(this.userId).subscribe((data) => {
      this.listRespuestas = data;
    });
  }

  /*
   * lista tabla
   */
  loadlistEvaluacion() {
    this.evaluacionService
      .getAllEvaluacion(this.proyectId)
      .subscribe((data) => {
        this.listEvaluacion = data;
        var listEvFilter = this.removeDuplicates(
          this.listEvaluacion,
          'nroEvaluacion'
        );
        // lista usuarios
        this.service.getAlluserrequest(this.proyectId).subscribe((data) => {
          this.listuser = data;
          var lsUsuarios = data;
          var respData = [];
          listEvFilter.forEach((ev) => {
            var addUser = ev;
            var usr_ = this.getUsuario(ev.userId, data);
            console.log('usr_ ', usr_);

            if (usr_ != undefined) {
              addUser.usuario = usr_;
              respData.push(addUser);
            }
          });

          this.listNroEvaluacionFilter = respData;
        });

        // this.listNroEvaluacionFilter = listEvFilter;
      });
  }

  getUsuario(userId: number, users: User[]): User {
    return users.find((urs) => urs.userId == userId);
  }

  nuevaPregunta() {
    const dialogRef = this.dialog.open(CreatePreguntaComponent, {
      width: '500px',
      data: {
        status: 1,
        proyectId: this.proyectId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadlistPreguntas();
    });
  }

  nuevaPrespuesta(pregunta) {
    const dialogRef = this.dialog.open(CreateRespuestaComponent, {
      width: '500px',
      data: {
        status: 1,
        pregunta,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadlistRespuestas();
    });
  }

  aceptarUsuario(item) {
    var userId_ = item.userId;
    var usuario_ = item.usuario;
    console.log('usuario_ ', usuario_);

    const id = this.activatedRoute.snapshot.params.id;
    this.servi
      .aceptuser(this.proyectId, userId_, usuario_)
      .subscribe((projects) => {
        // console.log(projects);
        this.openSnackBar('Afiliado');
        this.loadlistEvaluacion();
      },err=>{
        this.openSnackBar('Afiliado.');
        this.loadlistEvaluacion();
      });
    // window.alert("logrado");
    // this.ngOnInit();
  }

  rechazarUsuario(item) {
    var userId_ = item.userId;
    var usuario_ = item.usuario;

    const id = this.activatedRoute.snapshot.params.id;
    this.servi
      .rejectuser(this.proyectId, userId_, usuario_)
      .subscribe((projects) => {
        this.loadlistEvaluacion();
        this.openSnackBar('Rechazado');
      });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      panelClass: 'color-snackbar',
      duration: 5000,
      //  horizontalPosition: this.horizontalPosition,
      //  verticalPosition: this.verticalPosition,
    });
  }

  //////
  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }
}
