import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication-service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService.loginSilent();
  }

}
