import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  logo: string = 'assets/images/logo.JPG';
  form: FormGroup;
  constructor(private fromBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fromBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required]],
    });
  }
  login(): void {
    console.log('LOGIN');
  }
}
