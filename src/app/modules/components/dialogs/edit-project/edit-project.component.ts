import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {IProjects} from '../../../../models/projects.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProjectsService} from '../../../../services/user_services/projects.service';
import {Skill} from '../../../../models/skill.model';
import {Media} from "../../../../models/media.model";
import {FileHolder} from "angular2-image-upload";
import {MediaService} from "../../../../services/user_services/media.service";

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  images: FileHolder[]=[];
  listProjects: IProjects[];
  formProject: FormGroup;
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<EditProjectComponent>,
    private projectService: ProjectsService,
    private mediaService: MediaService,
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
    this.eachUpload(this.data.idproject);
  }

  update(idproject: number, project: IProjects): void {
    this.projectService
      .updateproject(project, idproject)
      .subscribe((project) => {
        console.log(project);
      });
    this.onNoClick();
  }
  onUploadFinish(event) {
    this.images.push(event);

  }
  eachUpload(idproject:number){

    this.images.forEach(value => {
      this.uploadimages(idproject,{title: value.file.name,url: value.src,type:1});
      console.log('logrado')
    });
  }
  uploadimages(idproject:number,media: Media){
    this.mediaService.postmedia(idproject,media).subscribe((media)=>{
      console.log(media)
    });
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
