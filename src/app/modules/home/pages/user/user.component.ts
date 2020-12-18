import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../../../services/user_services/user.service';
import { User } from '../../../../models/user.model';
import { Skill } from '../../../../models/skill.model';
import { MatDialog } from '@angular/material/dialog';
import { SkillService } from '../../../../services/user_services/skill.service';
import { CreateSkillComponent } from '../../../components/dialogs/create-skill/create-skill.component';
import { ActivatedRoute } from '@angular/router';
import { WarningDialogComponent } from '../../../components/dialogs/warning-dialog/warning-dialog.component';
import { EditSkillComponent } from '../../../components/dialogs/edit-skill/edit-skill.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Tag } from '../../../../models/tag.model';
import { TagsService } from '../../../../services/user_services/tags.service';
import { strict } from 'assert';
export interface DialogData {
  skillName: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  displayedColumns: string[] = ['#', 'Habilidades', 'id_card'];
  tagCtrl = new FormControl();
  filteredTags: Observable<Tag[]>;
  tags: Tag[] = [];
  allTags: Tag[] = [];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  formUser: FormGroup;
  editskill: boolean;
  user: User;
  skills: Skill[];
  skillName: string;
  skillId: number;
  status: number;
  image: string;
  resultado: string;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: UserService,
    public dialog: MatDialog,
    private serviceSkill: SkillService,
    private tagSerive: TagsService

  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit(): void {
    this.loadprofile();
    this.loadSkillList();
    this.loadtagList();
    this.loadtagUser();
    this.edituservalidators();
  }

  edituservalidators(){
    this.formUser = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator, Validators.pattern('^[a-zA-Z \-\']+')]],
      surname: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator, Validators.pattern('^[a-zA-Z \-\']+')]],
      username: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator]],
      email: ['',[Validators.email]],
      description: ['', [Validators.required, Validators.minLength(10), this.noWhitespaceValidator]],
      cellphone: ['', [Validators.required, Validators.minLength(7), this.noWhitespaceValidator, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }


  loadSkillList(): Skill[] {
    var iduser= parseInt(localStorage.getItem('userId'));
    this.serviceSkill.getSkills(iduser).subscribe((data) => {
      this.skills = data;
    });
    return this.skills;
  }
  loadtagUser(): Tag[] {
    var iduser= parseInt(localStorage.getItem('userId'));
    this.tagSerive.gettaguser(iduser).subscribe((data) => {
      this.tags = data;
    });

    return this.tags;
  }
  loadtagList(): Tag[] {
    this.tagSerive.gettags().subscribe((data) => {
      this.allTags = data;
    });

    return this.allTags;
  }
  loadprofile() {
    var iduser= localStorage.getItem('userId')
    this.service.getUserDeatails(parseInt(iduser)).subscribe((data) => {
      this.user = data;
    });
  }
  deleteSkill(idskill: number, skillname: string, indexskill: number): void {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '500px',
      data: {
        message:
          '¿Estas seguro de eliminar esta habilidad? ' + "'" + skillname + "'",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let skill: Skill = { skillId: 0, skillName: '', status: 0 };
        this.serviceSkill.delete(idskill, skill).subscribe();
        location.reload();
      }
    });
    this.ngOnInit();
  }

  createSkill(): void {
    localStorage.setItem('editproyecte', String(1));
    const dialogRef = this.dialog.open(CreateSkillComponent, {
      width: '600px',
      data: {
        skillId: this.skillId,
        skillName: this.skillName,
        status: this.status,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadSkillList();
    });
  }


  editSkill(skillid: number, skillName: string) {
    const dialogRef = this.dialog.open(EditSkillComponent, {
      width: '500px',
      data: { idskill: skillid, skillname: skillName },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadSkillList();
    });
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };

  }
  update():void {
    var iduser= localStorage.getItem('userId')
    if (this.formUser.valid) {
      let user1: User = {
        userId: this.user.userId,
        name: this.formUser.value.name.trim(),
        surname: this.formUser.value.surname.trim(),
        username: this.formUser.value.username.trim(),
        email: this.formUser.value.email.trim(),
        password: this.user.password,
        description: this.formUser.value.description.trim(),
        image: this.user.image,
        cellphone: this.formUser.value.cellphone.trim(),
        status:0,
      };
      console.log(user1);
      this.service.updateProfile(parseInt(iduser),user1).subscribe(value => {
        if (value==null){
          alert("Username existente")
          this.formUser.get("username").setValue(this.user.username)
        }else {
          alert("Guardado con exito")
        }
      });
      this.loadprofile();
      this.formUser.get("name").setValue(this.user.name);
      this.formUser.get("surname").setValue(this.user.surname);
      this.formUser.get("username").setValue(this.user.username);
      this.formUser.get("email").setValue(this.user.email);
      this.formUser.get("description").setValue(this.user.description);
      this.formUser.get("cellphone").setValue(this.user.cellphone);
    }else {
      alert("Existen datos vacios")
      this.formUser.get("name").setValue(this.user.name);
      this.formUser.get("surname").setValue(this.user.surname);
      this.formUser.get("username").setValue(this.user.username);
      this.formUser.get("email").setValue(this.user.email);
      this.formUser.get("description").setValue(this.user.description);
      this.formUser.get("cellphone").setValue(this.user.cellphone);
    }
  }

  onUploadFinish(event) {
    this.image = event.src;
  }

  updateimage() {
    var iduser= localStorage.getItem('userId')
    if (this.image != null) {
      let user1: User = {
        userId: this.user.userId,
        name: this.user.name,
        surname: this.user.surname,
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        description: this.user.description,
        image: this.image,
        cellphone: this.user.cellphone,
        status:0,
      };
      this.service.updateImage(parseInt(iduser),user1).subscribe();
    }
    location.reload();
  }

  add(event: MatChipInputEvent): void {
    var iduser= parseInt(localStorage.getItem('userId'));
    const input = event.input;
    const value = event.value;
    let tag: Tag;
    // Add our fruit
    tag = {
      tagId: 0,
      nameTags: value.trim(),
      verified: 1,
      status: 1,
    };
    if ((value || '').trim() && !this.taagrept(tag)) {
      this.tags.push(tag);
      this.tagSerive.posttag(iduser,tag).subscribe((tag) => {
        console.log(tag);
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
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
  remove(tag: Tag): void {
    var iduser = parseInt(localStorage.getItem('userId'));
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      console.log(tag.tagId)
      this.tagSerive.deleteusertag(tag.tagId,iduser).subscribe((tag) => console.log('Delete successful') );
    }

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    var iduser = parseInt(localStorage.getItem('userId'));
    let tag:Tag={
        tagId: event.option.value.tagId,
        nameTags: event.option.viewValue,
        verified: event.option.value.verified,
        status: event.option.value.status,
    }
    console.log(tag)
    if (!this.taagrept(tag)) {
      this.tags.push(tag);
      this.tagSerive.addusertotag(iduser, tag).subscribe(value => console.log('added'))
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
    },
  };
}
