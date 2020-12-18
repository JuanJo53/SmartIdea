import {Component, Inject, OnInit} from '@angular/core';
import {AreaService} from '../../../../services/user_services/area.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {SkillService} from '../../../../services/user_services/skill.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Skill} from '../../../../models/skill.model';
import {Area} from '../../../../models/area.model';

@Component({
  selector: 'app-areacreate-dialog',
  templateUrl: './areacreate-dialog.component.html',
  styleUrls: ['./areacreate-dialog.component.css']
})
export class AreacreateDialogComponent implements OnInit {
  formArea: FormGroup;
  constructor(private areaservise: AreaService,
              private fromBuilder: FormBuilder,
              private route: ActivatedRoute,
              public dialogRef: MatDialogRef<AreacreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA)public data:{ idproject: number }) { }
  edit = false;
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.editArea();
  }
  savearea(): void{
    if (this.formArea.valid) {
      if(this.formArea.value.nameArea.trim().length === 0){
        console.log("NO ES VALIDO");
        window.alert("hay datos vacios");
      }else{
        console.log("esvalido");
        const cert = this.formArea.value;
        console.log(cert);
        this.createArea(cert);
      }
    }
  }
  createArea(area: Area): void {
   this.areaservise
      .postareas(this.data.idproject,area)
      .subscribe((area) => {
        console.log(area);
      });
    this.onNoClick();
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  editArea(): void {
    this.edit = true;
    this.formArea = this.fromBuilder.group({
      AreaId: [0, [Validators.required]],
      nameArea: ['', [Validators.required]],
      status: [0, [Validators.required]],
    });
  }

}
