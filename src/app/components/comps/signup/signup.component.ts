import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form!: FormGroup;
  password: string = 'password'; // Por defecto, el input es de tipo password

  constructor(private builder: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = builder.group({
      'username': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  signUp() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, revisa los campos'
      });
      return;
    }

    this.authService.signup(this.form.value.username, this.form.value.email, this.form.value.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        let errorMessage = 'Revise los datos introducidos';

        if (err.status === 409) {
          errorMessage = 'El usuario ya existe. Por favor, utiliza otro nombre de usuario o email.';
        } else if (err.status === 400) {
          errorMessage = 'Datos inválidos. Por favor, verifica la información proporcionada.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage
        });
      }
    });
  }
}
