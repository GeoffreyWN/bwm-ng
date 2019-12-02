import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  errors: any[] =[]
  notifyMessage: string = ''
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm()

    this.route.params.subscribe(
      (params)=>{
        if (params['registered'] === 'success') {
          this.notifyMessage = 'User Added: Proceed to login'
      }})
  }

  initForm () {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    })
  }

  isValidInput(fieldName): boolean {
    return this.loginForm.controls[fieldName].invalid && (this.loginForm.controls[fieldName].dirty  || this.loginForm.controls[fieldName].touched)
  }

  isRequiredInput(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required
  }

  isValidPattern(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.pattern
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (token)=>{
        // debugger;
        this.router.navigate(['/rentals'])
      },
      (errorResponse)=>{this.errors = errorResponse.error.errors}
    )
  }

}
