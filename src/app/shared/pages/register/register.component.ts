import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  loginForm: FormGroup;


  email: string = '';
  password: string = '';
  emailError: string | null = null;
  passwordError: string | null = null;

  hidePassword: boolean=true;
  showLoading: boolean=false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {

    const jsonData = {
      email: this.loginForm.get("email")?.value,
      password: this.loginForm.get("password")?.value
    }

    this.authService.login(jsonData.email, jsonData.password).subscribe({
      next: (response:any) => {
        console.log('Login succesful');
        //environment.token = response.body;
        console.log(response.body)
        this.router.navigate(['/']);
      },
      error: (error:any) => {
        console.log(error.error)
      }
    })
  }

}
