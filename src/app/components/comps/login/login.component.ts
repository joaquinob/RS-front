import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Login } from '../../../interfaces/login';
import { User } from '../../../interfaces/user';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!: FormGroup;
  password: string = 'password';

  constructor(private builder: FormBuilder, private router: Router, private authService: AuthService){
    this.form = builder.group({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  login(){
    const username: string = this.form.value.username;
    const password: string = this.form.value.password;

  this.authService.login(username, password).subscribe({
    next: (response) => {
      const loginResponse: Login = response as Login;
      const user: User = {
        token: loginResponse.token,
        _id: loginResponse._id,
        username: loginResponse.username,
        email: loginResponse.email
      };
      this.authService.saveUser(user);
      this.router.navigate(['/home']);
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El inicio de sesión ha fallado, compruebe sus credenciales'
      })
    }
  })
  }
}