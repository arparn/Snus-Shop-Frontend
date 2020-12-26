import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit(userPassword) {
    // Process checkout data here
    console.log(userPassword);
    // sendToBACKENDDDDDD
    this.authenticationService.login(userPassword)
      .pipe(first())
      .subscribe(
        (user) => {
          console.log('user: ', user);
          this.router.navigate(['/login']);
        },
        error => {
        });
  }

  ngOnInit(): void {
    this.registerForm.reset();
  }

}
