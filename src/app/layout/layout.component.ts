import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    public router: Router,
    public keycloakService: KeycloakService
  ) { }

  ngOnInit(): void {
  }

  async logOut() {
    await this.keycloakService.logout(window.location.origin)
    .then(() => {
      this.router.navigate(['']);
    });
  }

  get userName(): string {
    return this.keycloakService.getUsername();
  }

}
