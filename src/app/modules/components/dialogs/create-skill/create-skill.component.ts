import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {SkillService} from '../../../../services/user_services/skill.service';
import {Skill} from '../../../../models/skill.model';

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.css']
})

export class CreateSkillComponent implements OnInit {
  formSkill: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private skillService: SkillService,
    public dialogRef: MatDialogRef<CreateSkillComponent>
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
    this.editSkill();
  }
  editSkill(): void {
    this.edit = true;
    this.formSkill = this.fromBuilder.group({
      skillId: [0, [Validators.required]],
      skillName: ['', [Validators.required,Validators.minLength(3), this.noWhitespaceValidator]],
      status: [0, [Validators.required]],
    });
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  saveSkill(): void {

    let edit = parseInt(localStorage.getItem('editproyecte'));
    console.log( edit);
    if (this.formSkill.valid) {
      const cert = this.formSkill.value;
      console.log(cert);
      if(cert.skillName.trim().length===0){
        console.log("no se que paso ");
        window.alert("hay datos vacios");
      }else{
        console.log("si es valido ");
        this.createSkill(cert,edit);
      }

    }
  }

  createSkill(skill: Skill, edit: number): void {
    if (edit == 0){
      let idprojet = parseInt(localStorage.getItem('idprojecte'));
      console.log("bien ahi");
      this.skillService.postnewskillproject(idprojet,skill).subscribe((skill) => {
        console.log(skill);
      });

    }else{
      console.log("user");
      let iduser = parseInt(localStorage.getItem('userId'));
      this.skillService
        .postnewskill(iduser, skill)
        .subscribe((skill) => {
          console.log(skill);
        });
    }

    this.onNoClick();
  }

}
