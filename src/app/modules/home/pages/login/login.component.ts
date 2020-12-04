import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user_services/user.service';
import { User } from '../../../../models/user.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationDetailsComponent } from '../../../components/dialogs/notification-details/notification-details.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  logo: string = 'assets/images/logo.JPG';
  form: FormGroup;
  clienReturn: User;
  constructor(
    private fromBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog
  ) {}
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
      console.log(cert);
      this.loginuser(cert);
    }
  }
  loginuser(user: User) {
    console.log(user);

    this.userService.loginclient(user).subscribe((data) => {

      alert(data);
      if (data != null) {
        this.clienReturn = data;
        if(this.clienReturn.username!=null){
          alert('Bienvenido ' + this.clienReturn.username);
          localStorage.setItem('email', this.clienReturn.email);
          localStorage.setItem('userId', this.clienReturn.userId + '');
          console.log(localStorage);
          console.log('Login');
        }else{
          alert("no es un usuario");
          localStorage.clear();
        }
      } else {
        alert("no es un usuario");
        // this.contador++;
        // if (this.contador>3) {
        //   this.snackBar.open('No puede ingresar al sistema', '', {duration: 2000,});
        // }
      }
    });
    this.onNoClick();
  }
  signup() {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
}
