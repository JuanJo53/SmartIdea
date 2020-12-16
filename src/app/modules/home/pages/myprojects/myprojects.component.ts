import { Component, OnInit } from '@angular/core';
import {ProjectsService} from '../../../../services/user_services/projects.service';
import {IProjects} from '../../../../models/projects.model';
import {CreateSkillComponent} from '../../../components/dialogs/create-skill/create-skill.component';
import {CreateProjectComponent} from '../../../components/dialogs/create-project/create-project.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {WarningDialogComponent} from '../../../components/dialogs/warning-dialog/warning-dialog.component';
import {EditProjectComponent} from '../../../components/dialogs/edit-project/edit-project.component';

export interface DialogData {
  projectTitle: string;
  description: string;
  benefits: string;
}
@Component({
  selector: 'app-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.css']
})
export class MyprojectsComponent implements OnInit {
  listProjects: IProjects[];
  constructor(private service: ProjectsService, private activatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadlist();
  }
  loadlist(){
    var iduser = parseInt(localStorage.getItem('userId'));
    this.service.getAllProjects(iduser).subscribe(data => {
      this.listProjects = data;
    });
  }
  createProject(): void{

    const dialogRef = this.dialog.open(CreateProjectComponent, {
      width: '500px',
      data: {
        status : 1
      },
    });
    dialogRef.afterClosed().subscribe((result) => {

      this.ngOnInit();
    });


  }
  editprojct(project: IProjects): void{
    const dialogRef = this.dialog.open(EditProjectComponent, {
      width: '1000px',
      data: {
        idproject: project.projectsId,
        projectTitle: project.projectTitle,
        description: project.description,
        benefits: project.benefits,
        status: project.status
      },
    });
    dialogRef.afterClosed().subscribe((result) => {

      this.ngOnInit();
    });
  }

}
