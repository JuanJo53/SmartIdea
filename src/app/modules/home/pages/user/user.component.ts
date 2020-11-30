import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../services/user_services/user.service";
import {User} from "../../../../models/user.model";
import {Skill} from "../../../../models/skill.model";
import {MatDialog} from "@angular/material/dialog";
import {SkillService} from "../../../../services/user_services/skill.service";
import {CreateSkillComponent} from "../../../components/dialogs/create-skill/create-skill.component";
import {ActivatedRoute} from "@angular/router";
import {WarningDialogComponent} from "../../../components/dialogs/warning-dialog/warning-dialog.component";
import {EditSkillComponent} from "../../../components/dialogs/edit-skill/edit-skill.component";
// import {COMMA, ENTER} from '@angular/cdk/keycodes';
// import {FormControl} from '@angular/forms';
// import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
// import {MatChipInputEvent} from '@angular/material/chips';
// import {Observable} from 'rxjs';
// import {map, startWith} from 'rxjs/operators';
export interface DialogData {
  skillName: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  editskill: boolean;
  user: User;
  skills: Skill[];
  skillName: string;
  skillId: number;
  status: number;
  image: string;
  constructor(private activatedRoute: ActivatedRoute, private service: UserService,public dialog: MatDialog,private serviceSkill: SkillService) { }

  ngOnInit(): void {
    this.loadprofile();
    this.loadSkillList();
  }

  loadSkillList(): Skill[]{
    this.serviceSkill.getSkills().subscribe(data => {
      this.skills = data;
    });
    return this.skills;
  }
  loadprofile(){
    this.service.getUserDeatails().subscribe(data=>{
      this.user =  data;
    });
  }
  deleteSkill(idskill: number,skillname: string,indexskill:number): void{
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '500px',
      data:{
        message: "¿Estas seguro de eliminar esta habilidad? "+"'" +skillname+"'",
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let skill : Skill={skillId:0, skillName: "", status: 0};
        this.serviceSkill.delete(idskill,skill).subscribe();
        location.reload()
      }



    });

    this.ngOnInit();
  }
  createSkill(): void{

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
  editSkill(skillid:number,skillName:string){

    const dialogRef = this.dialog.open(EditSkillComponent, {
      width: '500px',
      data: {idskill: skillid,skillname: skillName},
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });

  }
  update() {
    let user1:User = {
      name: this.user.name,
      surname: this.user.surname,
      username: this.user.username,
      email: this.user.email,
      description: this.user.description,
      image: this.image,
      cellphone: this.user.cellphone
    };

    this.service.updateProfile(user1)
      .subscribe(
        success => alert("Done"),
        error => alert(error)
      );
  }
  onUploadFinish(event) {
    console.log(event.src)
    this.image=event.src
  }
  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}
