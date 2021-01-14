import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {IProjects} from '../../../../models/projects.model';
import {ProjectsService} from '../../../../services/user_services/projects.service';
import {MediaService} from "../../../../services/user_services/media.service";

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
    private mediaService: MediaService,
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
      projectTitle: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator]],
      description: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator]],
      benefits: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator]],
      budget: ['',[Validators.required, this.noWhitespaceValidator]],
    });
  }

  saveproject(): void {
    if (this.formProject.valid) {
      const cert = this.formProject.value;
      console.log(cert);
      this.createproject(cert);
    }else{
      window.alert("hay datos vacios ");
    }


  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  createproject(projects: IProjects): void {

    var iduser = parseInt(localStorage.getItem('userId'));
    this.projectService
      .postnewproject (projects,iduser)
      .subscribe((projects) => {
        console.log(projects);
      });
    this.onNoClick();

  }


}
