import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  logo: string = 'assets/images/logo.JPG';
  form: FormGroup;
  constructor(private fromBuilder: FormBuilder) {}

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
  }
}
