import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UserService} from "../user.service";
import {first} from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
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
    this.userService.register(userPassword)
      .pipe(first())
      .subscribe(
        () => {
          console.log('reg suc');
          this.router.navigate(['/login']);
        },
        error => {
        });
  }

  ngOnInit(): void {
    this.registerForm.reset();
  }
}
