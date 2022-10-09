import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Identity } from 'src/app/model/identity';

import { AuthenticationService } from 'src/app/service/authentication-service';

@Component({
  selector: 'app-authentication-signin',
  templateUrl: './authentication-signin.component.html',
  styleUrls: ['./authentication-signin.component.scss']
})
export class AuthenticationSigninComponent implements OnInit {

  identity$: Observable<Identity|null>;

  constructor(private authenticationService: AuthenticationService) {
    this.identity$ = authenticationService.observeIdentity();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.authenticationService.login();
  }
}
