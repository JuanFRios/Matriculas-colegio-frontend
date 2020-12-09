import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService} from '../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent{

  public formSubmitted = false;

  public loginForm: FormGroup = this.fb.group({
    username: ['juanes5', Validators.required],
    password: ['1234', Validators.required]
  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private admnService: AdminService) { }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid){
      return;
    }
    this.admnService.login( this.loginForm.value).subscribe(resp => {
      this.router.navigateByUrl('/dashboard')
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });

    this.router.navigateByUrl('/');
  }

}
