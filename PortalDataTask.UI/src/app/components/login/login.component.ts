import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;

  private ngLoginUnsubscribe = new Subject();

  //toast
  toastVisible: boolean = false;
  toastMessage: string = '';
  toastStyle: string = '';

  
  constructor(private authService: AuthService,
              private router: Router) { 
    this.loginForm = new FormGroup({
      userNameLogin: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(){   

  }
  
  isValid() {
    return this.loginForm.valid;
  }

  doLogin() {
    if(this.isValid())
    {
      this.loading = true;
      let userName = this.loginForm.get('userNameLogin')?.value;
      let password = this.loginForm.get('password')?.value;

       this.authService.login(
         userName,
         password
       )
       .pipe(takeUntil(this.ngLoginUnsubscribe))
       .subscribe(data => {
        this.loading = false;
        
        window.localStorage.setItem('az-token', data.token);
      window.localStorage.setItem('az-name', data.user);
      httpOptions.headers.set('Authorization', 'Bearer ' + btoa(data.token));
        
        if (data.token)
          this.router.navigate(['/tasks']);
      },
      err => {
        this.loading = false;

        this.toastMessage = err.error != undefined ? err.error[0].message : err.message;
        this.toastVisible = true;
        this.toastStyle = "bg-danger";

        window.setTimeout(() => {
          this.toastVisible = false;
        }, 5000);
      });
    }
    else{
      
      this.loading = false;
      this.toastStyle = "bg-danger";
      this.toastMessage = "Login / Senha são campos obrigatórios";
      this.toastVisible = true;

      window.setTimeout(() => {
        this.toastMessage = '';
        this.toastVisible = false;
        this.toastStyle = "";
      }, 3000);
    }
  }

  ngOnDestroy(){
    this.ngLoginUnsubscribe.complete();
  }
 
}
