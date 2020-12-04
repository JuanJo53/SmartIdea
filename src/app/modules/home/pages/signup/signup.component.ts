import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(private fromBuilder: FormBuilder, private userService: UserService, public dialogRef: MatDialogRef<SignupComponent>,public dialog: MatDialog) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.form = this.fromBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required]],
      confContrasenia: ['', [Validators.required]],
    });
  }
  signup(): void {
    console.log('SIGNUP');

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
        cellphone: null
      }
      this.userService.postuser(user).subscribe(value =>{
        console.log('Registrado con exito!')
      })
    }

    this.onNoClick()

  }

}
