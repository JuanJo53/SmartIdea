import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {IProjects} from '../../../../models/projects.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProjectsService} from '../../../../services/user_services/projects.service';
import {Skill} from '../../../../models/skill.model';
import {Media} from '../../../../models/media.model';
import {FileHolder} from 'angular2-image-upload';
import {MediaService} from '../../../../services/user_services/media.service';
import {Area} from '../../../../models/area.model';
import {AreaService} from '../../../../services/user_services/area.service';
import {CreateProjectComponent} from '../create-project/create-project.component';
import {AreacreateDialogComponent} from '../areacreate-dialog/areacreate-dialog.component';
import {AreaeditDialogComponent} from '../areaedit-dialog/areaedit-dialog.component';
import {CreateSkillComponent} from '../create-skill/create-skill.component';
import {EditSkillComponent} from '../edit-skill/edit-skill.component';
import {WarningDialogComponent} from '../warning-dialog/warning-dialog.component';
import {SkillService} from '../../../../services/user_services/skill.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<EditProjectComponent>,
    private projectService: ProjectsService,
    private mediaService: MediaService,
    private areaService: AreaService,
    private serviceSkill: SkillService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {
      idproject: number,
      projectTitle: string,
      description: string,
      benefits: string,
      status: number
    }

  ) { }
  displayedColumns: string[] = ['#', 'Area', 'id_card'];
  images: FileHolder[] = [];
  listProjects: IProjects[];
  listArea: Area[];
  skills: Skill[];
  formProject: FormGroup;
  skillName: string;
  skillId: number;
  status: number;
  edit = false;
  customStyle = {
    selectButton: {
      color: 'white',
      'background-color': '#673ab7',
    },
    clearButton: {
      color: 'white',
      'background-color': 'red',
    },
    layout: {
      'background-color': '',
      color: '',
      'font-size': '15px',
    },
    previewPanel: {
      'background-color': '#f2f2f2',
    }
  };

  onNoClick(): void {
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close(false);
  }
  cancel() {
    this.edit = false;
  }
  ngOnInit(): void {
    this.editProject();
    this.listarea();
    this.loadSkillList();
    console.log(this.listArea);
  }
  editProject(): void {
    this.edit = true;
    this.formProject = this.fromBuilder.group({
      projectTitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      benefits: ['', [Validators.required]],
      status: [1, [Validators.required]],
    });
  }
  listarea(): void{
    console.log(this.data.idproject);
    this.areaService.getarea(this.data.idproject).subscribe(data => {
      console.log(data);
      this.listArea = data;
    });
    /*.subscribe((data) => {
      this.listProjects = data;
    });*/
  }

  loadSkillList(): Skill[] {
    console.log(this.data.idproject);
    this.serviceSkill.getSkillsproject(this.data.idproject).subscribe((data) => {
      this.skills = data;
    });
    return this.skills;
  }

  areacreate(): void{
    const dialogRef = this.dialog.open(AreacreateDialogComponent, {
      width: '500px',
      data: {
        idproject : this.data.idproject
      },
    });
    dialogRef.afterClosed().subscribe((result) => {

      this.ngOnInit();
    });
  }
  areaedit(idarea: number, name: string): void{
    const dialogRef = this.dialog.open(AreaeditDialogComponent, {
      width: '500px',
      data: {
        idareas : idarea,
        areaName : name
      },
    });
    dialogRef.afterClosed().subscribe((result) => {

      this.ngOnInit();
    });
  }
  updateProject(): void {
    if (this.formProject.valid) {
      const cert = this.formProject.value;
      console.log(cert);
      this.update(this.data.idproject, cert);
    }
    this.eachUpload(this.data.idproject);
  }
  areaDelet(idarea: number, name: string){
    const area: Area = {
      areaId: null,
      nameArea : name,
      status: 0,
    };
    this.areaService
      .editarea(idarea, area)
      .subscribe((area) => {
        console.log(area);
      });
    this.onNoClick();
  }
  update(idproject: number, project: IProjects): void {
    const iduser = parseInt(localStorage.getItem('userId'));
    this.projectService
      .updateproject(project, idproject, iduser)
      .subscribe((project) => {
        console.log(project);
      });
    this.onNoClick();
  }

  createSkill(idproject: number): void {
    localStorage.setItem('idprojecte', String(idproject));
    localStorage.setItem('editproyecte', String(0));
    console.log(localStorage);
    const dialogRef = this.dialog.open(CreateSkillComponent, {
      width: '600px',
      data: {
        skillId: this.skillId,
        skillName: this.skillName,
        status: this.status,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  deleteSkill(idskill: number, skillname: string, indexskill: number): void {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '500px',
      data: {
        message:
          '¿Estas seguro de eliminar esta habilidad? ' + '\'' + skillname + '\'',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const skill: Skill = { skillId: 0, skillName: '', status: 0 };
        this.serviceSkill.delete(idskill, skill).subscribe();
        location.reload();
      }
    });
    this.ngOnInit();
  }
  editSkill(skillid: number, skillName: string) {
    const dialogRef = this.dialog.open(EditSkillComponent, {
      width: '500px',
      data: { idskill: skillid, skillname: skillName },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  onUploadFinish(event) {
    this.images.push(event);

  }
  eachUpload(idproject: number){

    this.images.forEach(value => {
      this.uploadimages(idproject, {title: value.file.name, url: value.src, type: 1});
      console.log('logrado');
    });
  }
  uploadimages(idproject: number, media: Media){
    this.mediaService.postmedia(idproject, media).subscribe((media) => {
      console.log(media);
    });
  }

}
