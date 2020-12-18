import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AreaService} from '../../../../services/user_services/area.service';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Area} from '../../../../models/area.model';

@Component({
  selector: 'app-areaedit-dialog',
  templateUrl: './areaedit-dialog.component.html',
  styleUrls: ['./areaedit-dialog.component.css']
})
export class AreaeditDialogComponent implements OnInit {
  formArea: FormGroup;
  constructor(private areaservise: AreaService,
              private fromBuilder: FormBuilder,
              private route: ActivatedRoute,
              public dialogRef: MatDialogRef<AreaeditDialogComponent>,
              @Inject(MAT_DIALOG_DATA)public data: { idareas: number,
                nameArea: string}) { }
  edit = false;
  onNoClick(): void {
    this.dialogRef.close();
  }
  close(){
    this.onNoClick();
  }
  cancel() {
    this.edit = false;
  }
  ngOnInit(): void {
    this.editArea();
  }
  editarea(): void{
    if (this.formArea.valid) {
      const cert = this.formArea.value;
      console.log(cert,"hoalsdsadas");
      if ( this.formArea.value.nameArea.trim().length === 0){
        window.alert("hay datos vacios");
      console.log("no se guarda");
      }else{
        let area:Area={
          areaId: null,
          nameArea : this.formArea.value.nameArea,
          status: 1,
        };
        console.log(area.nameArea,"probando corectos");
        this.updateArea(area);
      }
    }
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  updateArea(area: Area): void {
    this.areaservise
      .editarea(this.data.idareas, area)
      .subscribe((area) => {
        console.log(area);
      });
    this.onNoClick();
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
