import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ActivatedRoute} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {IProjects} from '../../../../models/projects.model';
import {ProjectsService} from '../../../../services/user_services/projects.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  formProject: FormGroup;
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    public dialogRef: MatDialogRef<CreateProjectComponent>
  ){}

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
    this.editproject();
  }
  editproject(): void {
    this.edit = true;
    this.formProject = this.fromBuilder.group({
      projectsId: [0, [Validators.required]],
      status: [1, [Validators.required]],
      projectTitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      benefits: ['', [Validators.required]],
    });
  }
  saveproject(): void {
    if (this.formProject.valid) {
      const cert = this.formProject.value;
      console.log(cert);
      this.createproject(cert);
    }
  }

  createproject(projects: IProjects): void {
    this.projectService
      .postnewproject (projects)
      .subscribe((projects) => {
        console.log(projects);
      });
    this.onNoClick();
  }
  onUploadFinish(event) {
    console.log(event)
  }
  customStyle = {
    selectButton: {
      "color": "white",
      "background-color": "#673ab7",
    },
    clearButton: {
      "color": "white",
      "background-color": "red",
    },
    layout: {
      "background-color": "",
      "color": "",
      "font-size": "15px",
    },
    previewPanel: {
      "background-color": "#f2f2f2",
    }
  };
}
