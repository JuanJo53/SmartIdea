import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {IProjects} from '../../../../models/projects.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProjectsService} from '../../../../services/user_services/projects.service';
import {Skill} from '../../../../models/skill.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  formProject: FormGroup;
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<EditProjectComponent>,
    private projectService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) public data: {
      idproject: number,
      projectTitle: string,
      description: string,
      benefits: string,
      status: number
    }

  ) { }
  edit = false;
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
  updateProject(): void {
    if (this.formProject.valid) {
      const cert = this.formProject.value;
      console.log(cert);
      this.update(this.data.idproject, cert);
    }
  }

  update(idproject: number, project: IProjects): void {
    this.projectService
      .updateproject(project, idproject)
      .subscribe((project) => {
        console.log(project);
      });
    this.onNoClick();
  }

}
