import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Skill} from "../../../../models/skill.model";
import {ActivatedRoute} from "@angular/router";
import {SkillService} from "../../../../services/user_services/skill.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  formSkill: FormGroup;
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private skillService: SkillService,
    public dialogRef: MatDialogRef<EditSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {idskill: number, skillname: string}
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
      skillName: ['', [Validators.required, this.noWhitespaceValidator]],
      status: [0, [Validators.required]],
    });
  }
  updateskill(): void {
    if (this.formSkill.valid) {
      const cert = this.formSkill.value;
      console.log(cert);
      this.update(this.data.idskill,cert);
    }
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  update(idskill:number,skill: Skill): void {
    this.skillService
      .updateskill(idskill,skill)
      .subscribe((skill) => {
        console.log(skill);
      });
    this.onNoClick();
  }
}
