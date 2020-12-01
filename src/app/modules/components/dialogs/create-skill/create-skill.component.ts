import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      skillName: ['', [Validators.required]],
      status: [0, [Validators.required]],
    });
  }
  saveSkill(): void {
    if (this.formSkill.valid) {
      const cert = this.formSkill.value;
      console.log(cert);
      this.createSkill(cert);
    }
  }

  createSkill(skill: Skill): void {
    this.skillService
      .postnewskill(skill)
      .subscribe((skill) => {
        console.log(skill);
      });
    this.onNoClick();
  }
}
