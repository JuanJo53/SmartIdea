import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
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
import {Tag} from "../../../../models/tag.model";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {map, startWith} from "rxjs/operators";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Observable} from "rxjs";
import {TagsService} from "../../../../services/user_services/tags.service";
import {Projects} from "@angular/cli/lib/config/schema";



@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  displayedColumnsTag: string[] = ['#', 'Habilidades', 'id_card'];
  tagCtrl = new FormControl();
  filteredTags: Observable<Tag[]>;
  tags: Tag[] = [];
  allTags: Tag[] = [];
  isChecked : boolean;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<EditProjectComponent>,
    private projectService: ProjectsService,
    private mediaService: MediaService,
    private areaService: AreaService,
    private serviceSkill: SkillService,
    private dialog: MatDialog,
    private tagSerive: TagsService,
    @Inject(MAT_DIALOG_DATA) public data: {
      idproject: number,
      projectTitle: string,
      description: string,
      benefits: string,
      budget: number,
      status: number
    }

  ) {    this.filteredTags = this.tagCtrl.valueChanges.pipe(
    startWith(null),
    map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
}
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
    this.loadtagList();
    this.loadtagProject();
    if(this.data.status===1){
      this.isChecked=true;
    }if(this.data.status===2) {
      this.isChecked=false;
    }

  }
  editProject(): void {
    this.edit = true;
    this.formProject = this.fromBuilder.group({
      projectTitle: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator]],
      description: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator]],
      benefits: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator]],
      budget: ['',[Validators.required, this.noWhitespaceValidator]],
      status:  [1, [Validators.required]]
    });
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
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
  areaedit(idarea: number, areaName: string): void{
    const dialogRef = this.dialog.open(AreaeditDialogComponent, {
      width: '500px',
      data: {
        idareas : idarea,
        nameArea : areaName
      },
    });
    dialogRef.afterClosed().subscribe((result) => {

      this.ngOnInit();
    });
  }
  updateProject(): void {
    var s;
    if (this.formProject.valid) {
      if(this.isChecked){
        s=1;
      }
      else{
        s=2;
      }
      let cert: IProjects = {
        projectsId: 0,
        projectTitle:this.formProject.value.projectTitle,
        description:this.formProject.value.description,
        views: 0,
        benefits:this.formProject.value.benefits,
        budget:this.formProject.value.budget,
        status:s,
        createDate: null

      }
      console.log(cert);
      this.update(this.data.idproject, cert)


;
    }else{
      window.alert("hay datos vacios");
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
  loadtagList(): Tag[] {
    this.tagSerive.gettags().subscribe((data) => {
      this.allTags = data;
    });

    return this.allTags;
  }

  loadtagProject(): Tag[] {
    this.tagSerive.gettagproject(this.data.idproject).subscribe((data) => {
      this.tags = data;
    });

    return this.tags;
  }
  taagrept(tag): boolean{
    var x=false;
    this.tags.map(value => {
      if(value.nameTags==tag.nameTags){
        x = true;
      }
    })
    return x;
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let tag: Tag;
    tag = {
      tagId: 0,
      nameTags: value.trim(),
      verified: 1,
      status: 1,
    };
    if ((value || '').trim() && !this.taagrept(tag)) {
      this.tags.push(tag);
      this.tagSerive.posttagproject(this.data.idproject,tag).subscribe((tag) => {
        console.log(tag);
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      console.log(tag.tagId)
      this.tagSerive.deleteprojecttotag(tag.tagId,this.data.idproject).subscribe((tag) => console.log('Delete successful') );
    }

  }
  selected(event: MatAutocompleteSelectedEvent): void {

    let tag:Tag={
      tagId: event.option.value.tagId,
      nameTags: event.option.viewValue,
      verified: event.option.value.verified,
      status: event.option.value.status,
    }
    console.log(tag)
    if (!this.taagrept(tag)){
      this.tags.push(tag);
      this.tagSerive.addprojecttotag(this.data.idproject,tag).subscribe(value => console.log('added'))
      this.tagInput.nativeElement.value = '';
      this.tagCtrl.setValue(null);
    }

  }

  private _filter(value: string): Tag[] {
    const filterValue = value.toLowerCase();
    console.log(value)
    let listfliter:Tag[]=[];
    this.allTags.filter(value1 => {
      if( value1.nameTags.toLowerCase().indexOf(filterValue) === 0){
        listfliter.push(value1)
      }
    })
    return listfliter;
  }
}
