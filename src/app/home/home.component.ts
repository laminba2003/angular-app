import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  visible: boolean = false;

  constructor(
    private router: Router,
    private keycloakService: KeycloakService
  ) { }


  async ngOnInit() {
    await this.checkLoggedIn();
  }

  async checkLoggedIn() {
    this.keycloakService.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['countries']);
      } else {
        this.visible = true;
      }
    })
  }

  async signIn() {
    await this.keycloakService.login({
      redirectUri: window.location.origin
    });
  }

}
