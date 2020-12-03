// import {COMMA, ENTER} from '@angular/cdk/keycodes';
// import {FormControl} from '@angular/forms';
// import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
// import {MatChipInputEvent} from '@angular/material/chips';
// import {Observable} from 'rxjs';
// import {map, startWith} from 'rxjs/operators';
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
import { FormControl } from '@angular/forms';
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
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[];
  allTags: string[];
  general: Tag[];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  editskill: boolean;
  user: User;
  skills: Skill[];
  skillName: string;
  skillId: number;
  status: number;
  image: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: UserService,
    public dialog: MatDialog,
    private serviceSkill: SkillService,
    private tagSerive: TagsService
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filter(tag) : this.allTags.slice()
      )
    );
  }

  ngOnInit(): void {
    this.loadprofile();
    this.loadSkillList();
    this.loadtagList();
  }

  loadSkillList(): Skill[] {
    this.serviceSkill.getSkills().subscribe((data) => {
      this.skills = data;
    });
    return this.skills;
  }
  loadtagList(): Tag[] {
    this.tagSerive.gettags().subscribe((data) => {
      this.general = data;
      data.map((value) => {
        console.log(value.nameTags);
        this.allTags.push(value.nameTags);
      });
    });

    return this.general;
  }
  loadprofile() {
    this.service.getUserDeatails().subscribe((data) => {
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
  editSkill(skillid: number, skillName: string) {
    const dialogRef = this.dialog.open(EditSkillComponent, {
      width: '500px',
      data: { idskill: skillid, skillname: skillName },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
  update() {
    let user1: User = {
      userId: this.user.userId,
      name: this.user.name,
      surname: this.user.surname,
      username: this.user.username,
      email: this.user.email,
      description: this.user.description,
      image: this.user.image,
      cellphone: this.user.cellphone,
    };

    this.service.updateProfile(user1).subscribe((error) => alert(error));
    this.ngOnInit();
  }
  onUploadFinish(event) {
    this.image = event.src;
  }
  updateimage() {
    if (this.image != null) {
      let user1: User = {
        userId: this.user.userId,
        name: this.user.name,
        surname: this.user.surname,
        username: this.user.username,
        email: this.user.email,
        description: this.user.description,
        image: this.image,
        cellphone: this.user.cellphone,
      };
      this.service.updateImage(user1).subscribe((error) => alert(error));
    }
    location.reload();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(
      (tag) => tag.toLowerCase().indexOf(filterValue) === 0
    );
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
