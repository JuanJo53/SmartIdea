import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from "../../../../services/user_services/user.service";
import {User} from "../../../../models/user.model";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  logo: string = 'assets/images/logo.JPG';
  form: FormGroup;
  clienReturn: User;
  constructor(private fromBuilder: FormBuilder,private userService: UserService, public dialogRef: MatDialogRef<LoginComponent>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.form = this.fromBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    console.log('LOGIN');
    if (this.form.valid) {
      const cert = this.form.value;
      console.log(cert)
      this.loginuser(cert);
    }
  }
  loginuser(user: User){
    console.log(user);

    this.userService.loginclient(user).subscribe(data => {
      if (data != null) {
        this.clienReturn = data;
        alert('Bienvenido ' + this.clienReturn.username);
        localStorage.setItem('email',this.clienReturn.email);
        localStorage.setItem('userId',this.clienReturn.userId+"");
        console.log(localStorage)
        console.log("Login")
      }else{

        // this.contador++;
        // if (this.contador>3) {
        //   this.snackBar.open('No puede ingresar al sistema', '', {duration: 2000,});
        // }
    }
    });
  this.onNoClick()
  }


}
