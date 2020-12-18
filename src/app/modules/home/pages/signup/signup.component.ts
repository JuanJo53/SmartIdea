import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../../../services/user_services/user.service";
import {User} from "../../../../models/user.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  logo: string = 'assets/images/logo.JPG';
  form: FormGroup;
  usernamex: boolean;
  constructor(private fromBuilder: FormBuilder, private userService: UserService, public dialogRef: MatDialogRef<SignupComponent>,public dialog: MatDialog) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.form = this.fromBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator, Validators.pattern('^[a-zA-Z \-\']+')]],
      surname: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator, Validators.pattern('^[a-zA-Z \-\']+')]],
      username: ['', [Validators.required, Validators.minLength(3), this.noWhitespaceValidator]],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(8), this.noWhitespaceValidator], Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')],
      confContrasenia: ['', [Validators.required]],
    });
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  signup(): void {
    if (this.form.value.contrasenia==this.form.value.confContrasenia && this.form.valid){
      let user:User={
        userId: 0,
        name: this.form.value.name,
        surname: this.form.value.surname,
        username: this.form.value.username,
        email: this.form.value.correo,
        password: this.form.value.contrasenia,
        description: null,
        image: null,
        cellphone: null,
        status: 0,
      }
      this.userService.postuser(user).subscribe(value =>{
        console.log('Registrado con exito!')
      })
      this.onNoClick()
    }



  }

}
