import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private store: Store, private keycloakService: KeycloakService) { }

  hasRoles(roles: string[]): Observable<boolean> {
    return this.store.select(state => state.appstate.roles).pipe(map(x => roles.some((role) => x.includes(role))));
  }

  
  async isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  async signIn() {
    await this.keycloakService.login({
      redirectUri: window.location.origin
    });
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
