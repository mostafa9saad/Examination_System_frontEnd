import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iregister } from 'src/app/models/iregister';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private studentservise: StudentService, private router: Router) {}
  flag: boolean = false;
  registerFrom = new FormGroup({
    fName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,4}'),
    ]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  get getpassword() {
    return this.registerFrom.controls['Password'];
  }
  get getEmail() {
    return this.registerFrom.controls['Email'];
  }
  get getfName() {
    return this.registerFrom.controls['fName'];
  }
  get getlName() {
    return this.registerFrom.controls['lName'];
  }

  Register() {
    if (this.registerFrom.status == 'VALID') {
      let registerForm: Iregister = {
        fName: `${this.getfName.value}`,
        lName: `${this.getlName.value}`,
        Email: `${this.getEmail.value}`,
        Password: `${this.getpassword.value}`,
        Role: 'user',
      };

      this.studentservise.register(registerForm).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/examlist']);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
